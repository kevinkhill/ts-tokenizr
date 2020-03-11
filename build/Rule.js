"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rule {
    // get taggedState(): string {
    //   return `${this._state} ${this.tagsToString()}`;
    // }
    constructor() {
        /**
         * @todo this might need to be set to default in the/a constructor...
         */
        // _state!: TaggedState;
        // _states!: Array<string>;
        this._state = "default";
        this._tags = [];
        this._name = "unknown";
        this.stringify = {};
        this.stringify.tags = () => this._tags.map(tag => `#${tag}`).join(" ");
    }
    get hasState() {
        return typeof this._state !== "undefined";
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
    }
    setAction(action) {
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
    setState(input) {
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
}
exports.Rule = Rule;
