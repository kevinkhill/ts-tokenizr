import { State } from "./State";
import { Action } from "./types";
export declare class Rule {
    _action: Action;
    _name: string;
    _pattern: RegExp;
    _states: Array<State>;
    stringify: Record<string, Function>;
    get willMatchAnyState(): boolean;
    get hasPattern(): boolean;
    get hasAction(): boolean;
    get hasName(): boolean;
    toString(): string;
    hasState(state: string): boolean;
    getState(state: string): State;
    getStates(): Array<string>;
    /**
     * Test a string against the rule
     */
    test(input: string): RegExpExecArray | null;
    setName(name: string): this;
    setAction(action: Action): this;
    /**
     * Set the state (and tags) for the Rule
     *
     * @example
     * setState("*")
     * setState("default")
     * setState("comment #open")
     * setState("foo #bar, baz #qux")
     */
    setState(input: string): this;
    /**
     * Add another matching state (and tags) for the Rule
     *
     * @example
     * setState("*")
     * setState("default")
     * setState("comment #open")
     * setState("custom #foo #bar #baz")
     */
    addState(input: string): this;
    setPattern(pattern: RegExp): this;
}
//# sourceMappingURL=Rule.d.ts.map