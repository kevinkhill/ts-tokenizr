export class Stack {
    constructor() {
        this.elements = [];
    }
    static init(element) {
        const stack = new Stack();
        stack.push(element);
        return stack;
    }
    get length() {
        return this.elements.length;
    }
    get isEmpty() {
        return this.length === 0;
    }
    get isNotEmpty() {
        return !this.isEmpty;
    }
    clear() {
        this.elements = [];
    }
    push(element) {
        return this.elements.push(element);
    }
    pop() {
        return this.elements.pop();
    }
    peek() {
        return this.isNotEmpty ? this.elements[this.length - 1] : undefined;
    }
}
