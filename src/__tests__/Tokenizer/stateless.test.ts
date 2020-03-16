import { getStatelessTokenizr } from "../__helpers__";

describe("ts-tokenizr library, without states", () => {
  const tokenizr = getStatelessTokenizr();

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
    expect(tokens).toHaveLength(10);

    expect(tokens[0]).toEqual({
      type: "id",
      value: "foo42",
      text: "foo42",
      pos: 0,
      line: 1,
      column: 1
    });

    expect(tokens[1]).toEqual({
      type: "char",
      value: ",",
      text: ",",
      pos: 5,
      line: 1,
      column: 6
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
      type: "char",
      value: ",",
      text: ",",
      pos: 17,
      line: 2,
      column: 11
    });

    expect(tokens[4]).toEqual({
      type: "id",
      value: "quux",
      text: "quux",
      pos: 20,
      line: 3,
      column: 2
    });

    expect(tokens[5]).toEqual({
      type: "char",
      value: "/",
      text: "/",
      pos: 24,
      line: 3,
      column: 6
    });

    expect(tokens[6]).toEqual({
      type: "char",
      value: "*",
      text: "*",
      pos: 25,
      line: 3,
      column: 7
    });

    expect(tokens[7]).toEqual({
      type: "char",
      value: "*",
      text: "*",
      pos: 27,
      line: 3,
      column: 9
    });

    expect(tokens[8]).toEqual({
      type: "char",
      value: "/",
      text: "/",
      pos: 28,
      line: 3,
      column: 10
    });

    expect(tokens[9]).toEqual({
      type: "EOF",
      value: "",
      text: "",
      pos: 29,
      line: 3,
      column: 11
    });
  });
});
