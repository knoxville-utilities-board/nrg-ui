<!-- markdownlint-disable-file MD033 -->

# @nrg-ui/css

This design system is built on top of [Bootstrap](https://getbootstrap.com/). Note that this is not a full-fledged design system, but rather a collection of raw CSS that can be used in any web application. The [Ember addon](../ember-core/) provides a more integrated experience for Ember applications.

## Installation

<details>
  <summary>npm</summary>
  
```sh
npm install @nrg-ui/css
```

</details>

<details>
  <summary>yarn</summary>
  
```sh
yarn add @nrg-ui/css
```

</details>

<details>
  <summary>pnpm</summary>
  
```sh
pnpm add @nrg-ui/css
```

</details>

## Usage

To use the CSS in a non-Ember application, include the CSS in your project. The CSS is available in the `dist` directory of the package. You can include the CSS in your project using a `<link>` tag in your HTML file.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My App</title>
    <link rel="stylesheet" href="node_modules/@nrg-ui/css/dist/main.css" />
  </head>

  <body>
    <h1>Hello, world!</h1>
  </body>
</html>
```

## Contributing

See the [Contributing](../../CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](../../LICENSE).
