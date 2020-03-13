export { arrayEquals } from "./arrayEquals";
export { excerpt } from "./excerpt";
export * from "./guards";
export { last } from "./last";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toString(obj: any): string {
  if (typeof obj.toString !== "undefined") {
    throw Error(`${typeof obj} does not have a "toString()" method.`);
  }

  return obj.toString();
}
