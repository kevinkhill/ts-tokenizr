import { MatchResult } from "./lib/MatchResult";
import { State } from "./State";
import { Action } from "./types";
export declare class Rule {
    _action: Action;
    _name: string;
    _pattern: RegExp;
    _states: State[];
    stringify: Record<string, CallableFunction>;
    get states(): string[];
    get willMatchAnyState(): boolean;
    get hasPattern(): boolean;
    get hasAction(): boolean;
    get hasName(): boolean;
    /**
     * Test a string against the {@link Rule}
     */
    test(input: string): MatchResult;
    state(query?: string): State | undefined;
    hasState(state: string): boolean;
    getState(state: string): State;
    getStates(): string[];
    /**
     * Set the name for the Rule
     */
    setName(name: string): this;
    /**
     * Set the {@link Action} for the {@link Rule}
     */
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
