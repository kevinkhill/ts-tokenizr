export class MatchResult {
  matched = false;

  input!: string;
  index!: number;
  result: Array<string> = [];

  length: number;
  map: Array<string>["map"];
  find: Array<string>["find"];
  filter: Array<string>["filter"];
  includes: Array<string>["includes"];

  constructor(execArray: RegExpExecArray | null) {
    if ((this.matched = execArray !== null)) {
      this.index = execArray.index;
      delete execArray.index;

      this.input = execArray.input;
      delete execArray.input;

      this.result = Array.from(execArray);
    }

    this.map = this.result.map;
    this.find = this.result.find;
    this.filter = this.result.filter;
    this.length = this.result.length;
    this.includes = this.result.includes;
  }
}
