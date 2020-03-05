"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const excerpt_1 = require("./lib/excerpt");
class ParsingError extends Error {
    constructor(message, pos, line, column, input) {
        super(message);
        this.name = "ParsingError";
        this.message = message;
        this.pos = pos;
        this.line = line;
        this.column = column;
        this.input = input;
    }
    /**
     * Render a useful string representation
     */
    toString() {
        const l = excerpt_1.excerpt(this.input, this.pos);
        const prefix1 = `line ${this.line} (column ${this.column}): `;
        let prefix2 = "";
        for (let i = 0; i < prefix1.length + l.prologText.length; i++)
            prefix2 += " ";
        const msg = "Parsing Error: " +
            this.message +
            "\n" +
            prefix1 +
            l.prologText +
            l.tokenText +
            l.epilogText +
            "\n" +
            prefix2 +
            "^";
        return msg;
    }
}
exports.ParsingError = ParsingError;
