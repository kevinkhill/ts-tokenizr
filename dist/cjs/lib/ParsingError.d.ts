export declare class ParsingError extends Error {
    pos: number;
    line: number;
    column: number;
    input: string;
    constructor(message: string, pos: number, line: number, column: number, input: string);
    /**
     * Render a useful string representation
     */
    toString(): string;
}
