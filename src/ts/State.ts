export function makeState(stateDef: string): TaggedState {
  return new TaggedState(stateDef);
}

export class TaggedState {
  static stringify(): string {
    let output = this._states;

    if (state.tags.length > 0) {
      output += " " + state.tags.map(tag => `#${tag}`).join(" ");
    }

    return output;
  }

  _tags: Array<string> = [];
  _states: Array<string> = ["default"];

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
    return `${this._states.join(", ")} ${this.tagsToString()}`;
  }

  tagsToString(): string {
    return this._tags.map(tag => `#${tag}`).join(" ");
  }

  pushState(state: string): this {
    this._states.push(state);

    return this;
  }

  popState(): string | undefined {
    return this._states.pop();
  }

  pushTag(tag: string): this {
    this._tags.push(tag);

    return this;
  }

  popTag(): string | undefined {
    return this._tags.pop();
  }
}
