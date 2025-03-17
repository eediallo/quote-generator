import express from "express";
import { createQuote, getQuote } from "../controllers/quotes.js";

const quoteRouter = express.Router();

quoteRouter.get("/api/v1/quotes", getQuote);

quoteRouter.post("/", createQuote);

export { quoteRouter };
