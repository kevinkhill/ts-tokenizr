import { Action, TaggedState } from "./types";
export declare class Rule {
    /**
     * @todo this might need to be set to default in the/a constructor...
     */
    _state: TaggedState;
    _pattern: RegExp;
    _action: Action;
    _name: string;
    get complete(): boolean;
    setName(name: string): void;
    setAction(action: Action): void;
    setState(state: string): void;
    setPattern(pattern: RegExp): void;
    stateMap(mapper: (state: string) => string): Array<string>;
    tagMap(mapper: (state: string) => string): Array<string>;
}
//# sourceMappingURL=Rule.d.ts.map