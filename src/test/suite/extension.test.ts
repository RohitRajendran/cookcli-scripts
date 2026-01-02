import * as vscode from "vscode";

suite("Extension Test Suite", () => {
  test("Registers all commands on activation", async () => {
    const extension = vscode.extensions.getExtension(
      "RohitRajendran.cookcli-scripts",
    );
    if (!extension) {
      throw new Error("Extension not found");
    }

    await extension.activate();

    const commands = await vscode.commands.getCommands(true);
    const expected = [
      "cookcli-scripts.readRecipe",
      "cookcli-scripts.validateRecipe",
      "cookcli-scripts.prettifyRecipe",
      "cookcli-scripts.imageRecipe",
    ];

    for (const command of expected) {
      if (!commands.includes(command)) {
        throw new Error(`Missing command: ${command}`);
      }
    }
  });
});
