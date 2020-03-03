import { TaggedState } from "./types";

export function makeState(stateDef: string): State {
  return new State(stateDef);
}

export class State {
  static stringify(state: TaggedState): string {
    let output = state.state;

    if (state.tags.length > 0) {
      output += " " + state.tags.map(tag => `#${tag}`).join(" ");
    }

    return output;
  }

  _tags: Array<string> = [];
  _name = "default";

  get tags(): string {
    return this._tags.map(tag => `#${tag}`).join(" ");
  }

  constructor(stateDef: string) {
    const pieces = stateDef.split(/\s*,\s*/g);
    const states = pieces.filter(p => !p.startsWith("#"));

    this._tags = pieces
      .filter(piece => piece.startsWith("#"))
      .map(tag => tag.replace("#", ""));

    if (states.length !== 1) {
      throw new Error("exactly one state required");
    }
  }

  hasTags(): boolean {
    return this._tags.length > 0;
  }

  toString(): string {
    return `${this._name} ${this.tags}`;
  }
}
