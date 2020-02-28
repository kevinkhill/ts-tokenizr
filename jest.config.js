const pkg = require("./package.json");

module.exports = {
  ...require("../../jest.config.js"),
  displayName: pkg.name.split("@ncstat/").pop()
};
