export declare class State {
    static default(): State;
    static create(taggedState: string): State;
    _name: string;
    _tags: Array<string>;
    get isTagged(): boolean;
    constructor(stateDef: string);
    toString(): string;
    stringifyTags(): string;
    /**
     * Test if this state's name mathces the provided name
     */
    is(state: string): boolean;
    /**
     * Test if two State objects match
     */
    matches(state: State): boolean;
    filterTags(cb: (tag: string) => boolean): Array<string>;
    hasTag(tag: string): boolean;
    tag(tag: string): this;
    unTag(tag: string): this;
}
//# sourceMappingURL=State.d.ts.map