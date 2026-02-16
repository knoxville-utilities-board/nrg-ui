# @nrg-ui/version

A small Node package to synchronously fetch the current version of an application or library.

## Compatibility

- Node.js v14 or above

## Installation

```bash
npm install @nrg-ui/version
```

## Usage

Since this module is compiled as CommonJS, it can be used in both ESM and CommonJS environments.

```js
// CommonJS
const { getVersion } = require('@nrg-ui/version');

const version = getVersion();
console.log(version);
```

```js
// ESM
import { getVersion } from '@nrg-ui/version';

const version = getVersion();
console.log(version);
```

### Output

By default, the output of `getVersion()` is defined by this sequence:

1. The current git tag
   1. If a tag is found in the history with additional commits, it will append the shortest commit hash to the tag
2. The current git branch name
3. The current git commit hash

If a particular output is desired, the following functions are available:

```ts
declare module '@nrg-ui/version' {
  export function getVersion(): string;

  export function getTag(options?: TagOptions): TagInfo | null;
  export function getBranch(): string | null;
  export function getCommitHash(): string | null;
}
```

The arguments to those functions can be found at the top of the [source file](./src/index.ts).
