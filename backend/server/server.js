import express from "express";
import cors from "cors";
import { quoteRouter } from "../routes/quote.js";

const staticDir = new URL("../frontend/static", import.meta.url).pathname;

const app = express();
const port = 3000;

app.use(cors());

//setup static  files and middleware
app.use(express.static(staticDir));

// quote router
app.use("/", quoteRouter);

app.listen(port, () => {
  console.error(`Quote server listening on port ${port}`);
});
