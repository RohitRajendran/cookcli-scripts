import { glob } from "glob";
import * as fs from "fs";
import * as Mocha from "mocha";
import * as path from "path";

export async function run(): Promise<void> {
  // Create the mocha test
  const mocha = new Mocha({
    ui: "tdd",
    color: true,
    reporter: process.env.MOCHA_REPORTER ?? "spec",
  });

  const testsRoot = path.resolve(__dirname, "..");

  const files = await glob("**/*.test.js", { cwd: testsRoot });

  // Add files to the test suite
  const resultsPath = process.env.COOKCLI_TEST_RESULTS;
  const logResult = (line: string) => {
    console.log(`COOKCLI_TEST_RESULT ${line}`);
    if (resultsPath) {
      fs.appendFileSync(resultsPath, `${line}\n`);
    }
  };

  if (resultsPath) {
    fs.writeFileSync(resultsPath, "");
  }

  logResult(`Discovered ${files.length} test file(s):`);
  files.forEach((file) => logResult(`- ${file}`));

  files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)));

  return new Promise((c, e) => {
    try {
      // Run the mocha test
      const runner = mocha.run((failures) => {
        if (failures > 0) {
          e(new Error(`${failures} tests failed.`));
        } else {
          c();
        }
      });
      runner.on("pass", (test) => logResult(`PASS ${test.fullTitle()}`));
      runner.on("fail", (test, err) =>
        logResult(`FAIL ${test.fullTitle()}: ${err.message}`),
      );
      runner.on("end", () => logResult("Mocha run completed."));
    } catch (err) {
      console.error(err);
      e(err);
    }
  });
}
