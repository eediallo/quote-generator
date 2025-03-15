import express from "express";
import cors from "cors";

const staticDir = new URL("../frontend/static", import.meta.url).pathname;

const app = express();
const port = 3000;

app.use(cors());

//setup static  files and middleware
app.use(express.static(staticDir));

const quotes = [
  {
    quote:
      "Either write something worth reading or do something worth writing.",
    author: "Benjamin Franklin",
  },
  {
    quote: "I should have been more kind.",
    author: "Clive James",
  },
];

function randomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}


app.get("/api/quote", (_, res) => {
  const quote = randomQuote();
  console.log(quote);
  res.json(quote);
});


app.post("/", (req, res) => {
  const bodyBytes = [];
  req.on("data", (chunk) => bodyBytes.push(...chunk));
  req.on("end", () => {
    const bodyString = String.fromCharCode(...bodyBytes);
    let body;
    try {
      body = JSON.parse(bodyString);
    } catch (error) {
      console.error(`Failed to parse body ${bodyString} as JSON: ${error}`);
      res.status(400).send("Expected body to be JSON.");
      return;
    }
    if (typeof body != "object" || !("quote" in body) || !("author" in body)) {
      console.error(
        `Failed to extract quote and author from post body: ${bodyString}`
      );
      res
        .status(400)
        .send(
          "Expected body to be a JSON object containing keys quote and author."
        );
      return;
    }
    quotes.push({
      quote: body.quote,
      author: body.author,
    });
    res.json(body);
  });
});

app.listen(port, () => {
  console.error(`Quote server listening on port ${port}`);
});
