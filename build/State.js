"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function makeState(stateDef) {
    return new TaggedState(stateDef);
}
exports.makeState = makeState;
class TaggedState {
    constructor(stateDef) {
        // stringify(): string {
        //   let output = this._states;
        //   if (state.tags.length > 0) {
        //     output += " " + state.tags.map(tag => `#${tag}`).join(" ");
        //   }
        //   return output;
        // }
        this._tags = [];
        this._states = ["default"];
        const pieces = stateDef.split(/\s*,\s*/g);
        const states = pieces.filter(p => !p.startsWith("#"));
        this._tags = pieces
            .filter(piece => piece.startsWith("#"))
            .map(tag => tag.replace("#", ""));
        if (states.length !== 1) {
            throw new Error("exactly one state required");
        }
    }
    hasTags() {
        return this._tags.length > 0;
    }
    toString() {
        return `${this._states.join(", ")} ${this.tagsToString()}`;
    }
    tagsToString() {
        return this._tags.map(tag => `#${tag}`).join(" ");
    }
    pushState(state) {
        this._states.push(state);
        return this;
    }
    popState() {
        return this._states.pop();
    }
    pushTag(tag) {
        this._tags.push(tag);
        return this;
    }
    popTag() {
        return this._tags.pop();
    }
}
exports.TaggedState = TaggedState;
