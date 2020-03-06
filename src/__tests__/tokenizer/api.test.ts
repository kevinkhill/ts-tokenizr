import { Tokenizr } from "../../Tokenizr";

let tokenizr: Tokenizr;

beforeAll(() => {
  tokenizr = new Tokenizr();
});

describe("ts-tokenizr library", () => {
  test("should expose its official API", () => {
    expect(tokenizr.token).toBeInstanceOf(Function);
    expect(tokenizr.tokens).toBeInstanceOf(Function);
    expect(tokenizr.tag).toBeInstanceOf(Function);
    expect(tokenizr.tagged).toBeInstanceOf(Function);
    expect(tokenizr.untag).toBeInstanceOf(Function);
  });
});

describe("tags and tagging", () => {
  test("should have the expected functionality", () => {
    expect(tokenizr.tagged("test")).toBeFalsy();

    tokenizr.tag("test");

    expect(tokenizr.tagged("test")).toBeTruthy();

    tokenizr.untag("test");

    expect(tokenizr.tagged("test")).toBeFalsy();
  });
});
