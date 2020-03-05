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
    data(key: string, value?: unknown): unknown | void;
    /**
     * Retrieve information of current matching
     */
    info(): Record<string, number>;
    /**
     * Pass-through functions to attached tokenizer
     */
    push(...args: any[]): this;
    pop(...args: any[]): any;
    state(...args: any[]): any;
    tag(...args: any[]): this;
    tagged(...args: any[]): any;
    untag(...args: any[]): this;
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
    accept(type: string, value?: never): this;
    /**
     * Immediately stop tokenization
     */
    stop(): this;
}
//# sourceMappingURL=ActionContext.d.ts.map