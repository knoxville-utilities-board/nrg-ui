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

- `cd packages/ember-core`
- `pnpm build`

## Running the Ember tests

- `cd docs`
- `pnpm test` – Runs the test suite on the current Ember version
- `pnpm test:watch` – Runs the test suite in "watch mode"

## Running the Ember addon locally (while watching for changes)

- `pnpm start:addon`

## Running the design system locally (while watching for changes)

- `pnpm start:design-system`
- Note that the design system does not provide its own application. You can use the Ember docs application to see the changes in action, or you can use the compiled CSS in your own project.

## Running the Ember docs application

- `pnpm start:docs`
- Visit the docs application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://cli.emberjs.com/release/](https://cli.emberjs.com/release/).

## Development Workflow

- Once you have run `pnpm install`, you can run `pnpm start` to start all three packages in watch mode. Any changes you make to `@nrg-ui/core` or `@nrg-ui/design-system` will be reflected in the Ember docs application.
