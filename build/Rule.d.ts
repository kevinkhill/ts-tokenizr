import { Action } from "./types";
export declare class Rule {
    /**
     * @todo this might need to be set to default in the/a constructor...
     */
    _state: string;
    _pattern: RegExp;
    _action: Action;
    _tags: Array<string>;
    _name: string;
    stringify: Record<string, Function>;
    get hasState(): boolean;
    get hasPattern(): boolean;
    get hasAction(): boolean;
    get hasName(): boolean;
    constructor();
    /**
     * Test a string against the rule
     */
    test(input: string): RegExpExecArray | null;
    setName(name: string): void;
    setAction(action: Action): void;
    /**
     * Set the state (and tags) for the Rule
     *
     * @example
     * setState("*")
     * setState("default")
     * setState("comment #open")
     * setState("custom #foo #bar #baz")
     */
    setState(input: string): void;
    setPattern(pattern: RegExp): void;
}
//# sourceMappingURL=Rule.d.ts.map