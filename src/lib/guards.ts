import { AssertionError } from "assert";

export function isRegExp(o: unknown): o is RegExp {
  return typeof (o as RegExp).compile !== "undefined";
}

export function assertIsString(
  input: unknown,
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
