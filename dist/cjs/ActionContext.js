"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionContext = void 0;
const Token_1 = require("./Token");
class ActionContext {
    constructor(tokenizr) {
        this._repeat = false;
        this._reject = false;
        this._ignore = false;
        this._data = {};
        this._match = null;
        this._tokenizr = tokenizr;
    }
    data(key, value) {
        if (typeof value === "undefined") {
            return this._data[key];
        }
        this._data[key] = value;
        return true;
    }
    /**
     * Retrieve information of current matching
     */
    info() {
        const len = this._match ? this._match[0].length : NaN;
        return {
            line: this._tokenizr._line,
            column: this._tokenizr._column,
            pos: this._tokenizr._pos,
            len
        };
    }
    /**
     * Pass-through to the attached tokenizer
     */
    push(state) {
        this._tokenizr.push(state);
        return this;
    }
    /**
     * Pass-through to the attached tokenizer
     */
    pop() {
        this._tokenizr.pop();
        return this;
    }
    state(state) {
        if (typeof state === "undefined") {
            return this._tokenizr.state();
        }
        this._tokenizr.state(state);
        return this;
    }
    /**
     * Pass-through to the attached tokenizer
     */
    tag(tag) {
        this._tokenizr.tag(tag);
        return this;
    }
    /**
     * Pass-through to the attached tokenizer
     */
    tagged(tag) {
        return this._tokenizr.tagged(tag);
    }
    /**
     * Pass-through to the attached tokenizer
     */
    untag(tag) {
        this._tokenizr.untag(tag);
        return this;
    }
    /**
     * Mark current matching to be repeated from scratch
     */
    repeat() {
        this._tokenizr._log("    REPEAT");
        this._repeat = true;
        return this;
    }
    /**
     * Mark current matching to be rejected
     */
    reject() {
        this._tokenizr._log("    REJECT");
        this._reject = true;
        return this;
    }
    /**
     * Mark current matching to be ignored
     */
    ignore() {
        this._tokenizr._log("    IGNORE");
        this._ignore = true;
        return this;
    }
    accept(type, value) {
        if (this._match === null) {
            throw Error("this._match was null when trying to .accept()");
        }
        if (typeof value === "undefined") {
            // eslint-disable-next-line no-param-reassign
            value = this._match[0];
        }
        this._tokenizr._log(`    ACCEPT: type: ${type}, value: ` +
            `${JSON.stringify(value)} (${typeof value}), text: "${this._match[0]}"`);
        this._tokenizr._pending.push(new Token_1.Token(type, value, this._match[0], this._tokenizr._pos, this._tokenizr._line, this._tokenizr._column));
        return this;
    }
    /**
     * Immediately stop tokenization
     */
    stop() {
        this._tokenizr._stopped = true;
        return this;
    }
}
exports.ActionContext = ActionContext;
