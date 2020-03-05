import { ActionContext } from "./ActionContext";
export declare type Tags = Record<string, boolean>;
export declare type Action = (ctx: ActionContext, match?: Array<string>, rule?: Rule) => void;
export interface TokenizrConfig {
    debug: boolean;
}
export interface DepthError {
    error: Error;
    depth: number;
}
export interface TaggedState {
    state: string;
    tags: Array<string>;
}
export interface StateRule {
    state: string;
    pattern: RegExp;
    action: Action;
    name?: string;
}
export interface DefaultRule {
    pattern: RegExp;
    action: Action;
    name?: string;
}
export interface Rule {
    state: TaggedState;
    pattern: RegExp;
    action: Action;
    name: string;
}
export interface Excerpt {
    prologTrunc: boolean;
    prologText: string;
    tokenText: string;
    epilogText: string;
    epilogTrunc: boolean;
}
//# sourceMappingURL=types.d.ts.map