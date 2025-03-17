import { quotes } from "../data.js";
import { Quote } from "../models/quotes.js";

function randomQuote(quotes) {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

// get all quotes
const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find({});
    res.status(200).json({ success: true, quotes: quotes });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

// get single random quote
const getQuote = async (req, res) => {
  try {
    const quotesData = await Quote.find({});
    if (quotesData.length === 0) {
      return res.status(404).json({ success: false, msg: "No quotes found" });
    }
    const quote = randomQuote(quotesData);
    res.status(200).json({ success: true, quote: quote });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

const createQuote = async (req, res) => {
  let quote;
  try {
    // create quote from Quote model
    quote = await Quote.create(req.body);
  } catch (err) {
    console.log(err.message);
  }
  console.log(quote);

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

  quotes.push({
    quote: quote.quote,
    author: quote.author,
  });
  res.status(201).json({ success: true, quote: quote });
};

export { createQuote, getQuote, getAllQuotes };
