"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statesMatch = exports.State = void 0;
const lib_1 = require("./lib");
class State {
    constructor(stateDef) {
        this.name = "default";
        this.tags = [];
        const pieces = stateDef.split(/\s+/g);
        const states = pieces.filter(p => !p.startsWith("#"));
        if (states.length !== 1) {
            throw new Error("exactly one state required");
        }
        this.name = states[0];
        this.tags = pieces
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
        return this.tags.length > 0;
    }
    toString() {
        return `${this.name} ${this.stringifyTags()}`;
    }
    stringifyTags() {
        return this.tags.map(tag => `#${tag}`).join(" ");
    }
    /**
     * Test if this state's name mathces the provided name
     */
    is(state) {
        return this.name === state;
    }
    /**
     * Test if two State objects match
     */
    matches(state) {
        return (this.name === state.name && lib_1.arrayEquals(this.tags, state.tags));
    }
    filterTags(cb) {
        return this.tags.filter(cb);
    }
    hasTag(tag) {
        return this.tags.includes(tag);
    }
    tag(tag) {
        this.tags.push(tag);
        return this;
    }
    unTag(tag) {
        delete this.tags[this.tags.indexOf(tag)];
        return this;
    }
}
exports.State = State;
function statesMatch(state1, state2) {
    if (state1 instanceof State) {
        // eslint-disable-next-line no-param-reassign
        state1 = state1.name;
    }
    if (state2 instanceof State) {
        // eslint-disable-next-line no-param-reassign
        state2 = state2.name;
    }
    return state1 === state2;
}
exports.statesMatch = statesMatch;
