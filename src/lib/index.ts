export { arrayEquals } from "./arrayEquals";
export { excerpt } from "./excerpt";
export * from "./guards";
export { StateStack } from "./StateStack";

export function toString(obj: unknown): string {
  return Object.prototype.toString.call(obj);
}
