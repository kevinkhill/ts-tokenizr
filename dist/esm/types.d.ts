import { ActionContext } from "./ActionContext";
import { Rule } from "./Rule";
export interface TokenizrConfig {
    debug: boolean;
}
export declare type Tags = Record<string, boolean>;
export declare type Action = (ctx: ActionContext, match: RegExpExecArray, rule: Rule) => void;
export declare type FinishAction = (ctx: ActionContext) => void;
export interface DepthError {
    error: Error;
    depth: number;
}
export interface TaggedState {
    state: string;
    tags: string[];
}
export interface Excerpt {
    prologTrunc: boolean;
    prologText: string;
    tokenText: string;
    epilogText: string;
    epilogTrunc: boolean;
}
export interface MatchResult {
    result: string[];
}
export declare type NoMatch = MatchResult & {
    matched: false;
};
export declare type Matched = MatchResult & {
    matched: true;
};
