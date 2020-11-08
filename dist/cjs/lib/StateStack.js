"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateStack = void 0;
const Stack_1 = require("./Stack");
class StateStack extends Stack_1.Stack {
    constructor(defaultState) {
        super();
        this.defaultState = defaultState;
        this.defaultState = defaultState;
        this.elements.push(this.defaultState);
    }
    get isEmpty() {
        return this.elements.length === 1;
    }
    clear() {
        this.elements = [this.defaultState];
    }
    pop() {
        if (this.isEmpty) {
            throw Error(`ERROR: Cannot pop the default state "${this.defaultState}"`);
        }
        return this.elements.pop();
    }
    peek() {
        return this.elements[this.elements.length - 1];
    }
}
exports.StateStack = StateStack;
