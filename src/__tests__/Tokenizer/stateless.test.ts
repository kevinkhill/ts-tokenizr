import {
  getSampleFileContents,
  getStatelessTokenizr
} from "./__helpers__";

describe("ts-tokenizr library, using a stateless tokenizer.", () => {
  const tokenizr = getStatelessTokenizr();

  tokenizr
    .debug(Boolean(process.env.DEBUG))
    .input(getSampleFileContents("sample.cfg"));

  test("should have the expected functionality", () => {
    let tokens;

    try {
      tokens = tokenizr.tokens();
    } catch (ex) {
      console.log(ex.toString());
      throw ex;
    }

    expect(tokens).toBeInstanceOf(Array);
    expect(tokens).toHaveLength(19);

    expect(tokens[0]).toEqual({
      type: "id",
      value: "foo",
      text: "foo",
      pos: 0,
      line: 1,
      column: 1
    });

    expect(tokens[1]).toEqual({
      type: "char",
      value: "{",
      text: "{",
      pos: 4,
      line: 1,
      column: 5
    });

    expect(tokens[2]).toEqual({
      type: "id",
      value: "baz",
      text: "baz",
      pos: 8,
      line: 2,
      column: 3
    });

    expect(tokens[3]).toEqual({
      type: "char",
      value: "=",
      text: "=",
      pos: 12,
      line: 2,
      column: 7
    });

    expect(tokens[4]).toEqual({
      type: "number",
      value: 1,
      text: "1",
      pos: 14,
      line: 2,
      column: 9
    });

    expect(tokens[5]).toEqual({
      type: "id",
      value: "bar",
      text: "bar",
      pos: 36,
      line: 3,
      column: 3
    });

    expect(tokens[6]).toEqual({
      type: "char",
      value: "{",
      text: "{",
      pos: 40,
      line: 3,
      column: 7
    });

    expect(tokens[7]).toEqual({
      type: "id",
      value: "quux",
      text: "quux",
      pos: 46,
      line: 4,
      column: 5
    });

    expect(tokens[8]).toEqual({
      type: "char",
      value: "=",
      text: "=",
      pos: 51,
      line: 4,
      column: 10
    });

    expect(tokens[9]).toEqual({
      type: "number",
      value: 42,
      text: "42",
      pos: 53,
      line: 4,
      column: 12
    });

    expect(tokens[10]).toEqual({
      type: "id",
      value: "hello",
      text: "hello",
      pos: 60,
      line: 5,
      column: 5
    });

    expect(tokens[11]).toEqual({
      type: "char",
      value: "=",
      text: "=",
      pos: 66,
      line: 5,
      column: 11
    });

    // expect(tokens[12]).toEqual({
    //   type: "string",
    //   value: 'hello "world"',
    //   text: 'hello "world"',
    //   pos: 68,
    //   line: 5,
    //   column: 13
    // });

    expect(tokens[13]).toEqual({
      type: "char",
      value: "}",
      text: "}",
      pos: 89,
      line: 6,
      column: 3
    });

    expect(tokens[14]).toEqual({
      type: "id",
      value: "quux",
      text: "quux",
      pos: 93,
      line: 7,
      column: 3
    });

    expect(tokens[15]).toEqual({
      type: "char",
      value: "=",
      text: "=",
      pos: 98,
      line: 7,
      column: 8
    });

    expect(tokens[16]).toEqual({
      type: "number",
      value: 7,
      text: "7",
      pos: 100,
      line: 7,
      column: 10
    });

    expect(tokens[17]).toEqual({
      type: "char",
      value: "}",
      text: "}",
      pos: 102,
      line: 8,
      column: 1
    });

    expect(tokens[18]).toEqual({
      type: "EOF",
      value: "",
      text: "",
      pos: 104,
      line: 9,
      column: 1
    });
  });
});
