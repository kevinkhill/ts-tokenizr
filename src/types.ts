import { ActionContext } from "./ActionContext";
import { Rule } from "./Rule";

export interface TokenizrConfig {
  debug: boolean;
}

export type Tags = Record<string, boolean>;

export type Action = (
  ctx: ActionContext,
  match: RegExpExecArray,
  rule: Rule
) => void;

export type FinishAction = (ctx: ActionContext) => void;

// export interface Action {
//   (ctx: ActionContext): void;
//   (ctx: ActionContext, match: RegExpExecArray): void;
//   (ctx: ActionContext, match: RegExpExecArray, rule: Rule): void;
//   (ctx?: any, match?: any, rule?: any): void;
// }

// export type Action = A1 | A2 | A3;
// type A1 = (ctx: ActionContext) => void;
// type A2 = (ctx: ActionContext, match: RegExpExecArray) => void;
// type A3 = (
//   ctx: ActionContext,
//   match: RegExpExecArray,
//   rule: Rule
// ) => void;

export interface DepthError {
  error: Error;
  depth: number;
}

export interface TaggedState {
  state: string;
  tags: Array<string>;
}

// export interface TaggedState {
//   _states: Array<string>;
//   _tags: Array<string>;
// }

export interface Excerpt {
  prologTrunc: boolean;
  prologText: string;
  tokenText: string;
  epilogText: string;
  epilogTrunc: boolean;
}
