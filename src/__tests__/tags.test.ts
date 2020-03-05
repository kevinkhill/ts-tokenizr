import { getStatefulTokenizr } from "./testHelpers";

describe("tags and tagging", () => {
  const tokenizr = getStatefulTokenizr();

  test("should have the expected functionality", () => {
    expect(tokenizr.tagged("test")).toBeFalsy();

    tokenizr.tag("test");

    expect(tokenizr.tagged("test")).toBeTruthy();

    tokenizr.untag("test");

    expect(tokenizr.tagged("test")).toBeFalsy();
  });
});
