import { isAction, isRegExp } from "./lib/guards";
import { Action, DefaultRule, StateRule, TaggedState } from "./types";

export class Rule {
  _state: TaggedState;
  _pattern: RegExp;
  _action: Action;
  _name: string;

  static create(rule: DefaultRule | StateRule): Rule {
    const { pattern, action } = rule;

    const state = "state" in rule ? rule.state : "default";

    if ("name" in rule) {
      return new Rule(state, pattern, action, name);
    }

    return new Rule(state, pattern, action);
  }

  static processState(state: string): TaggedState {
    const pieces = state.split(/\s*,\s*/g);

    const states = pieces.filter(item => !item.startsWith("#"));
    const tags = pieces
      .filter(item => item.startsWith("#"))
      .map(tag => tag.replace("#", ""));

    if (states.length !== 1) {
      throw new Error("exactly one state required");
    }

    return {
      state: states[0],
      tags
    };
  }

  static processPattern(pattern: RegExp): RegExp {
    let flags = "g"; /* ECMAScript <= 5 */

    try {
      const regexp = new RegExp("", "y");
      if (typeof regexp.sticky === "boolean")
        flags = "y"; /* ECMAScript >= 2015 */
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

    return new RegExp(pattern.source, flags);
  }

  constructor(
    state: string | RegExp,
    pattern: RegExp | Action,
    action: Action | string,
    name = "__undefined__"
  ) {
    if (
      isRegExp(state) &&
      isAction(pattern) &&
      typeof action === "string"
    ) {
      this._state = Rule.processState("default");
      this._pattern = Rule.processPattern(state);
      this._action = pattern;
      this._name = name;
    } else {
      this._state = Rule.processState(state as string);
      this._pattern = Rule.processPattern(pattern as RegExp);
      this._action = action as Action;
      this._name = name;
    }
  }
}
