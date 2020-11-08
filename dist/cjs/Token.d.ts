export declare class Token {
    type: string;
    value: unknown;
    text: string;
    pos: number;
    line: number;
    column: number;
    constructor(type: string, value: unknown, text: string, pos?: number, line?: number, column?: number);
    toString(): string;
    isA(type: string, value?: unknown): boolean;
}
