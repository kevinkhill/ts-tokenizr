import { TaggedState, Tags } from "../types";

export function stringifyTags(tags: Tags | Array<string>): string {
  if (!Array.isArray(tags)) {
    // eslint-disable-next-line no-param-reassign
    tags = Object.keys(tags);
  }

  return tags.map(tag => `#${tag}`).join(" ");
}

export function postProcessState(state: string): TaggedState {
  const pieces = state.split(/\s*,\s*/g);

  const states = pieces.filter(item => !item.startsWith("#"));
  const tags = pieces
    .filter(item => item.startsWith("#"))
    .map(tag => tag.replace("#", ""));

  if (states.length !== 1) {
    throw new Error("exactly one state required");
  }

  return {
    _states: [states[0]],
    _tags: tags
  };
}

export function postProcessPattern(pattern: RegExp): RegExp {
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
