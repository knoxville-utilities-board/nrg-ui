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

## Running tests

- `cd packages/ember-test-app`
- `pnpm test` – Runs the test suite on the current Ember version
- `pnpm test:watch` – Runs the test suite in "watch mode"

### Ember Try

This project uses [ember-try](https://github.com/ember-cli/ember-try) to test against multiple versions of Ember. To run the test suite against all supported versions of Ember, run `pnpm --filter 'ember-test-app' exec ember try:each --skip-cleanup`.

## Running the test application

- `cd packages/ember-test-app`
- `pnpm start`
- Visit the test application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://cli.emberjs.com/release/](https://cli.emberjs.com/release/).
