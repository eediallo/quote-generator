import express from "express";
import cors from "cors";
import { quoteRouter } from "./routes/quote.js";
import { connectDB } from "./db/connect.js";
import dotenv from 'dotenv'
import { notFound } from "./middleware/notFound.js";
dotenv.config()

const staticDir = new URL("../frontend/static", import.meta.url).pathname;

const app = express();
const port = 3000;

app.use(cors());

// parse json
app.use(express.json())

//setup static  files and middleware
app.use(express.static(staticDir));

// quote router
app.use("/", quoteRouter);

// page not found handler
app.use(notFound)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.error(`Quote server listening on port ${port}`);
    });
  } catch (err) {
    console.error(err.message);
  }
};

start()
