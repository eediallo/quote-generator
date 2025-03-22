import express from "express";
import {
  createQuote,
  getAllQuotes,
  getQuote,
  deleteQuote,
} from "../controllers/quotes.js";

const quoteRouter = express.Router();

quoteRouter.get("/api/v1/quote", getQuote);
quoteRouter.get("/api/v1/quotes", getAllQuotes);
quoteRouter.delete("/api/v1/quote/:id", deleteQuote);
quoteRouter.post("/", createQuote);

export { quoteRouter };
