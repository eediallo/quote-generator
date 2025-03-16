import { quotes } from "../data.js";
import express from "express";

const quoteRouter = express.Router();

function randomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

quoteRouter.get("/api/quote", (_, res) => {
  const quote = randomQuote();
  res.json(quote);
});

quoteRouter.post("/", (req, res) => {
  const bodyBytes = [];
  req.on("data", (chunk) => bodyBytes.push(...chunk));
  req.on("end", () => {
    const bodyString = String.fromCharCode(...bodyBytes);
    let body;
    try {
      body = JSON.parse(bodyString);
    } catch (error) {
      console.error(`Failed to parse body ${bodyString} as JSON: ${error}`);
      res.status(400).json({ succes: false, msg: "Expected body to be JSON." });
      return;
    }

    if (typeof body != "object" || !("quote" in body) || !("author" in body)) {
      console.error(
        `Failed to extract quote and author from post body: ${bodyString}`
      );
      res.status(400).json({
        succes: false,
        msg: "Expected body to be a JSON object containing keys quote and author.",
      });
      return;
    }

    if (!body.quote && !body.author) {
      console.error(`Both quote and author must be provided`);
      res.status(400).json({
        success: false,
        msg: "Both quote and author must be provided",
      });
      return;
    }

    if (!body.quote) {
      console.error(`Quote must be provided`);
      res.status(400).json({ success: false, msg: "Please provide a quote" });
      return;
    }

    if (!body.author) {
      console.error(`Author must be provided`);
      res
        .status(400)
        .json({ success: false, msg: "Please provide an author" });
      return;
    }

    quotes.push({
      quote: body.quote,
      author: body.author,
    });
    res.status(201).json({ succes: true, quote: body });
  });
});

export { quoteRouter };
