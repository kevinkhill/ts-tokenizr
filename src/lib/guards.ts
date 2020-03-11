import { AssertionError } from "assert";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function isRegExp(o: any): o is RegExp {
  return typeof (o as RegExp).compile !== "undefined";
}

export function assertIsString(
  input: any,
  error?: string
): asserts input is string {
  if (typeof input !== "string") {
    throw new AssertionError({
      expected: "string",
      actual: typeof input,
      message: error || "The given input must be a string."
    });
  }
}
