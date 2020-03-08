"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stringifyTags(tags) {
    if (!Array.isArray(tags)) {
        // eslint-disable-next-line no-param-reassign
        tags = Object.keys(tags);
    }
    return tags.map(tag => `#${tag}`).join(" ");
}
exports.stringifyTags = stringifyTags;
function postProcessState(state) {
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
exports.postProcessState = postProcessState;
function postProcessPattern(pattern) {
    let flags = "g"; /* ECMAScript <= 5 */
    try {
        const regexp = new RegExp("", "y");
        if (typeof regexp.sticky === "boolean")
            flags = "y"; /* ECMAScript >= 2015 */
    }
    catch (ex) {
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
exports.postProcessPattern = postProcessPattern;
