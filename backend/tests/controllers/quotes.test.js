import { it, expect, describe } from "vitest";

import { getRandomQuote } from "../../controllers/quotes.js";

describe("getRandomQuote()", () => {
  it("Should throw an error if parameter is not of type array", () => {
    const input = "invalid";
    const resultFn = () => getRandomQuote(input);
    expect(resultFn).toThrowError("Input must be an array");
  });
});
