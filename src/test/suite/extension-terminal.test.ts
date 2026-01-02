import * as assert from "assert";

import { ExtensionTerminal } from "../../extension-terminal";

class FakeTerminal {
  public shown = false;
  public sent: string[] = [];

  show() {
    this.shown = true;
  }

  sendText(text: string) {
    this.sent.push(text);
  }
}

suite("ExtensionTerminal", () => {
  test("Sends command for .cook files", () => {
    const terminal = new FakeTerminal();
    const errors: string[] = [];
    const windowLike = {
      createTerminal: () => terminal,
      showErrorMessage: (message: string) => errors.push(message),
      activeTextEditor: {
        document: {
          uri: {
            fsPath: "/tmp/recipe.cook",
          },
        },
      },
    };

    const extensionTerminal = new ExtensionTerminal("cook", windowLike);
    extensionTerminal.sendTextForCurrentFile("cook recipe read");

    assert.strictEqual(terminal.shown, true);
    assert.deepStrictEqual(terminal.sent, [
      'cook recipe read "/tmp/recipe.cook"',
    ]);
    assert.deepStrictEqual(errors, []);
  });

  test("Shows an error when the file is not a recipe", () => {
    const terminal = new FakeTerminal();
    const errors: string[] = [];
    const windowLike = {
      createTerminal: () => terminal,
      showErrorMessage: (message: string) => errors.push(message),
      activeTextEditor: {
        document: {
          uri: {
            fsPath: "/tmp/recipe.txt",
          },
        },
      },
    };

    const extensionTerminal = new ExtensionTerminal("cook", windowLike);
    extensionTerminal.sendTextForCurrentFile("cook recipe read");

    assert.strictEqual(terminal.shown, true);
    assert.deepStrictEqual(terminal.sent, []);
    assert.deepStrictEqual(errors, ["Current file is not a recipe file"]);
  });

  test("Shows an error when there is no active editor", () => {
    const terminal = new FakeTerminal();
    const errors: string[] = [];
    const windowLike = {
      createTerminal: () => terminal,
      showErrorMessage: (message: string) => errors.push(message),
      activeTextEditor: undefined,
    };

    const extensionTerminal = new ExtensionTerminal("cook", windowLike);
    extensionTerminal.sendTextForCurrentFile("cook recipe read");

    assert.strictEqual(terminal.shown, true);
    assert.deepStrictEqual(terminal.sent, []);
    assert.deepStrictEqual(errors, ["Current file is not a recipe file"]);
  });
});
