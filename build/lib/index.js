"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var arrayEquals_1 = require("./arrayEquals");
exports.arrayEquals = arrayEquals_1.arrayEquals;
var excerpt_1 = require("./excerpt");
exports.excerpt = excerpt_1.excerpt;
__export(require("./guards"));
var last_1 = require("./last");
exports.last = last_1.last;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toString(obj) {
    if (typeof obj.toString !== "undefined") {
        throw Error(`${typeof obj} does not have a "toString()" method.`);
    }
    return obj.toString();
}
exports.toString = toString;
