# How To Contribute

## Installation

- `git clone https://github.com/knoxville-utilities-board/nrg-ui.git` (or `git clone git@github.com:knoxville-utilities-board/nrg-ui.git`)
- `cd packages/ember`
- `pnpm install`

## Linting

- `pnpm lint`
- `pnpm lint:fix`

## Building the addon

- `cd packages/ember`
- `pnpm build`

### Scaffolding

Since the file structure is different in an Embroider addon, the [`gember`](https://github.com/bertdeblock/gember) tool can be used to generate files. To scaffold a new component, run `pnpm gember:component <component-name>`. The following commands are available for each module that can be generated:

```sh
pnpm gember // Base command, in case other options are needed
pnpm gember:component component-name
pnpm gember:helper helper-name
pnpm gember:modifier modifier-name
pnpm gember:service service-name
```

By default, all modules will be generated as TypeScript files with a backing class (when applicable). For full usage instructions, see the [gember README](https://github.com/bertdeblock/gember?tab=readme-ov-file#usage).

## Running tests

- `cd apps/docs-app`
- `pnpm test` – Runs the test suite on the current Ember version
- `pnpm test:watch` – Runs the test suite in "watch mode"

### Ember Try

This project uses [ember-try](https://github.com/ember-cli/ember-try) to test against multiple versions of Ember. To run the test suite against all supported versions of Ember, run `pnpm --filter 'docs-app' exec ember try:each --skip-cleanup`.

## Running the test application

- `cd apps/docs-app`
- `pnpm start`
- Visit the test application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://cli.emberjs.com/release/](https://cli.emberjs.com/release/).
