import { Quote } from "../models/quotes.js";

const quotes = async () => {
  try {
    const quotes = await Quote.find({});
    return quotes;
  } catch (err) {
    console.error(err.message)
  }
};

export { quotes };
