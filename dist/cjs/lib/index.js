"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toString = exports.StateStack = exports.ParsingError = exports.MatchResult = exports.excerpt = exports.arrayEquals = void 0;
const MatchResult_1 = require("./MatchResult");
Object.defineProperty(exports, "MatchResult", { enumerable: true, get: function () { return MatchResult_1.MatchResult; } });
__exportStar(require("./guards"), exports);
var arrayEquals_1 = require("./arrayEquals");
Object.defineProperty(exports, "arrayEquals", { enumerable: true, get: function () { return arrayEquals_1.arrayEquals; } });
var excerpt_1 = require("./excerpt");
Object.defineProperty(exports, "excerpt", { enumerable: true, get: function () { return excerpt_1.excerpt; } });
var ParsingError_1 = require("./ParsingError");
Object.defineProperty(exports, "ParsingError", { enumerable: true, get: function () { return ParsingError_1.ParsingError; } });
var StateStack_1 = require("./StateStack");
Object.defineProperty(exports, "StateStack", { enumerable: true, get: function () { return StateStack_1.StateStack; } });
function toString(obj) {
    return Object.prototype.toString.call(obj);
}
exports.toString = toString;
