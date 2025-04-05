import express from "express";
import cors from "cors";
import { quoteRouter } from "./routes/quote.js";
import { connectDB } from "./db/connect.js";
import dotenv from "dotenv";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { authRouter } from "./routes/user.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import { StatusCodes } from "http-status-codes";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// parse json
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "A simple Express API",
    },
    servers: [
      {
        url: "https://eediallo-qoute-server.hosting.codeyourfuture.io/api/v1/quotes",
      },
    ],
  },
  apis: ["./collection.yml"], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use(
  "/api-docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerSpec)
);

app.get("/", (req, res) => {
  res
    .status(StatusCodes.OK)
    .send(
      '<h1>Quote Generator</h1><a href="/api-docs">Access Documentation here</a>'
    );
});

// routes
app.use("/api/v1/quotes", quoteRouter);
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
