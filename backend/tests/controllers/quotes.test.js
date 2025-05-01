import { it, expect, describe } from "vitest";

import { getRandomQuote } from "../../controllers/quotes.js";

describe("getRandomQuote()", () => {

  it("Should throw an error if parameter is not an array", () => {
    const input = "invalid";
    const input1 = {}

    const resultFn = () => getRandomQuote(input);
     const resultFn1 = () => getRandomQuote(input1);

    expect(resultFn).toThrowError("Input must be an array");
    expect(resultFn1).toThrowError("Input must be an array");
  });


  it('Should yield undefined if no quote is found', ()=>{
    const quotes = []

    const result = getRandomQuote(quotes)

    expect(result).toBeUndefined()
  })


it("Should throw an error if quotes array does not contain plain objects", () => {
    const quotes = ["not an object", 123, null];

    const resultFn = () => getRandomQuote(quotes);

    expect(resultFn).toThrowError("All elements in the array must be plain objects");
});

});
