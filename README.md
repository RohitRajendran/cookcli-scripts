# CookCLI Scripts README

CookCLI commands built into VSCode to make it easier to work with Cooklang recipe files.

To learn more about Cooklang or CookCLI: https://cooklang.org/

<img width="838" alt="example" src="https://user-images.githubusercontent.com/3478163/178862219-24495158-b304-4fa8-ad5b-01003ced7fad.png">

## Features

Commands can be found in the command palette and under the tile of `cookcli:` and will be run against the recipe file that you currently have open.

1. Open up the recipie file that you want to run the command for.
1. Open Command Palette with `cmd + shift + P` or `ctrl + shift + P`
1. Search for `cookcli:` to see all the commands available.
1. Select a command. A terminal window will open up where you can see the results of the command.

### Read Recipe

Parses and prints the recipe file

https://user-images.githubusercontent.com/3478163/178563110-6413481f-0ca3-4be1-b154-929617d345ab.mov

### Validate Recipe

Checks for syntax errors in the recipe file

### Prettify Recipe

Edits the recipe file for style consistency

### Get Image for Recipe

Downloads a random image from unsplash.com to match the recipe title

## Requirements

Requires [CookCLI](https://cooklang.org/cli/download/) to be installed.
