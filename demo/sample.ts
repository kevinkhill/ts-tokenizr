import fs from "fs";
import path from "path";

import { Tokenizr } from "../src";

const lexer = new Tokenizr({
  debug: false
});

// This still works, but I like config objects
// lexer.debug(false);

lexer.rule(/[a-zA-Z_][a-zA-Z0-9_]*/, ctx => {
  ctx.accept("id");
});

lexer.rule(/[+-]?[0-9]+/, (ctx, match) => {
  ctx.accept("number", parseInt(match[0]));
});

lexer.rule(/"((?:\\"|[^\r\n])*)"/, (ctx, match) => {
  ctx.accept("string", match[1].replace(/\\"/g, '"'));
});

lexer.rule(/\/\/[^\r\n]*\r?\n/, ctx => {
  ctx.ignore();
});

// Sugar method to save writing `ctx => ctx.ignore()`
lexer.ignoreRule(/[ \t\r\n]+/);

lexer.rule(/./, ctx => {
  ctx.accept("char");
});

fs.promises
  .readFile(path.join(__dirname, "sample.cfg"), "utf8")
  .then(contents => {
    const tokens = lexer.tokenize(contents);

    console.log(tokens.join("\n"));

    // lexer.input(contents);
    // lexer.tokens().forEach(token => {
    //   console.log(token.toString());
    // });
  });
