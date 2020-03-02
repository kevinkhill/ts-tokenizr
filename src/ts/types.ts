import { ActionContext } from "./ActionContext";

export interface DepthError {
  error: Error;
  depth: number;
}

export interface Excerpt {
  prologTrunc: boolean;
  prologText: string;
  tokenText: string;
  epilogText: string;
  epilogTrunc: boolean;
}

export interface Rule {
  state: Array<string>;
  pattern: RegExp;
  action: Function;
  name: string;
}

export type Action = (
  ctx: ActionContext,
  match?: Array<string>,
  rule?: Rule
) => void;

export interface TokenizrConfig {
  debug: boolean;
}
