import { Action, DefaultRule, StateRule, TaggedState } from "./types";
export declare class Rule {
    _state: TaggedState;
    _pattern: RegExp;
    _action: Action;
    _name: string;
    static create(rule: DefaultRule | StateRule): Rule;
    static processState(state: string): TaggedState;
    static processPattern(pattern: RegExp): RegExp;
    constructor(state: string | RegExp, pattern: RegExp | Action, action: Action | string, name?: string);
}
//# sourceMappingURL=Rule.d.ts.map