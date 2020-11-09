import { promises } from "fs";
import { join } from "path";
import { Tokenizr } from "../dist/esm";

const lexer = new Tokenizr({
  debug: false
});

// Debugging can be toggled after creating an instance.
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

(async () => {
  const sample = join(__dirname, "sample.cfg");
  const contents = await promises.readFile(sample, "utf8");
  const tokens = lexer.tokenize(contents);

  console.log(tokens.join("\n"));

  // This way also works
  // lexer.input(contents);
  // lexer.tokens().forEach(token => {
  //   console.log(token.toString());
  // });
})();
