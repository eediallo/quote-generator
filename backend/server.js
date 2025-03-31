import express from "express";
import cors from "cors";
import { quoteRouter } from "./routes/quote.js";
import { connectDB } from "./db/connect.js";
import dotenv from "dotenv";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { authRouter } from "./routes/user.js";
dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// parse json
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
     <h1>
        eediallo Quote Server
    </h1>
    <p> <a href="/api/v1/quotes">All quotes</a></p>
    <p><a href="/api/v1/quote">Random quote</a></p>
    `);
});

// routes
app.use("/", quoteRouter);
app.use("/api/v1/auth", authRouter);

// page not found handler

// pars error handler
app.use(errorHandler);
app.use(notFound);

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

start();
