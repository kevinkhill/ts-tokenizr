"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertIsString = exports.isRegExp = void 0;
function isRegExp(o) {
    return typeof o.compile !== "undefined";
}
exports.isRegExp = isRegExp;
function assertIsString(input) {
    if (typeof input !== "string") {
        throw new Error(`Expected: "string", Actual: ${typeof input}`);
    }
}
exports.assertIsString = assertIsString;
