import { Tokenizr } from "../../../Tokenizr";

export function getStatefulTokenizr(): Tokenizr {
  const tokenizr = new Tokenizr();

  tokenizr.rule("default", /[a-zA-Z]+/, ctx => {
    ctx.accept("symbol");
  });

  tokenizr.rule("default", /[0-9]+/, (ctx, match) => {
    ctx.accept("number", parseInt(match[0]));
  });

  tokenizr.rule("default", /"((?:\\"|[^\r\n]+)+)"/, (ctx, match) => {
    ctx.accept("string", match[1].replace(/\\"/g, '"'));
  });

  tokenizr.rule("default", /\/\*/, ctx => {
    ctx.push("comment");
    ctx.tag("bar");
    ctx.ignore();
  });

  tokenizr.rule("comment #foo #bar", /\*\//, () => {
    throw new Error("should never enter");
  });

  tokenizr.rule("comment #bar", /\*\//, ctx => {
    ctx.untag("bar");
    ctx.pop();
    ctx.ignore();
  });

  tokenizr.rule("comment #bar", /./, ctx => {
    ctx.ignore();
  });

  tokenizr.rule("default", /\s*,\s*/, ctx => {
    ctx.ignore();
  });

  return tokenizr;
}
