import { Action, TaggedState } from "./types";

export class Rule {
  /**
   * @todo this might need to be set to default in the/a constructor...
   */
  _state!: TaggedState;
  _pattern!: RegExp;
  _action!: Action;
  _name = "unknown";

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

  setName(name: string): void {
    this._name = name;
  }

  setAction(action: Action): void {
    this._action = action;
  }

  setState(state: string): void {
    const pieces = state.split(/\s*,\s*/g);

    const states = pieces.filter(item => !item.startsWith("#"));
    const tags = pieces
      .filter(item => item.startsWith("#"))
      .map(tag => tag.replace("#", ""));

    if (states.length !== 1) {
      throw new Error("exactly one state required");
    }

    this._state = {
      _states: [states[0]],
      _tags: tags
    };
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

  // stateMap(mapper: (state: string) => string): Array<string> {
  //   return this._state._states.map(mapper);
  // }

  // tagMap(mapper: (state: string) => string): Array<string> {
  //   return this._state._tags.map(mapper);
  // }

  tagsToString(): string {
    return Object.keys(this._state._tags)
      .map(tag => `#${tag}`)
      .join(" ");
  }
}
