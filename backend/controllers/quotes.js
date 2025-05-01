import { Quote } from "../models/quotes.js";
import { quotes } from "../db/quotes.js";
import { asyncWrapper } from "../middleware/async.js";
import { NotFoundError, BadRequestError } from "../errors/index.js";

export function getRandomQuote(quotes) {
  if (!Array.isArray(quotes)) throw Error("Input must be an array");

  const allQuotes = quotes.every(
    (quote) =>
      typeof quote === "object" && quote !== null && !Array.isArray(quote)
  );
  if (!allQuotes)
    throw Error("All elements in the array must be plain objects");


  for (const quote of quotes) {
    if (!quote.hasOwnProperty('quote') || !quote.hasOwnProperty('author')) {
      throw new Error('Each quote must contain both "quote" and "author" properties');
    }
  }

  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

// get all quotes
const getAllQuotes = asyncWrapper(async (req, res) => {
  const quotes = await Quote.find({});
  res.status(200).json({ success: true, quotes });
});

// get single random quote
const getQuote = asyncWrapper(async (req, res) => {
  const quotesData = await quotes();
  if (quotesData.length === 0) {
    throw new NotFoundError("No quotes found. Please add a quote");
  }
  const quote = getRandomQuote(quotesData);
  res.status(200).json({ success: true, quote });
});

// create a quote
const createQuote = asyncWrapper(async (req, res) => {
  const { quote, author } = req.body;
  if (!quote || !author) {
    throw new BadRequestError("Please provide a quote and an author.");
  }
  const newQuote = await Quote.create(req.body);
  res.status(201).json({ success: true, newQuote });
});

const deleteQuote = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const quote = await Quote.findByIdAndDelete(id);
  if (!quote) {
    throw new NotFoundError(`No quote with id : ${id}`);
  }
  res.status(200).json({ success: true, quote });
});

export { createQuote, getQuote, getAllQuotes, deleteQuote };
