"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const guards_1 = require("./lib/guards");
class Rule {
    constructor(state, pattern, action, name = "__undefined__") {
        if (guards_1.isRegExp(state) &&
            guards_1.isAction(pattern) &&
            typeof action === "string") {
            this._state = Rule.processState("default");
            this._pattern = Rule.processPattern(state);
            this._action = pattern;
            this._name = name;
        }
        else {
            this._state = Rule.processState(state);
            this._pattern = Rule.processPattern(pattern);
            this._action = action;
            this._name = name;
        }
    }
    static create(rule) {
        const { pattern, action } = rule;
        const state = "state" in rule ? rule.state : "default";
        if ("name" in rule) {
            return new Rule(state, pattern, action, name);
        }
        return new Rule(state, pattern, action);
    }
    static processState(state) {
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
    static processPattern(pattern) {
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
    mapStates(cb) {
        return this._state._states.map(cb);
    }
    mapTags(cb) {
        return this._state._tags.map(cb);
    }
}
exports.Rule = Rule;
