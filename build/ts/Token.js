"use strict";
/* eslint-disable @typescript-eslint/explicit-function-return-type */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * internal helper class for token representation
 */
class Token {
    constructor(type, value, text, pos = 0, line = 0, column = 0) {
        this.type = type;
        this.value = value;
        this.text = text;
        this.pos = pos;
        this.line = line;
        this.column = column;
    }
    toString() {
        return [
            `<type: ${this.type}, `,
            `value: ${JSON.stringify(this.value)}, `,
            `text: ${JSON.stringify(this.text)}, `,
            `pos: ${this.pos}, `,
            `line: ${this.line}, `,
            `column: ${this.column}>`
        ].join();
    }
    isA(type, value) {
        if (type !== this.type)
            return false;
        if (arguments.length === 2 && value !== this.value)
            return false;
        return true;
    }
}
exports.Token = Token;
