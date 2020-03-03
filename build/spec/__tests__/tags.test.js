"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testHelpers_1 = require("./testHelpers");
const tokenizr = testHelpers_1.getTokenizr();
describe("tags and tagging", () => {
    test("should have the expected functionality", () => {
        expect(tokenizr.tagged("test")).toBeFalsy();
        tokenizr.tag("test");
        expect(tokenizr.tagged("test")).toBeTruthy();
        tokenizr.untag("test");
        expect(tokenizr.tagged("test")).toBeFalsy();
    });
});
