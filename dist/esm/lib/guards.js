import { AssertionError } from "assert";
export function isRegExp(o) {
    return typeof o.compile !== "undefined";
}
export function assertIsString(input, error) {
    if (typeof input !== "string") {
        throw new AssertionError({
            expected: "string",
            actual: typeof input,
            message: error || "The given input must be a string."
        });
    }
}
