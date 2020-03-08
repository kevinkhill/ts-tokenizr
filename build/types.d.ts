import { ActionContext } from "./ActionContext";
import { Rule } from "./Rule";
export interface TokenizrConfig {
    debug: boolean;
}
export declare type Tags = Record<string, boolean>;
export declare type Action = A1 | A2 | A3;
declare type A1 = (ctx: ActionContext) => void;
declare type A2 = (ctx: ActionContext, match: RegExpExecArray) => void;
declare type A3 = (ctx: ActionContext, match: RegExpExecArray, rule: Rule) => void;
export interface DepthError {
    error: Error;
    depth: number;
}
export interface TaggedState {
    _states: Array<string>;
    _tags: Array<string>;
}
export interface Excerpt {
    prologTrunc: boolean;
    prologText: string;
    tokenText: string;
    epilogText: string;
    epilogTrunc: boolean;
}
export {};
//# sourceMappingURL=types.d.ts.map