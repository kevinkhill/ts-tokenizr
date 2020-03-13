"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const State_1 = require("./State");
class Rule {
    constructor() {
        this._name = "unknown";
        this._states = [];
        // _tags: Array<string> = [];
        this.stringify = {};
    }
    get willMatchAnyState() {
        return this.hasState("*");
    }
    get hasPattern() {
        return typeof this._pattern !== "undefined";
    }
    get hasAction() {
        return typeof this._action !== "undefined";
    }
    get hasName() {
        return typeof this._name !== "undefined";
    }
    toString() {
        return this._states.map(toString).join(", ");
    }
    hasState(state) {
        return this._states.filter(s => s.is(state)).length > 0;
    }
    getState(state) {
        if (!this.hasState(state)) {
            throw Error();
        }
        return this._states.find(s => s.is(state));
    }
    getStates() {
        return this._states.map(item => item._name);
    }
    /**
     * Test a string against the rule
     */
    test(input) {
        return this._pattern.exec(input);
    }
    // tagsToString(): string {
    //   return this._tags.map(tag => `#${tag}`).join(" ");
    // }
    setName(name) {
        this._name = name;
        return this;
    }
    setAction(action) {
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
    setState(input) {
        const stateDefs = input.split(/\s*,\s*/g);
        this._states = stateDefs.map(State_1.State.create);
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
    addState(input) {
        this._states.push(new State_1.State(input));
        return this;
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
        return this;
    }
}
exports.Rule = Rule;
