export declare class State {
    static default(): State;
    static create(taggedState: string): State;
    name: string;
    tags: string[];
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
    filterTags(cb: (tag: string) => boolean): string[];
    hasTag(tag: string): boolean;
    tag(tag: string): this;
    unTag(tag: string): this;
}
export declare function statesMatch(state1: string | State, state2: string | State): boolean;
