# Contributing

Thanks for contributing to CookCLI Scripts. This project is a VS Code extension that shells out to CookCLI.

## Prerequisites

- Node.js version from `.nvmrc`
- npm
- CookCLI installed for local testing (see README)

## Getting started

1. Install dependencies:
   ```sh
   npm i
   ```
2. Build the extension:
   ```sh
   npm run build
   ```
3. Watch for changes during development:
   ```sh
   npm run watch
   ```

## npm scripts reference

- `npm run vscode:prepublish`: Builds the production bundle with minification for publishing.
- `npm run build-base`: Bundles the extension entrypoint with esbuild (no source maps).
- `npm run build`: Bundles with source maps for local debugging.
- `npm run watch`: Rebuilds on file changes with source maps.
- `npm run compile-tests`: Compiles test TypeScript into `out/`.
- `npm run watch-tests`: Watches and recompiles tests into `out/`.
- `npm run pretest`: Runs compile, build, and lint before tests.
- `npm run lint`: Lints TypeScript source files.
- `npm run lint:fix`: Lints and auto-fixes where possible.
- `npm run format`: Formats code and config files with Prettier.
- `npm run spellcheck`: Runs cspell over docs and source.
- `npm run test`: Runs VS Code extension tests.
- `npm run deploy`: Publishes the extension via `vsce publish`.

## Running in VS Code

1. Open this repo in VS Code.
2. Press `F5` to launch the Extension Development Host.
3. Open a Cooklang recipe file and run commands from the Command Palette.

## Tests

```sh
npm test
```

## Linting and formatting

```sh
npm run lint
npm run format
npm run spellcheck
```

## Submitting changes

1. Create a feature branch.
2. Keep changes focused and include tests when applicable.
3. Run the checks above before opening a PR.
4. Open a PR with a clear description and screenshots or recordings if you changed user-facing behavior.
