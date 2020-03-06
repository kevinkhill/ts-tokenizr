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
    info(): Record<string, number>;
    /**
     * Pass-through to the attached tokenizer
     *
     * @inheritdoc
     */
    push(state: string): this;
    /**
     * Pass-through to the attached tokenizer
     *
     * @inheritdoc
     */
    pop(): this;
    /**
     * Get / Set state in the context
     *
     * @todo dont like this...
     */
    state(state?: string): this | string;
    /**
     * Pass-through to the attached tokenizer
     *
     * @inheritdoc
     */
    tag(tag: string): this;
    /**
     * Pass-through to the attached tokenizer
     *
     * @inheritdoc
     */
    tagged(tag: string): boolean;
    /**
     * Pass-through to the attached tokenizer
     *
     * @inheritdoc
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
     *
     * @todo does`this._match[0]` always have a string if the action
     *       is getting called from a rule that matched the pattern?
     */
    accept(type: string): this;
    accept(type: string, value: unknown): this;
    /**
     * Immediately stop tokenization
     */
    stop(): this;
}
//# sourceMappingURL=ActionContext.d.ts.map