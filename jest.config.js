// eslint-disable-next-line import/no-commonjs
module.exports = {
  rootDir: ".",
  coverageDirectory: "<rootDir>/coverage/",
  collectCoverageFrom: ["<rootDir>/packages/*/src/**/*.ts"],
  modulePathIgnorePatterns: ["examples/.*", "packages/.*/build"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/demo/",
    "__helpers__/",
    "__tests__/utils.ts$"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  }
};
