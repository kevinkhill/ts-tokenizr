"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
function isRegExp(o) {
    return typeof o.compile !== "undefined";
}
exports.isRegExp = isRegExp;
