import { it, expect, describe, vi, beforeEach, afterEach } from "vitest";
import request from "supertest";
import app from "../../server";
import { Quote } from "../../models/quotes.js";
import { StatusCodes } from "http-status-codes";

import { getRandomQuote } from "../../controllers/quotes.js";

describe("getRandomQuote()", () => {
  it("Should throw an error if parameter is not an array", () => {
    const input = "invalid";
    const input1 = {};

    const resultFn = () => getRandomQuote(input);
    const resultFn1 = () => getRandomQuote(input1);

    expect(resultFn).toThrowError("Input must be an array");
    expect(resultFn1).toThrowError("Input must be an array");
  });

  it("Should yield undefined if no quote is found", () => {
    const quotes = [];

    const result = getRandomQuote(quotes);

    expect(result).toBeUndefined();
  });

  it("Should throw an error if quotes array does not contain plain objects", () => {
    const quotes = ["not an object", 123, null];

    const resultFn = () => getRandomQuote(quotes);

    expect(resultFn).toThrowError(
      "All elements in the array must be plain objects"
    );
  });

  it("Should throw an error if each quote does not contain both quote and author properties", () => {
    const quotes = [
      { quote: "hello", author: "hadj" },
      { quote: "hello", owner: "hadj" },
    ];

    const resultFn = () => getRandomQuote(quotes);

    expect(resultFn).toThrowError(
      'Each quote must contain both "quote" and "author" properties'
    );
  });

  it("Should return a random quote", () => {
    const quotes = [
      {
        quote:
          "The only limit to our realization of tomorrow is our doubts of today.",
        author: "Franklin D. Roosevelt",
      },
      {
        quote: "In the middle of every difficulty lies opportunity.",
        author: "Albert Einstein",
      },
      {
        quote: "Life is what happens when you're busy making other plans.",
        author: "John Lennon",
      },
    ];

    const result = getRandomQuote(quotes);

    expect(quotes).toContainEqual(result);
  });
});

describe("getAllQuotes()", () => {
  let findMock;

  beforeEach(() => {
    findMock = vi.spyOn(Quote, "find");
  });

  afterEach(() => {
    findMock.mockRestore();
  });

  it(`Should return all quotes with ${StatusCodes.OK} status`, async () => {
    const mockQuotes = [
      {
        quote: "Be yourself; everyone else is already taken.",
        author: "Oscar Wilde",
      },
      {
        quote: "In the middle of every difficulty lies opportunity.",
        author: "Albert Einstein",
      },
    ];

    findMock.mockResolvedValue(mockQuotes);

    const response = await request(app).get("/api/v1/quotes/all");

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.success).toBe(true);
    expect(response.body.quotes).toStrictEqual(mockQuotes);
    expect(findMock).toHaveBeenCalledOnce();
  });

  it(`Should return ${StatusCodes.INTERNAL_SERVER_ERROR} status if there is a server error`, async () => {
    findMock.mockRejectedValue(new Error("Database failure"));
    const response = await request(app).get("/api/v1/quotes/all");

    expect(response.body.success).toBeFalsy();
  });
});

describe("getQuote()", () => {
  let findMock;

  beforeEach(() => {
    findMock = vi.spyOn(Quote, "find");
  });

  afterEach(() => {
    findMock.mockRestore();
  });

  it(`Should return a random quote with ${StatusCodes.OK} status`, async () => {
    const mockQuotes = [
      {
        quote: "Be yourself; everyone else is already taken.",
        author: "Oscar Wilde",
      },
      {
        quote: "In the middle of every difficulty lies opportunity.",
        author: "Albert Einstein",
      },
    ];

    findMock.mockResolvedValue(mockQuotes);

    const response = await request(app).get("/api/v1/quotes/quote");

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.success).toBe(true);
    expect(mockQuotes).toContainEqual(response.body.quote);
    expect(findMock).toHaveBeenCalledOnce();
  });

  it(`Should return ${StatusCodes.NOT_FOUND} status if no quotes are found`, async () => {
    findMock.mockResolvedValue([]);

    const response = await request(app).get("/api/v1/quotes/quote");

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body.success).toBe(false);
    expect(findMock).toHaveBeenCalledOnce();
  });
});

describe("createQuote()", () => {
  let createMock;

  beforeEach(() => {
    createMock = vi.spyOn(Quote, "create");
  });

  afterEach(() => {
    createMock.mockRestore();
  });

  it(`should return new quote with ${StatusCodes.CREATED} status `, async () => {
    const quote = {
      quote: "In the middle of every difficulty lies opportunity.",
      author: "Albert Einstein",
    };

    createMock.mockResolvedValue(quote);

    const response = await request(app)
      .post("/api/v1/quotes/create_quote")
      .send(quote);

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body.newQuote).toStrictEqual(quote);
    expect(response.body.success).toBe(true);
  });
});
