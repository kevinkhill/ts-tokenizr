export class MatchResult {
  matched = false;
  result: Array<string> = [];
  input!: string;
  index!: number;

  constructor(execArray: RegExpExecArray | null) {
    if (execArray !== null) {
      this.index = execArray.index;
      delete execArray.index;

      this.input = execArray.input;
      delete execArray.input;

      this.result = Array.from(execArray);
    }

    this.matched = execArray !== null;
  }

  get length(): number {
    return this.result.length;
  }
}
