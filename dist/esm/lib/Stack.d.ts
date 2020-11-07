export declare class Stack<T> {
    static init<T>(element: T): Stack<T>;
    protected elements: T[];
    get length(): number;
    get isEmpty(): boolean;
    get isNotEmpty(): boolean;
    clear(): void;
    push(element: T): number;
    pop(): T | undefined;
    peek(): T | undefined;
}
