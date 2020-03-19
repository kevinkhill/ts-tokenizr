import { Tokenizr } from "../../Tokenizr";

describe("tags and tagging", () => {
  const tokenizr = new Tokenizr();

  test("should have the expected functionality", () => {
    expect(tokenizr.tagged("test")).toBeFalsy();

    tokenizr.tag("test");

    expect(tokenizr.tagged("test")).toBeTruthy();

    tokenizr.untag("test");

    expect(tokenizr.tagged("test")).toBeFalsy();
  });
});
