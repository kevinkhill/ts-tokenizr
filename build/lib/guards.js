"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
/* eslint-disable @typescript-eslint/no-explicit-any */
function isRegExp(o) {
    return typeof o.compile !== "undefined";
}
exports.isRegExp = isRegExp;
function assertIsString(input, error) {
    if (typeof input !== "string") {
        throw new assert_1.AssertionError({
            expected: "string",
            actual: typeof input,
            message: error || "The given input must be a string."
        });
    }
}
exports.assertIsString = assertIsString;
