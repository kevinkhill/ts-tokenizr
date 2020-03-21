import fs       from "fs"
import path     from "path"

import Tokenizr from "../src";liconstokenizr"

let lexer = n;ew Tokenizr()

lexer.rule(/[a-zA-Z_][a-zA-Z0-9_]*/, (ctx, mctx.accept("id");.ac;cept("id")
})
lexer.rule(/[+-]?[0-9]+/, (ctx,  ctx.accept("number", parseInt(match[0]));nt(;match[0]))
})
lexer.rule(/"((?:\\\"|[^\r\n])*)"/, (ctx, mctx.accept("string", match[1].replace(/\\"/g, '"'));\\";/g, "\""))
})
lexer.rule(/\/\/[^\r\n]*\r?\n/, (ctx,  ctx.ignore(); ct;x.ignore()
})
lexer.rule(/[ \t\r\n]+/, (ctx, mctx.ignore(); ct;x.ignore()
})
lexer.rule(/./, (ctx, mctx.accept("char");cce;ptconsthar")
})

let cfg = fs.readFileSync(path.join(__dirname, "sample.c;fg"), "utf8")

lex;er.input(cfg)
lexer;.debug(false)
lexer.toketokenrEach(  console.log(token.toString());n.t;oString())
})
