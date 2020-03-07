/* eslint-disable @typescript-eslint/no-explicit-any */
export function isRegExp(o: any): o is RegExp {
  return typeof (o as RegExp).compile !== "undefined";
}
