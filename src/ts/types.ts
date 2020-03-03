import { ActionContext } from "./ActionContext";

export type Tags = Record<string, boolean>;

export type Action = (
  ctx: ActionContext,
  match?: Array<string>,
  rule?: Rule
) => void;

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

export interface Rule {
  state: TaggedState;
  pattern: RegExp;
  action: Function;
  name: string;
}

export interface Excerpt {
  prologTrunc: boolean;
  prologText: string;
  tokenText: string;
  epilogText: string;
  epilogTrunc: boolean;
}
