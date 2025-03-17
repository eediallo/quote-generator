import { quotes } from "../data.js";
import { Quote } from "../models/quotes.js";

function randomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

const getQuote = () => {
  (_, res) => {
    const quote = randomQuote();
    res.json(quote);
  };
};

const createQuote = async (req, res) => {
  let quote;
  try {
    quote = await Quote.create(req.body);
  } catch (err) {
    console.log(err.message);
  }
  console.log(quote)

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

export { createQuote, getQuote };
