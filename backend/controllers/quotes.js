import { Quote } from "../models/quotes.js";
import { quotes } from "../db/quotes.js";
import { asyncWrapper } from "../middleware/async.js";
import { NotFoundError, BadRequestError } from "../errors/index.js";

function randomQuote(quotes) {
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
  const quote = randomQuote(quotesData);
  res.status(200).json({ success: true, quote });
});

// create a quote
const createQuote = asyncWrapper(async (req, res) => {
  const { quote, author } = req.body;
  if (!quote || !author) {
    throw new BadRequestError("Please provide quote and author.");
  }
  const newQuote = await Quote.create(req.body);
  res.status(201).json({ success: true, newQuote });
});

export { createQuote, getQuote, getAllQuotes };
