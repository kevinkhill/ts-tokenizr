"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tokenizr = void 0;
const ActionContext_1 = require("./ActionContext");
const lib_1 = require("./lib");
const ParsingError_1 = require("./lib/ParsingError");
const StateStack_1 = require("./lib/StateStack");
const Rule_1 = require("./Rule");
const Token_1 = require("./Token");
class Tokenizr {
    constructor(config) {
        this._len = 0;
        this._pos = 0;
        this._line = 1;
        this._column = 1;
        this._input = "";
        this._eof = false;
        this._stopped = false;
        this._rules = [];
        this._pending = [];
        this._after = null;
        this._before = null;
        this._finish = null;
        this._tag = {};
        // _state: Array<string> = ["default"];
        this._transaction = [];
        this.config = Object.assign(Object.assign({}, Tokenizr.defaults), config);
        this._state = new StateStack_1.StateStack("default");
        this._ctx = new ActionContext_1.ActionContext(this);
    }
    /**
     * Reset the internal state
     */
    reset() {
        this._input = "";
        this._len = 0;
        this._eof = false;
        this._pos = 0;
        this._line = 1;
        this._column = 1;
        // this._state = ["default"];
        // this._tag = {};
        this._transaction = [];
        this._pending = [];
        this._stopped = false;
        this._state.clear();
        this._ctx = new ActionContext_1.ActionContext(this);
        return this;
    }
    /**
     * Create an error message for the current position
     */
    error(message) {
        return new ParsingError_1.ParsingError(message, this._pos, this._line, this._column, this._input);
    }
    /**
     * Configure debug operation
     */
    debug(debug) {
        this.config.debug = debug;
        return this;
    }
    /**
     * Provide (new) input string to tokenize
     */
    input(input) {
        lib_1.assertIsString(input);
        this.reset();
        this._input = input;
        this._len = input.length;
        return this;
    }
    /**
     * Push state
     */
    push(state) {
        const oldState = this._state.peek();
        this._state.push(state);
        this._log(`    STATE (PUSH): old: <${oldState}>, new: <${state}>`);
        return this;
    }
    /**
     * Pop state from the stack
     */
    pop() {
        if (this._state.length < 2) {
            throw new Error("no more custom states to pop");
        }
        /*  pop old state  */
        const oldState = this._state.pop();
        this._log(`    STATE (POP): old: <${oldState}>, new: <${this._state.peek()}>`);
        return this;
    }
    state(state) {
        if (typeof state === "undefined") {
            return this._state.peek();
        }
        this._log("    STATE (SET): " +
            `old: <${this._state.peek()}>, ` +
            `new: <${state}>`);
        this._state.push(state);
        return this;
    }
    /**
     * Set a tag
     */
    tag(tag) {
        this._tag[tag] = true;
        this._log(`    TAG (ADD): ${tag}`);
        return this;
    }
    /**
     * Check whether tag is set
     */
    tagged(tag) {
        return this._tag[tag] === true;
    }
    /**
     * Unset a tag
     */
    untag(tag) {
        delete this._tag[tag];
        this._log(`    TAG (DEL): ${tag}`);
        return this;
    }
    /**
     * Configure a tokenization before-rule callback
     */
    before(action) {
        this._before = action;
        return this;
    }
    /**
     * Configure a tokenization after-rule callback
     */
    after(action) {
        this._after = action;
        return this;
    }
    /**
     * Configure a tokenization finish callback
     */
    finish(action) {
        this._finish = action;
        return this;
    }
    rule(state, pattern, action = "unknown", name = "unknown") {
        const rule = new Rule_1.Rule();
        if (typeof state === "string") {
            rule.setState(state);
        }
        else {
            rule.setState("default");
            rule.setPattern(state);
        }
        if (lib_1.isRegExp(pattern)) {
            rule.setPattern(pattern);
        }
        else {
            rule.setAction(pattern);
        }
        if (typeof action === "string") {
            rule.setName(action);
        }
        else {
            rule.setAction(action);
        }
        if (typeof name === "string") {
            rule.setName(name);
        }
        this._rules.push(rule);
        if (this.config.debug) {
            this._log(`rule: configure rule (state: ${rule.states}, pattern: ${rule._pattern.source})`);
        }
        return this;
    }
    /**
     * Sugar method for ignoring a token w/o defining an Action to ignore
     */
    ignoreRule(pattern) {
        return this.rule(pattern, ctx => ctx.ignore());
    }
    /**
     * Determine and return next token
     */
    token() {
        /*  if no more tokens are pending, try to determine a new one  */
        if (this._pending.length === 0) {
            this._tokenize();
        }
        /*  return now potentially pending token  */
        if (this._pending.length > 0) {
            const token = this._pending.shift();
            if (token) {
                if (this._transaction.length > 0) {
                    this._transaction[0].push(token);
                }
                this._log(`TOKEN: ${token.toString()}`);
                return token;
            }
        }
        /*  no more tokens  */
        return null;
    }
    /**
     * Determine and return all tokens as an Array
     */
    tokens() {
        const result = [];
        let token;
        while ((token = this.token()) !== null)
            result.push(token);
        return result;
    }
    /**
     * Determine and generate tokens efficiently with a generator
     */
    *tokenGenerator() {
        let token;
        while ((token = this.token()) !== null) {
            yield token;
        }
    }
    /**
     * Sugar method for setting the input and parsing for tokens in one method.
     */
    tokenize(contents) {
        this.input(contents);
        return this.tokens();
    }
    /**
     * Peek at the next token or token at particular offset
     */
    peek(offset = 0) {
        for (let i = 0; i < this._pending.length + offset; i++) {
            this._tokenize();
        }
        if (offset >= this._pending.length) {
            throw new Error("not enough tokens available for peek operation");
        }
        this._log(`PEEK: ${this._pending[offset].toString()}`);
        return this._pending[offset];
    }
    /**
     * Skip one or more tokens
     */
    skip(len = 1) {
        for (let i = 0; i < this._pending.length + len; i++) {
            this._tokenize();
        }
        if (len > this._pending.length) {
            throw new Error("not enough tokens available for skip operation");
        }
        // eslint-disable-next-line no-param-reassign
        while (len-- > 0) {
            this.token();
        }
        return this;
    }
    /**
     * Consume the current token (by expecting it to be a particular symbol)
     */
    consume(type, value) {
        for (let i = 0; i < this._pending.length + 1; i++) {
            this._tokenize();
        }
        if (this._pending.length === 0) {
            throw new Error("not enough tokens available for consume operation");
        }
        const token = this.token();
        this._log(`CONSUME: ${token.toString()}`);
        const raiseError = (expectedValue, expectedType) => {
            throw new ParsingError_1.ParsingError(`expected: <type: ${type}, value: ${JSON.stringify(expectedValue)} (${expectedType})>, ` +
                `found: <type: ${token.type}, value: ${JSON.stringify(token.value)} (${typeof token.value})>`, token.pos, token.line, token.column, this._input);
        };
        if (value && !token.isA(type, value)) {
            raiseError(value, typeof value);
        }
        else if (!token.isA(type)) {
            raiseError("*", "any");
        }
        return token;
    }
    /**
     * Open tokenization transaction
     */
    begin() {
        this._log(`BEGIN: level ${this._transaction.length}`);
        this._transaction.unshift([]);
        return this;
    }
    /**
     * Determine depth of still open tokenization transaction
     */
    depth() {
        if (this._transaction.length === 0) {
            throw new Error("cannot determine depth -- no active transaction");
        }
        return this._transaction[0].length;
    }
    /**
     * Close (successfully) tokenization transaction
     */
    commit() {
        if (this._transaction.length === 0) {
            throw new Error("cannot commit transaction -- no active transaction");
        }
        this._transaction.shift();
        this._log(`COMMIT: level ${this._transaction.length}`);
        return this;
    }
    /**
     * Close (unsuccessfully) tokenization transaction
     */
    rollback() {
        if (this._transaction.length === 0) {
            throw new Error("cannot rollback transaction -- no active transaction");
        }
        this._pending = this._transaction[0].concat(this._pending);
        this._transaction.shift();
        this._log(`ROLLBACK: level ${this._transaction.length}`);
        return this;
    }
    /**
     * Execute multiple alternative callbacks
     */
    alternatives(...alternatives) {
        let result = null;
        let depths = [];
        for (let i = 0; i < alternatives.length; i++) {
            try {
                this.begin();
                result = alternatives[i].call(this, this);
                this.commit();
                break;
            }
            catch (error) {
                depths.push({
                    error,
                    depth: this.depth()
                });
                this.rollback();
                this._log(`EXCEPTION: ${error.toString()}`);
                continue;
            }
        }
        if (result === null && depths.length > 0) {
            depths = depths.sort((a, b) => a.depth - b.depth);
            throw depths[0].error;
        }
        return result;
    }
    /**
     * Output a debug message
     */
    _log(msg) {
        if (this.config.debug) {
            /* eslint no-console: off */
            console.log(`tokenizr: ${msg}`);
        }
    }
    /**
     * Determine the next token
     */
    _tokenize() {
        /*  helper function for finishing parsing  */
        const finish = () => {
            if (!this._eof) {
                if (this._finish !== null) {
                    this._finish.call(this._ctx, this._ctx);
                }
                this._eof = true;
                this._pending.push(new Token_1.Token("EOF", "", "", this._pos, this._line, this._column));
            }
        };
        /*  tokenize only as long as we were not stopped and there is input left  */
        if (this._stopped || this._pos >= this._len) {
            finish();
            return;
        }
        /*  loop...  */
        let continued = true;
        while (continued) {
            continued = false;
            /*  some optional debugging context  */
            if (this.config.debug) {
                const e = lib_1.excerpt(this._input, this._pos);
                const tags = Object.keys(this._tag)
                    .map(tag => `#${tag}`)
                    .join(" ");
                this._log(`INPUT: state: <${this._state.peek()}>, tags: <${tags}>, text: ` +
                    (e.prologTrunc ? "..." : '"') +
                    `${e.prologText}<${e.tokenText}>${e.epilogText}` +
                    (e.epilogTrunc ? "..." : '"') +
                    `, at: <line ${this._line}, column ${this._column}>`);
            }
            /*  iterate over all rules...  */
            for (let i = 0; i < this._rules.length; i++) {
                const $rule = this._rules[i];
                if (this.config.debug) {
                    let state = $rule.states[0];
                    if ($rule.states.length > 1) {
                        state = $rule.states.join(", ");
                    }
                    this._log(`  RULE: state(s): <${state}>, pattern: ${$rule._pattern.source}`);
                }
                /*  one of rule's states (and all of its tags) has to match  */
                let matches = false;
                let statesMatch = false;
                const currentState = this._state.peek();
                // let idx = states.indexOf("*");
                /** didn't match the "any" state */
                if ($rule.willMatchAnyState === false) {
                    statesMatch = $rule.hasState(currentState);
                }
                /** state matched, so check tags if any */
                if (statesMatch) {
                    matches = true;
                    const matchedState = $rule.getState(currentState);
                    if (matchedState.isTagged) {
                        const tags = matchedState.filterTags(tag => !this._tag[tag]);
                        if (tags.length > 0) {
                            matches = false;
                        }
                    }
                }
                if (!matches)
                    continue;
                /*  match pattern at the last position  */
                $rule._pattern.lastIndex = this._pos;
                let found = $rule._pattern.exec(this._input);
                $rule._pattern.lastIndex = this._pos;
                if ((found = $rule._pattern.exec(this._input)) !== null &&
                    found.index === this._pos) {
                    if (this.config.debug) {
                        this._log("    MATCHED: " + JSON.stringify(found));
                    }
                    /*  pattern found, so give action a chance to operate
                        on it and act according to its results  */
                    this._ctx._match = found;
                    this._ctx._repeat = false;
                    this._ctx._reject = false;
                    this._ctx._ignore = false;
                    if (this._before !== null) {
                        this._before.call(this._ctx, this._ctx, found, $rule);
                    }
                    $rule._action.call(this._ctx, this._ctx, found, $rule);
                    if (this._after !== null) {
                        this._after.call(this._ctx, this._ctx, found, $rule);
                    }
                    /*  reject current action, continue matching  */
                    if (this._ctx._reject) {
                        continue;
                    }
                    /*  repeat matching from scratch  */
                    if (this._ctx._repeat) {
                        continued = true;
                        break;
                    }
                    /*  ignore token  */
                    if (this._ctx._ignore) {
                        this._progress(this._pos, $rule._pattern.lastIndex);
                        this._pos = $rule._pattern.lastIndex;
                        if (this._pos >= this._len) {
                            finish();
                            return;
                        }
                        continued = true;
                        break;
                    }
                    /*  accept token(s)  */
                    if (this._pending.length > 0) {
                        this._progress(this._pos, $rule._pattern.lastIndex);
                        this._pos = $rule._pattern.lastIndex;
                        if (this._pos >= this._len) {
                            finish();
                        }
                        return;
                    }
                    /*  nothing worked  */
                    throw new Error(`action of pattern "${$rule._pattern.source}" neither rejected nor accepted any token(s)`);
                }
            }
        }
        /*  no pattern matched at all  */
        throw this.error("token not recognized");
    }
    /**
     * Progress the line/column counter
     */
    _progress(from, until) {
        const line = this._line;
        const column = this._column;
        const s = this._input;
        for (let i = from; i < until; i++) {
            const c = s.charAt(i);
            if (c === "\r") {
                this._column = 1;
            }
            else if (c === "\n") {
                this._line++;
                this._column = 1;
            }
            else if (c === "\t") {
                this._column += 8 - (this._column % 8);
            }
            else {
                this._column++;
            }
        }
        this._log(`    PROGRESS: characters: ${until - from}, ` +
            `from: <line ${line}, column ${column}>, ` +
            `to: <line ${this._line}, column ${this._column}>`);
    }
}
exports.Tokenizr = Tokenizr;
Tokenizr.defaults = {
    debug: false
};
