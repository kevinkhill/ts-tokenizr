export function isRegExp(o: unknown): o is RegExp {
  return typeof (o as RegExp).compile !== "undefined";
}

export function assertIsString(
  input: unknown
): asserts input is string {
  if (typeof input !== "string") {
    throw new Error(`Expected: "string", Actual: ${typeof input}`);
  }
}
