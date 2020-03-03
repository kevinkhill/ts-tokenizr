import { Action, Rule } from "./types";
import { postProcessPattern, postProcessState } from "./util";

export function defaultRule(
  pattern: RegExp,
  action: Action,
  name = "unknown"
): Rule {
  return {
    state: postProcessState("default"),
    pattern: postProcessPattern(pattern),
    action,
    name
  };
}

export function stateRule(
  state: string,
  pattern: RegExp,
  action: Action,
  name = "unknown"
): Rule {
  return {
    state: postProcessState(state),
    pattern: postProcessPattern(pattern),
    action,
    name
  };
}
