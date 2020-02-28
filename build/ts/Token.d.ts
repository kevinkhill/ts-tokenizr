/**
 * internal helper class for token representation
 */
export declare class Token {
    constructor(type: any, value: any, text: any, pos?: number, line?: number, column?: number);
    toString(): string;
    isA(type: any, value: any): boolean;
}
//# sourceMappingURL=Token.d.ts.map