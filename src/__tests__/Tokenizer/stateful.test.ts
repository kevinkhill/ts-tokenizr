import { getStatefulTokenizr } from "./__helpers__";

describe("ts-tokenizr library, using a stateful tokenizer.", () => {
  const tokenizr = getStatefulTokenizr();

  tokenizr
    .debug(Boolean(process.env.DEBUG))
    .input(`foo42,\n "bar baz",\n quux/* */`);

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
      type: "symbol",
      value: "foo",
      text: "foo",
      pos: 0,
      line: 1,
      column: 1
    });

    expect(tokens[1]).toEqual({
      type: "number",
      value: 42,
      text: "42",
      pos: 3,
      line: 1,
      column: 4
    });

    expect(tokens[2]).toEqual({
      type: "string",
      value: "bar baz",
      text: '"bar baz"',
      pos: 8,
      line: 2,
      column: 2
    });

    expect(tokens[3]).toEqual({
      type: "symbol",
      value: "quux",
      text: "quux",
      pos: 20,
      line: 3,
      column: 2
    });
  });
});
