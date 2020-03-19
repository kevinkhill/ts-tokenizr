import { Tokenizr } from "../../Tokenizr";

describe("ts-tokenizr library", () => {
  const tokenizr = new Tokenizr();

  test("should expose its official API", () => {
    expect(tokenizr.debug).toBeInstanceOf(Function);
    expect(tokenizr.rule).toBeInstanceOf(Function);

    expect(tokenizr.push).toBeInstanceOf(Function);
    expect(tokenizr.pop).toBeInstanceOf(Function);

    expect(tokenizr.token).toBeInstanceOf(Function);
    expect(tokenizr.tokens).toBeInstanceOf(Function);

    expect(tokenizr.tag).toBeInstanceOf(Function);
    expect(tokenizr.tagged).toBeInstanceOf(Function);
    expect(tokenizr.untag).toBeInstanceOf(Function);

    expect(tokenizr.before).toBeInstanceOf(Function);
    expect(tokenizr.after).toBeInstanceOf(Function);
    expect(tokenizr.finish).toBeInstanceOf(Function);

    expect(tokenizr.peek).toBeInstanceOf(Function);
    expect(tokenizr.skip).toBeInstanceOf(Function);
    expect(tokenizr.consume).toBeInstanceOf(Function);

    expect(tokenizr.begin).toBeInstanceOf(Function);
    expect(tokenizr.depth).toBeInstanceOf(Function);
    expect(tokenizr.commit).toBeInstanceOf(Function);
    expect(tokenizr.rollback).toBeInstanceOf(Function);
    expect(tokenizr.alternatives).toBeInstanceOf(Function);
  });
});
