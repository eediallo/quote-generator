import { Quote } from "../models/quotes.js";
import { quotes } from "../db/quotes.js";
import { asyncWrapper } from "../middleware/async.js";

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
    return res
      .status(404)
      .json({ success: false, msg: "No quotes found. Please add a quote" });
  }
  const quote = randomQuote(quotesData);
  res.status(200).json({ success: true, quote });
});

// create a quote
const createQuote = asyncWrapper(async (req, res) => {
  const quotesData = await quotes();
  if (quotesData.length === 0) {
    return res
      .status(404)
      .json({ success: false, msg: "No quotes found. Please add a quote" });
  }

  // create quote from Quote model
  let quote = await Quote.create(req.body);

  if (typeof quote != "object" || !("quote" in quote) || !("author" in quote)) {
    console.error(
      `Failed to extract quote and author from post quote: ${quote}`
    );
    res.status(400).json({
      success: false,
      msg: "Expected quote to be a JSON object containing keys quote and author.",
    });
    return;
  }

  if (!quote.quote && !quote.author) {
    console.error(`Both quote and author must be provided`);
    res.status(400).json({
      success: false,
      msg: "Both quote and author must be provided",
    });
    return;
  }

  if (!quote.quote) {
    console.error(`Quote must be provided`);
    res.status(400).json({ success: false, msg: "Please provide a quote" });
    return;
  }

  if (!quote.author) {
    console.error(`Author must be provided`);
    res.status(400).json({ success: false, msg: "Please provide an author" });
    return;
  }

  // add quote to db
  quotesData.push({
    quote: quote.quote,
    author: quote.author,
  });
  res.status(201).json({ success: true, quote });
});

export { createQuote, getQuote, getAllQuotes };
