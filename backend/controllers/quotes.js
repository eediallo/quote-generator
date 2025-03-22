import { Quote } from "../models/quotes.js";
import { quotes } from "../db/quotes.js";
import { asyncWrapper } from "../middleware/async.js";
import { notFoundError, BadRequestError } from "../errors/index.js";

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
    throw new notFoundError("No quotes found. Please add a quote");
  }
  const quote = randomQuote(quotesData);
  res.status(200).json({ success: true, quote });
});

// create a quote
const createQuote = asyncWrapper(async (req, res) => {
  const quotesData = await quotes();
  if (quotesData.length === 0) {
    throw new notFoundError("No quotes found. Please add a quote");
  }

  const quote = await Quote.create(req.body);

  if (
    typeof quote !== "object" ||
    !("quote" in quote) ||
    !("author" in quote)
  ) {
    throw new BadRequestError(
      "Expected quote to be a JSON object containing keys quote and author."
    );
  }

  if (!quote.quote || !quote.author) {
    throw new notFoundError("Please provide a quote and an author");
  }
  // add quote to db
  quotesData.push({
    quote: quote.quote,
    author: quote.author,
  });
  res.status(201).json({ success: true, quote });
});

export { createQuote, getQuote, getAllQuotes };
