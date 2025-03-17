import {mongoose} from "mongoose";

const QuoteSchema = new mongoose.Schema({
  quote: {
    type: String,
    required: [true, "Quote must be provided"],
    trim: true,
  },
  author: {
    type: String,
    required: [true, "Author must be provided"],
    trim: true,
  },
});

// create quote model
const Quote = mongoose.model("Quote", QuoteSchema);

export { Quote };
