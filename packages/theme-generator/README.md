# theme-generator

This package is used to generate a theme for the `@nrg-ui/css` package.
This is intended to be used as a helper tool to generate a theme file from a set of custom variables.

## Usage

### Setup

First, build your theme by editing the `src/custom-variables.scss` file.
This file contains a list of variables that should be used to generate a theme.
> This is not an exhaustive list of variables that can be used to customize the theme.
> Bootstrap has many more variables that can be be found in `node_modules/bootstrap/scss/_variables.scss` under the `design-system` package.

### Generation

Running pnpm build will generate a two files in the `dist` folder.

1. A `theme.css` file that contains only the variable declarations from the built bootstrap css.
1. A `theme-deduplicated.css` file that attempts to deduplicate css variables that are derived from values in `:root` by replacing values with references to other css variables.

### Installation

To theme your application, copy the contents of `theme.css` or `theme-deduplicated.css` into your application's css file.
