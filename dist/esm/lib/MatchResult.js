export class MatchResult {
    constructor(execArray) {
        this.matched = false;
        this.result = [];
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
