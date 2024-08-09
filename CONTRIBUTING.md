# How To Contribute

## Installation

- `git clone https://github.com/knoxville-utilities-board/nrg-ui.git` (or `git clone git@github.com:knoxville-utilities-board/nrg-ui.git`)
- `pnpm install`

## Linting

- `pnpm lint`
- `pnpm lint:fix`

## Building the design system

- `cd packages/design-system`
- `pnpm build`

## Building the Ember addon

- `cd packages/ember`
- `pnpm build`

## Running the Ember tests

- `cd apps/ember-test-app`
- `pnpm test` – Runs the test suite on the current Ember version
- `pnpm test:watch` – Runs the test suite in "watch mode"

## Build the design system (while watching for changes)

- `pnpm start:design-system`
- Note that the design system does not provide its own application. You can use the Ember test application to see the changes in action, or you can use the compiled CSS in your own project.

## Running the Ember test application

- `pnpm start:test-app`
- Visit the test application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://cli.emberjs.com/release/](https://cli.emberjs.com/release/).
