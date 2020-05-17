import { assertIsString } from "./lib/guards";
import { MatchResult } from "./MatchResult";
import { State } from "./State";
import { Action } from "./types";

export class Rule {
  _action!: Action;
  _name = "unknown";
  _pattern!: RegExp;
  _states: Array<State> = [];
  // _tags: Array<string> = [];

  stringify: Record<string, Function> = {};

  get states(): Array<string> {
    return this._states.map((state) => state.toString());
  }

  get willMatchAnyState(): boolean {
    return this.hasState("*");
  }

  get hasPattern(): boolean {
    return typeof this._pattern !== "undefined";
  }

  get hasAction(): boolean {
    return typeof this._action !== "undefined";
  }

  get hasName(): boolean {
    return typeof this._name !== "undefined";
  }

  /**
   * Test a string against the {@link Rule}
   */
  test(input: string): MatchResult {
    return new MatchResult(this._pattern.exec(input));
  }

  state(query?: string): State | undefined {
    assertIsString(query);

    return this._states.find((state) => state.name === query);
  }

  hasState(state: string): boolean {
    return this._states.filter((s) => s.is(state)).length > 0;
  }

  getState(state: string): State {
    if (!this.hasState(state)) {
      throw Error();
    }

    return this._states.find((s) => s.is(state)) as State;
  }

  getStates(): Array<string> {
    return this._states.map((item) => item.name);
  }

  /**
   * Set the name for the Rule
   */
  setName(name: string): this {
    this._name = name;

    return this;
  }

  /**
   * Set the {@link Action} for the {@link Rule}
   */
  setAction(action: Action): this {
    this._action = action;

    return this;
  }

  /**
   * Set the state (and tags) for the Rule
   *
   * @example
   * setState("*")
   * setState("default")
   * setState("comment #open")
   * setState("foo #bar, baz #qux")
   */
  setState(input: string): this {
    const stateDefs = input.split(/\s*,\s*/g);

    this._states = stateDefs.map(State.create);

    return this;
  }

  /**
   * Add another matching state (and tags) for the Rule
   *
   * @example
   * setState("*")
   * setState("default")
   * setState("comment #open")
   * setState("custom #foo #bar #baz")
   */
  addState(input: string): this {
    this._states.push(new State(input));

    return this;
  }

  setPattern(pattern: RegExp): this {
    /* ECMAScript <= 5 */
    let flags = "g";

    try {
      const regexp = new RegExp("", "y");
      if (typeof regexp.sticky === "boolean") {
        /* ECMAScript >= 2015 */
        flags = "y";
      }
    } catch (ex) {
      /*  no-op  */
    }

    if (typeof pattern.multiline === "boolean" && pattern.multiline)
      flags += "m";
    if (typeof pattern.dotAll === "boolean" && pattern.dotAll)
      flags += "s";
    if (typeof pattern.ignoreCase === "boolean" && pattern.ignoreCase)
      flags += "i";
    if (typeof pattern.unicode === "boolean" && pattern.unicode)
      flags += "u";

    this._pattern = new RegExp(pattern.source, flags);

    return this;
  }
}
