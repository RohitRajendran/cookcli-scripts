// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { commands, ExtensionContext } from "vscode";
import { ExtensionTerminal } from "./extension-terminal";

const recipeCommands = ["read", "validate", "prettify", "image"];

/**
 * Called when the extenstion is activated
 * @param context extension context
 */
export function activate(context: ExtensionContext) {
  const terminal = new ExtensionTerminal("cook");

  recipeCommands.forEach((command) => {
    const disposable = commands.registerCommand(
      `cookcli-scripts.${command}Recipe`,
      () => terminal.sendTextForCurrentFile(`cook recipe ${command}`)
    );
    context.subscriptions.push(disposable);
  });
}
