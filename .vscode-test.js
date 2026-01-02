const { defineConfig } = require("@vscode/test-cli");

module.exports = defineConfig({
  files: "out/test/**/*.test.js",
  version: process.env.VSCODE_TEST_VERSION ?? "stable",
  mocha: {
    ui: "tdd",
    color: true,
    reporter: "spec",
  },
  launchArgs: ["--disable-extensions"],
});
