export declare class Tokenizr {
    constructor();
    reset(): this;
    error(message: any): any;
    debug(debug: any): this;
    _log(msg: any): void;
    input(input: any): this;
    push(state: any): this;
    pop(): any;
    state(state: any): any;
    tag(tag: any): this;
    tagged(tag: any): boolean;
    untag(tag: any): this;
    before(action: any): this;
    after(action: any): this;
    finish(action: any): this;
    rule(state: any, pattern: any, action: any, name?: string): this;
    _progress(from: any, until: any): void;
    _tokenize(): void;
    token(): any;
    tokens(): any[];
    peek(offset: any): any;
    skip(len: any): this;
    consume(type: any, value: any): any;
    begin(): this;
    depth(): any;
    commit(): this;
    rollback(): this;
    alternatives(...alternatives: any[]): any;
}
//# sourceMappingURL=Tokenizr.d.ts.map