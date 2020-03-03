export declare function makeState(stateDef: string): TaggedState;
export declare class TaggedState {
    static stringify(): string;
    _tags: Array<string>;
    _states: Array<string>;
    get tags(): string;
    constructor(stateDef: string);
    hasTags(): boolean;
    toString(): string;
    pushState(state: string): this;
    popState(): string | undefined;
    pushTag(tag: string): this;
    popTag(): string | undefined;
}
//# sourceMappingURL=State.d.ts.map