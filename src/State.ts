import { arrayEquals } from "./lib";

export class State {
  static default(): State {
    return new State("default");
  }

  static create(taggedState: string): State {
    return new State(taggedState);
  }

  name = "default";
  tags: Array<string> = [];

  get isTagged(): boolean {
    return this.tags.length > 0;
  }

  constructor(stateDef: string) {
    const pieces = stateDef.split(/\s+/g);
    const states = pieces.filter(p => !p.startsWith("#"));

    if (states.length !== 1) {
      throw new Error("exactly one state required");
    }

    this.name = states[0];
    this.tags = pieces
      .filter(piece => piece.startsWith("#"))
      .map(tag => tag.replace("#", ""));
  }

  toString(): string {
    return `${this.name} ${this.stringifyTags()}`;
  }

  stringifyTags(): string {
    return this.tags.map(tag => `#${tag}`).join(" ");
  }

  /**
   * Test if this state's name mathces the provided name
   */
  is(state: string): boolean {
    return this.name === state;
  }

  /**
   * Test if two State objects match
   */
  matches(state: State): boolean {
    return (
      this.name === state.name && arrayEquals(this.tags, state.tags)
    );
  }

  filterTags(cb: (tag: string) => boolean): Array<string> {
    return this.tags.filter(cb);
  }

  hasTag(tag: string): boolean {
    return this.tags.includes(tag);
  }

  tag(tag: string): this {
    this.tags.push(tag);

    return this;
  }

  unTag(tag: string): this {
    delete this.tags[this.tags.indexOf(tag)];

    return this;
  }
}

export function statesMatch(
  state1: string | State,
  state2: string | State
): boolean {
  if (state1 instanceof State) {
    // eslint-disable-next-line no-param-reassign
    state1 = state1.name;
  }

  if (state2 instanceof State) {
    // eslint-disable-next-line no-param-reassign
    state2 = state2.name;
  }

  return state1 === state2;
}
