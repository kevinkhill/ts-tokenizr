export function isRegExp(o) {
    return typeof o.compile !== "undefined";
}
export function assertIsString(input) {
    if (typeof input !== "string") {
        throw new Error(`Expected: "string", Actual: ${typeof input}`);
    }
}
