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

## Release notes

If your change affects users, add a short entry to `CHANGELOG.md`.
