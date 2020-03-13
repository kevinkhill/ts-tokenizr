"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("./lib");
class State {
    constructor(stateDef) {
        this._name = "default";
        this._tags = [];
        const pieces = stateDef.split(/\s+/g);
        const states = pieces.filter(p => !p.startsWith("#"));
        if (states.length !== 1) {
            throw new Error("exactly one state required");
        }
        this._name = states[0];
        this._tags = pieces
            .filter(piece => piece.startsWith("#"))
            .map(tag => tag.replace("#", ""));
    }
    static default() {
        return new State("default");
    }
    static create(taggedState) {
        return new State(taggedState);
    }
    get isTagged() {
        return this._tags.length > 0;
    }
    toString() {
        return `${this._name} ${this.stringifyTags()}`;
    }
    stringifyTags() {
        return this._tags.map(tag => `#${tag}`).join(" ");
    }
    /**
     * Test if this state's name mathces the provided name
     */
    is(state) {
        return this._name === state;
    }
    /**
     * Test if two State objects match
     */
    matches(state) {
        return (this._name === state._name && lib_1.arrayEquals(this._tags, state._tags));
    }
    filterTags(cb) {
        return this._tags.filter(cb);
    }
    hasTag(tag) {
        return this._tags.includes(tag);
    }
    tag(tag) {
        this._tags.push(tag);
        return this;
    }
    unTag(tag) {
        delete this._tags[this._tags.indexOf(tag)];
        return this;
    }
}
exports.State = State;
