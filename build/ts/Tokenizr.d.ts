import { ActionContext } from "./ActionContext";
import { ParsingError } from "./ParsingError";
import { Token } from "./Token";
export declare class Tokenizr {
    _before: null;
    _after: null;
    _finish: null;
    _rules: Array<never>;
    _debug: boolean;
    _input: string;
    _len: number;
    _eof: boolean;
    _pos: number;
    _line: number;
    _column: number;
    _state: Array<string>;
    _tag: {};
    _transaction: Array<never>;
    _pending: Array<never>;
    _stopped: boolean;
    _ctx: ActionContext;
    constructor();
    /**
     * Reset the internal state
     */
    reset(): this;
    /**
     * Create an error message for the current position
     */
    error(message: string): ParsingError;
    /**
     * Configure debug operation
     */
    debug(debug: boolean): this;
    /**
     * Output a debug message
     */
    _log(msg: string): void;
    /**
     * Provide (new) input string to tokenize
     */
    input(input: string): this;
    push(state: any): this;
    pop(): string | undefined;
    state(state: any): string | this;
    tag(tag: any): this;
    tagged(tag: any): boolean;
    untag(tag: any): this;
    before(action: any): this;
    after(action: any): this;
    finish(action: any): this;
    /**
     * Configure a tokenization rule
     */
    rule(state: any, pattern: any, action: any, name?: string): this;
    /**
     * Progress the line/column counter
     */
    private _progress;
    /**
     * Determine and return the next token
     */
    private _tokenize;
    /**
     * Determine and return next token
     */
    token(): Token;
    /**
     * Determine and return all tokens
     */
    tokens(): Array<Token>;
    /**
     * Determine and generate tokens
     */
    /**
     * Peek at the next token or token at particular offset
     */
    peek(offset: number): never;
    /**
     * Skip one or more tokens
     */
    skip(len: number): this;
    /**
     * Consume the current token (by expecting it to be a particular symbol)
     */
    consume(type: any, value: any): Token;
    /**
     * Open tokenization transaction
     */
    begin(): this;
    /**
     * Determine depth of still open tokenization transaction
     */
    depth(): number;
    /**
     * Close (successfully) tokenization transaction
     */
    commit(): this;
    /**
     * Close (unsuccessfully) tokenization transaction
     */
    rollback(): this;
    /**
     * Execute multiple alternative callbacks
     */
    alternatives(...alternatives: any[]): null;
}
//# sourceMappingURL=Tokenizr.d.ts.map