import { TaggedState } from "../types";

export function parseTaggedState(input: string): TaggedState {
  const pieces = input.split(/\s+/);

  const state = pieces.filter(item => !item.startsWith("#"));

  if (state.length !== 1) {
    throw new Error("exactly one state required");
  }

  const tags = pieces
    .filter(item => item.startsWith("#"))
    .map(tag => tag.replace("#", ""));

  return {
    state: state[0],
    tags: tags.length > 0 ? tags : []
  } as TaggedState;
}
