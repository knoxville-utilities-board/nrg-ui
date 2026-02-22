# theme-generator

This package is used to generate a theme for the `@nrg-ui/css` package.

## Usage

### Setup

A `.nrg` folder is required in the root of your repository.
This folder can contain any number of `.scss` files that will be used to generate themes.
These sass files should contain variable declarations that will be used to override the default bootstrap variables.
Each sass file will be compiled into a css file with the same name and stored in `app/styles`.

### Generation

Run `npx @nrg-ui/theme-generator` to generate the theme(s).
