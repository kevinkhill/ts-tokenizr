import { Stack } from "./Stack";
export declare class StateStack extends Stack<string> {
    private defaultState;
    constructor(defaultState: string);
    get isEmpty(): boolean;
    clear(): void;
    pop(): string;
    peek(): string;
}
