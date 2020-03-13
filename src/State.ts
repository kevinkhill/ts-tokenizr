import { arrayEquals } from "./lib";

export class State {
  static default(): State {
    return new State("default");
  }

  static create(taggedState: string): State {
    return new State(taggedState);
  }

  _name = "default";
  _tags: Array<string> = [];

  constructor(stateDef: string) {
    const pieces = stateDef.split(/\s+/g);
    const states = pieces.filter(p => !p.startsWith("#"));

    if (states.length !== 1) {
      throw new Error("exactly one state required");
    }

    this._name = states[0];
    this._tags = pieces
      .filter(piece => piece.startsWith("#"))
      .map(tag => tag.replace("#", ""));
  }

  toString(): string {
    return `${this._name} ${this.stringifyTags()}`;
  }

  stringifyTags(): string {
    return this._tags.map(tag => `#${tag}`).join(" ");
  }

  /**
   * Test if this state's name mathces the provided name
   */
  is(state: string): boolean {
    return this._name === state;
  }

  /**
   * Test if two State objects match
   */
  matches(state: State): boolean {
    return (
      this._name === state._name && arrayEquals(this._tags, state._tags)
    );
  }

  hasTag(tag: string): boolean {
    return this._tags.includes(tag);
  }

  isTagged(): boolean {
    return this._tags.length > 0;
  }

  tag(tag: string): this {
    this._tags.push(tag);

    return this;
  }

  unTag(tag: string): this {
    delete this._tags[this._tags.indexOf(tag)];

    return this;
  }
}
