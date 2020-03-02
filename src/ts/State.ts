export function makeState(stateDef: string): State {
  return new State(stateDef);
}

export class State {
  _tags: Array<string> = [];
  _name: string = "default";

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
  }

  toString(): string {
    return `${this._name} ${this.tags}`;
  }
}
