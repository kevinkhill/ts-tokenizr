export class MatchResult {
  matched = false;

  input?: string;
  index?: number;
  result: string[] = [];

  length: number;
  map: string[]["map"];
  find: string[]["find"];
  filter: string[]["filter"];
  includes: string[]["includes"];

  constructor(execArray: RegExpExecArray | null) {
    if ((this.matched = execArray !== null)) {
      this.input = execArray.input;
      this.index = execArray.index;

      Object.entries(execArray).forEach(([key, value]) => {
        if (key !== "groups" && key !== "input" && key !== "index") {
          this.result.push(value);
        }
      });
    }

    this.map = this.result.map;
    this.find = this.result.find;
    this.filter = this.result.filter;
    this.length = this.result.length;
    this.includes = this.result.includes;
  }
}
