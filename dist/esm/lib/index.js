import { MatchResult } from "./MatchResult";
export * from "./guards";
export { arrayEquals } from "./arrayEquals";
export { excerpt } from "./excerpt";
export { MatchResult };
export { ParsingError } from "./ParsingError";
export { StateStack } from "./StateStack";
export function toString(obj) {
    return Object.prototype.toString.call(obj);
}
