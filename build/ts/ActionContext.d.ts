import { Tokenizr } from "./Tokenizr";
export declare class ActionContext {
    _tokenizr: Tokenizr;
    _data: {};
    _repeat: boolean;
    _reject: boolean;
    _ignore: boolean;
    _match: null;
    constructor(tokenizr: Tokenizr);
    /**
     * Store and retrieve user data attached to context
     */
    data(key: string, value: any): any;
    info(): {
        line: any;
        column: any;
        pos: any;
        len: any;
    };
    push(...args: any[]): this;
    pop(...args: any[]): any;
    state(...args: any[]): any;
    tag(...args: any[]): this;
    tagged(...args: any[]): any;
    untag(...args: any[]): this;
    repeat(): this;
    reject(): this;
    ignore(): this;
    accept(type: any, value: any): this;
    stop(): this;
}
//# sourceMappingURL=ActionContext.d.ts.map