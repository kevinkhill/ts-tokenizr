"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rule {
    constructor() {
        this._name = "unknown";
    }
    get complete() {
        return (typeof this._state !== "undefined" &&
            typeof this._pattern !== "undefined" &&
            typeof this._action !== "undefined" &&
            typeof this._name !== "undefined");
    }
    setName(name) {
        this._name = name;
    }
    setAction(action) {
        this._action = action;
    }
    setState(state) {
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
    setPattern(pattern) {
        /* ECMAScript <= 5 */
        let flags = "g";
        try {
            const regexp = new RegExp("", "y");
            if (typeof regexp.sticky === "boolean") {
                /* ECMAScript >= 2015 */
                flags = "y";
            }
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
        this._pattern = new RegExp(pattern.source, flags);
    }
    stateMap(mapper) {
        return this._state._states.map(mapper);
    }
    tagMap(mapper) {
        return this._state._tags.map(mapper);
    }
}
exports.Rule = Rule;
