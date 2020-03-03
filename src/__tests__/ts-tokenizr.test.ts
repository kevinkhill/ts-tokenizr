const { createTokenizer } = require("./testHelpers");

describe("ts-tokenizr library", () => {
  const tokenizr = createTokenizer();

  test("should expose its official API", () => {
    expect(tokenizr.token).toBeInstanceOf(Function);
    expect(tokenizr.tokens).toBeInstanceOf(Function);
    expect(tokenizr.tag).toBeInstanceOf(Function);
    expect(tokenizr.tagged).toBeInstanceOf(Function);
    expect(tokenizr.untag).toBeInstanceOf(Function);
  });

  test("should have the expected functionality", () => {
    let tokens;

    try {
      tokens = tokenizr.tokens();
    } catch (ex) {
      console.log(ex.toString());
      throw ex;
    }

    expect(tokens).toBeInstanceOf(Array);
    expect(tokens).toHaveLength(5);
    expect(tokens[0]).toEqual({
      type: "syml",
        value: "foo",
      text: "            po 0,
        lin            colu: 1
      });

    expect(tokens[1]).toEqual({
      type: "numr",
        value: 42,
      text:             po 3,
        lin            colu: 4
      });

    expect(tokens[2]).toEqual({
      type: "strg",
        value: "bar baz",
      text: '"bar b            po 8,
        lin            colu: 2
      });

    expect(tokens[3]).toEqual({
      type: "syml",
        value: "quux",
      text: "q            pos20,
        lin            colu: 2
      });
  });
});
