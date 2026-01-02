import { window } from "vscode";

export interface TerminalLike {
  show(): void;
  sendText(text: string): void;
}

export interface WindowLike {
  createTerminal(name: string): TerminalLike;
  showErrorMessage(message: string): void;
  activeTextEditor?: {
    document: {
      uri: {
        fsPath: string;
      };
    };
  };
}

export class ExtensionTerminal {
  private terminal: TerminalLike;
  private vscodeWindow: WindowLike;

  constructor(terminalName: string, vscodeWindow: WindowLike = window) {
    this.vscodeWindow = vscodeWindow;
    this.terminal = vscodeWindow.createTerminal(terminalName);
  }

  /**
   * Sends a command in the terminal using the current file as a parameter
   * @param commandPrefix command that should be called
   */
  sendTextForCurrentFile(commandPrefix: string) {
    this.terminal.show();

    const filePath = this.vscodeWindow.activeTextEditor?.document.uri.fsPath;
    const hasCookExtension = filePath?.endsWith(".cook");
    if (filePath && hasCookExtension) {
      this.terminal.sendText(`${commandPrefix} "${filePath}"`);
    } else {
      this.vscodeWindow.showErrorMessage("Current file is not a recipe file");
    }
  }
}
