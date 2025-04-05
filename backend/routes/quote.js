import express from "express";
import {
  createQuote,
  getAllQuotes,
  getQuote,
  deleteQuote,
} from "../controllers/quotes.js";
import { protect } from "../middleware/auth.js";

const quoteRouter = express.Router();

quoteRouter.get("/quote", getQuote);
quoteRouter.get("/", getAllQuotes);
quoteRouter.delete("/api/v1/quote/:id", protect, deleteQuote);
quoteRouter.post("/", createQuote);

export { quoteRouter };
