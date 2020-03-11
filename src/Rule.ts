import { Action } from "./types";

export class Rule {
  /**
   * @todo this might need to be set to default in the/a constructor...
   */
  // _state!: TaggedState;
  // _states!: Array<string>;
  _state = "default";
  _pattern!: RegExp;
  _action!: Action;
  _tags: Array<string> = [];
  _name = "unknown";

  stringify: Record<string, Function> = {};

  get hasState(): boolean {
    return typeof this._state !== "undefined";
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

  // get taggedState(): string {
  //   return `${this._state} ${this.tagsToString()}`;
  // }

  constructor() {
    this.stringify.tags = () =>
      this._tags.map(tag => `#${tag}`).join(" ");
  }

  /**
   * Test a string against the rule
   */
  test(input: string): RegExpExecArray | null {
    return this._pattern.exec(input);
  }

  // tagsToString(): string {
  //   return this._tags.map(tag => `#${tag}`).join(" ");
  // }

  setName(name: string): void {
    this._name = name;
  }

  setAction(action: Action): void {
    this._action = action;
  }

  /**
   * Set the state (and tags) for the Rule
   *
   * @example
   * setState("*")
   * setState("default")
   * setState("comment #open")
   * setState("custom #foo #bar #baz")
   */
  setState(input: string): void {
    // @TODO I MESSED THIS UP!!!!
    const pieces = input.split(/\s+/);

    const state = pieces.filter(item => !item.startsWith("#"));

    if (state.length !== 1) {
      throw new Error("exactly one state required");
    }

    this._state = state[0];
    this._tags = pieces
      .filter(item => item.startsWith("#"))
      .map(tag => tag.replace("#", ""));
  }

  setPattern(pattern: RegExp): void {
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
  }
}
