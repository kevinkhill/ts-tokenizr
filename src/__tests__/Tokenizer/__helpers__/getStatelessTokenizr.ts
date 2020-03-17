import { Tokenizr } from "../../../Tokenizr";

export function getStatelessTokenizr(): Tokenizr {
  const tokenizr = new Tokenizr();

  tokenizr.rule(/[a-zA-Z_][a-zA-Z0-9_]*/, ctx => {
    ctx.accept("id");
  });

  tokenizr.rule(/[+-]?[0-9]+/, (ctx, match) => {
    ctx.accept("number", parseInt(match[0]));
  });

  tokenizr.rule(/"((?:\\"|[^\r\n])*)"/, (ctx, match) => {
    ctx.accept("string", match[1].replace(/\\"/g, '"'));
  });

  tokenizr.rule(/\/\/[^\r\n]*\r?\n/, ctx => {
    ctx.ignore();
  });

  tokenizr.rule(/[ \t\r\n]+/, ctx => {
    ctx.ignore();
  });

  tokenizr.rule(/./, ctx => {
    ctx.accept("char");
  });

  return tokenizr;
}
