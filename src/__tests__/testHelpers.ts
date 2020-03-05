import fs from "fs";

import { Tokenizr } from "../../build";

export function getStatelessTokenizr(debug = false): Tokenizr {
  const tokenizr = new Tokenizr({ debug });

  tokenizr.rule(/[a-zA-Z_][a-zA-Z0-9_]*/, (ctx, match) => {
    ctx.accept("id");
  });

  tokenizr.rule(/[+-]?[0-9]+/, (ctx, match) => {
    ctx.accept("number", parseInt(match[0]));
  });

  tokenizr.rule(/"((?:\\"|[^\r\n])*)"/, (ctx, match) => {
    ctx.accept("string", match[1].replace(/\\"/g, '"'));
  });

  tokenizr.rule(/\/\/[^\r\n]*\r?\n/, (ctx, match) => {
    ctx.ignore();
  });

  tokenizr.rule(/[ \t\r\n]+/, (ctx, match) => {
    ctx.ignore();
  });

  tokenizr.rule(/./, (ctx, match) => {
    ctx.accept("char");
  });

  // eslint-disable-next-line no-sync
  const cfg = fs.readFileSync("sample.cfg", "utf8");

  tokenizr.input(cfg);
  tokenizr.debug(debug);

  return tokenizr;
}

export function getStatefulTokenizr(debug = false): Tokenizr {
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
