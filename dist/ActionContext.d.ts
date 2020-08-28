import { Tokenizr } from "./Tokenizr";
export declare class ActionContext {
    _tokenizr: Tokenizr;
    _repeat: boolean;
    _reject: boolean;
    _ignore: boolean;
    _data: Record<string, unknown>;
    _match: RegExpExecArray | null;
    constructor(tokenizr: Tokenizr);
    /**
     * Store and retrieve user data attached to context
     */
    data(key: string): unknown;
    data(key: string, value: unknown): void;
    /**
     * Retrieve information of current matching
     */
    info(): {
        line: number;
        column: number;
        pos: number;
        len: number;
    };
    /**
     * Pass-through to the attached tokenizer
     */
    push(state: string): this;
    /**
     * Pass-through to the attached tokenizer
     */
    pop(): this;
    /**
     * Pass-through to the attached tokenizer
     */
    state(): string;
    state(state: string): this;
    /**
     * Pass-through to the attached tokenizer
     */
    tag(tag: string): this;
    /**
     * Pass-through to the attached tokenizer
     */
    tagged(tag: string): boolean;
    /**
     * Pass-through to the attached tokenizer
     */
    untag(tag: string): this;
    /**
     * Mark current matching to be repeated from scratch
     */
    repeat(): this;
    /**
     * Mark current matching to be rejected
     */
    reject(): this;
    /**
     * Mark current matching to be ignored
     */
    ignore(): this;
    /**
     * Accept current matching as a new token
     */
    accept(type: string): this;
    accept(type: string, value: unknown): this;
    /**
     * Immediately stop tokenization
     */
    stop(): this;
}
