/* eslint-disable import/no-commonjs */
const baseConfig = require("../../jest.config.js");

module.exports = {
  ...baseConfig,
  displayName: "ts-tokenizr",
  testPathIgnorePatterns: ["testHelpers.ts"]
};
