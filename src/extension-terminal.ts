import { Terminal, window } from "vscode";

export class ExtensionTerminal {
  terminal: Terminal;

  constructor(terminalName: string) {
    this.terminal = window.createTerminal(terminalName);
  }

  /**
   * Sends a command in the terminal using the current file as a parameter
   * @param commandPrefix command that should be called
   */
  sendTextForCurrentFile(commandPrefix: string) {
    this.terminal.show();

    const filePath = window.activeTextEditor?.document.uri.fsPath;
    const hasCookExtension =
      window.activeTextEditor?.document.uri.fsPath.endsWith(".cook");
    if (filePath !== undefined && hasCookExtension) {
      this.terminal.sendText(`${commandPrefix} "${filePath}"`);
    } else {
      window.showErrorMessage("Current file is not a recipie file");
    }
  }
}
