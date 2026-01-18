<!-- markdownlint-disable-file MD033 -->

# @nrg-ui/standards

This package contains the standards followed by the NRG UI project. It can be imported into any project to enforce the same standards.

## Installation

To install this library in your project, simply add it as a dev dependency:

<details>
  <summary>npm</summary>

```bash
npm add --save-dev @nrg-ui/standards
```

</details>

<details>
  <summary>yarn</summary>

```bash
yarn add --dev @nrg-ui/standards
```

</details>

<details>
  <summary>pnpm</summary>

```bash
pnpm add --save-dev @nrg-ui/standards
```

</details>

## Usage

A sample `eslint.config.mjs` file is provided below (it's actually the config used for this package!):

```mjs
import { eslint, merge } from '@nrg-ui/standards';

export default await merge(
  eslint.rules.ignore(),
  eslint.rules.base(),
  eslint.rules.js(),
  eslint.rules.ts(),
);
```

## CLI

This package includes a CLI as an addition tool. Global options are provided below.

<table>
  <thead>
    <tr>
      <th style="text-align: left">Option</th>
      <th style="text-align: left">Values</th>
      <th>Description</th>
    </tr>
  </thead>
    <tr>
      <td style="text-align: left"><code>--log-level</code></td>
      <td style="text-align: left">
        <ul>
          <li>
            <code>silent</code>
          </li>
          <li>
            <code>error</code>
          </li>
          <li>
            <code>warn</code>
          </li>
          <li>
            <code>info</code> (default)
          </li>
          <li>
            <code>debug</code>
          </li>
        </ul>
      </td>
      <td>
        Which information should be logged
      </td>
    </tr>
  </tbody>
</table>

### Migration

If you would like to automatically migrate one or more tool(s) to this library, you can use the `migrate` command:

```bash
pnpx @nrg-ui/standards migrate
```

There are several options that can be included to customize what tool(s) are migrated. Currently, only [ESLint](https://github.com/eslint/eslint) is supported by this package.

<table>
  <thead>
    <tr>
      <th style="text-align: left">Option</th>
      <th style="text-align: left">Values</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: left"><code>--include</code></td>
      <td style="text-align: left">
        <ul>
          <li>
            <code>all</code> (default)
          </li>
          <li>
            <code>eslint</code>
          </li>
        </ul>
      </td>
      <td>
        Which developer tools are migrated to this library
      </td>
    </tr>
  </tbody>
</table>

## Compatibility

Since this package uses ESLint v9, various plugins have a minimum version requirement. The following table lists the compatibility of the plugins:

| Plugin                             | Version   |
| ---------------------------------- | --------- |
| `eslint-plugin-decorator-position` | `^6.0.0`  |
| `eslint-plugin-ember`              | `^12.2.0` |
| `eslint-plugin-import`             | `^2.31.0` |
| `eslint-plugin-n`                  | `^17.0.0` |
| `eslint-plugin-qunit`              | `^8.1.2`  |
