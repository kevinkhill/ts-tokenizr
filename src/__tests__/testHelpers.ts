import { Tokenizr } from "../../build";

export function getTokenizr(debug = false): Tokenizr {
  const tokenizr = new Tokenizr({ debug });

  tokenizr.rule("default", /[a-zA-Z]+/, (ctx /*, m */) => {
    ctx.accept("symbol");
  });

  tokenizr.rule("default", /[0-9]+/, (ctx, m) => {
    ctx.accept("number", parseInt(m[0]));
  });

  tokenizr.rule("default", /"((?:\\"|[^\r\n]+)+)"/, (ctx, m) => {
    ctx.accept("string", m[1].replace(/\\"/g, '"'));
  });

  tokenizr.rule("default", /\/\*/, (ctx /*, m */) => {
    ctx.push("comment");
    ctx.tag("bar");
    ctx.ignore();
  });

  tokenizr.rule("comment #foo #bar", /\*\//, (/* ctx, m */) => {
    throw new Error("should never enter");
  });

  tokenizr.rule("comment #bar", /\*\//, (ctx /*, m */) => {
    ctx.untag("bar");
    ctx.pop();
    ctx.ignore();
  });

  tokenizr.rule("comment #bar", /./, (ctx /*, m */) => {
    ctx.ignore();
  });

  tokenizr.rule("default", /\s*,\s*/, (ctx /*, m */) => {
    ctx.ignore();
  });

  tokenizr.input('foo42,\n "bar baz",\n quux/* */');
  tokenizr.debug(debug);

  return tokenizr;
}
