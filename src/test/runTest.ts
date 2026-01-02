import * as fs from "fs";
import * as path from "path";
import { spawn } from "child_process";

import {
  downloadAndUnzipVSCode,
  resolveCliArgsFromVSCodeExecutablePath,
} from "@vscode/test-electron";

async function main() {
  try {
    // The folder containing the Extension Manifest package.json
    // Passed to `--extensionDevelopmentPath`
    const extensionDevelopmentPath = path.resolve(__dirname, "../../");

    // The path to test runner
    // Passed to --extensionTestsPath
    const extensionTestsPath = path.resolve(__dirname, "./suite/index.js");

    // Download VS Code, unzip it and run the integration test
    const resultsPath = path.resolve(
      extensionDevelopmentPath,
      ".vscode-test",
      "test-results.txt",
    );
    fs.mkdirSync(path.dirname(resultsPath), { recursive: true });
    const cliPath =
      findCodeCliPath() ??
      resolveCliArgsFromVSCodeExecutablePath(
        await downloadAndUnzipVSCode({}),
      )[0];
    const userDataDir = path.join(
      extensionDevelopmentPath,
      ".vscode-test",
      "user-data",
    );
    const extensionsDir = path.join(
      extensionDevelopmentPath,
      ".vscode-test",
      "extensions",
    );
    fs.mkdirSync(userDataDir, { recursive: true });
    fs.mkdirSync(extensionsDir, { recursive: true });
    const args: string[] = [
      "--user-data-dir",
      userDataDir,
      "--extensions-dir",
      extensionsDir,
      "--preserve-env",
      "--wait",
      "--extensionTestsPath",
      extensionTestsPath,
      "--extensionDevelopmentPath",
      extensionDevelopmentPath,
    ];

    const timeoutMs = Number(process.env.COOKCLI_TEST_TIMEOUT_MS ?? 300000);

    await new Promise<void>((resolve, reject) => {
      const env = {
        ...process.env,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        COOKCLI_TEST_RESULTS: resultsPath,
      };
      const child = spawn(cliPath, args, {
        env,
        shell: process.platform === "win32",
        stdio: "inherit",
      });

      const timer = setTimeout(() => {
        child.kill();
        reject(new Error(`Test run timed out after ${timeoutMs}ms`));
      }, timeoutMs);

      child.on("exit", (code) => {
        clearTimeout(timer);
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Test run failed with code ${code}`));
        }
      });
      child.on("error", (err) => {
        clearTimeout(timer);
        reject(err);
      });
    });

    const foundResults = printTestResultsFromLogs(userDataDir);

    if (fs.existsSync(resultsPath)) {
      const results = fs.readFileSync(resultsPath, "utf8").trim();
      if (results.length > 0) {
        console.log("\nTest results:\n" + results);
        return;
      }
    }

    if (!foundResults) {
      console.log(
        "\nTest results not found. If VS Code did not launch, set VSCODE_CLI_PATH to your local 'code' binary.",
      );
    }
  } catch (err) {
    console.error("Failed to run tests");
    console.error(err);
    process.exit(1);
  }
}

function printTestResultsFromLogs(userDataDir: string): boolean {
  const logsRoot = path.join(userDataDir, "logs");
  if (!fs.existsSync(logsRoot)) {
    return false;
  }

  const entries = fs
    .readdirSync(logsRoot)
    .map((name) => ({
      name,
      stats: fs.statSync(path.join(logsRoot, name)),
    }))
    .filter((entry) => entry.stats.isDirectory())
    .sort((a, b) => b.stats.mtimeMs - a.stats.mtimeMs);

  const latest = entries[0];
  if (!latest) {
    return false;
  }

  const logDir = path.join(logsRoot, latest.name);
  const windowDirs = fs
    .readdirSync(logDir)
    .filter((name) => name.startsWith("window"))
    .map((name) => path.join(logDir, name, "exthost"));

  const candidateLogs = ["exthost.log", "extensionHost.log"];
  for (const windowDir of windowDirs) {
    for (const logName of candidateLogs) {
      const logPath = path.join(windowDir, logName);
      if (!fs.existsSync(logPath)) {
        continue;
      }

      const content = fs.readFileSync(logPath, "utf8");
      const lines = content
        .split("\n")
        .filter((line) => line.includes("COOKCLI_TEST_RESULT "));
      if (lines.length > 0) {
        console.log("\nTest results:");
        lines.forEach((line) => {
          const trimmed = line.slice(line.indexOf("COOKCLI_TEST_RESULT ") + 22);
          console.log(trimmed);
        });
        return true;
      }
    }
  }

  return false;
}

function findCodeCliPath(): string | undefined {
  const envPath = process.env.VSCODE_CLI_PATH ?? process.env.CODE_CLI_PATH;
  if (envPath && fs.existsSync(envPath)) {
    return envPath;
  }

  const pathEntries = (process.env.PATH ?? "")
    .split(path.delimiter)
    .filter((entry) => entry.length > 0);
  for (const entry of pathEntries) {
    const candidate = path.join(entry, "code");
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return undefined;
}

main();
