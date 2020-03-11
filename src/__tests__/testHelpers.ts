import fs from "fs";
import path from "path";

import { Tokenizr } from "../Tokenizr";

export function readfile(filename): string {
  // eslint-disable-next-line no-sync
  return fs.readFileSync(path.join(__dirname, filename), "utf8");
}

const tokenizr = new Tokenizr();

export function getStatelessTokenizr(): Tokenizr {
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

export function getStatefulTokenizr(): Tokenizr {
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
