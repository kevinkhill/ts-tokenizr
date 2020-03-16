import { Stack } from "./Stack";

export class StateStack extends Stack<string> {
  constructor(private defaultState: string) {
    super();
    this.defaultState = defaultState;
    this.elements.push(this.defaultState);
  }

  get isEmpty(): boolean {
    return this.elements.length === 1;
  }

  clear(): void {
    this.elements = [this.defaultState];
  }

  pop(): string {
    if (this.isEmpty) {
      throw Error(
        `ERROR: Cannot pop the default state "${this.defaultState}"`
      );
    }

    return this.elements.pop() as string;
  }

  peek(): string {
    return this.elements[this.elements.length - 1];
  }
}
