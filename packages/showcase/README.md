# @kub/mirage

This Ember.js addon allows applications to use [Mirage](https://miragejs.com/) for mocking API requests during development and testing. It provides a simple way to set up a Mirage server, define routes, and handle requests without needing a real backend.

## Compatibility

- Ember.js v5.12 or above
- Embroider or ember-auto-import v2

## Installation

See the [Installation](../../README.md#installation) section of the main README for details.

Upon installation, the addon will automatically install the following dependencies (nested dependencies are installed by its parent):

### Third-party

- [`miragejs`][miragejs] - The Mirage library itself, which provides the core functionality for mocking API requests
- [`msw`][msw] - Mock Service Worker intercepts network requests and provides a way to mock API responses
- [`mirage-msw`][mirage-msw] - Mirage integration with Mock Service Worker (MSW) for intercepting network requests in the browser

Also, the addon will automatically detect models and serializers in the consuming application and generate the corresponding Mirage models and serializers.

## Usage

### Factories

Mirage factories are not automatically discovered as they have been in the past. Instead, generate a Mirage factory via the `mirage-factory` blueprint:

```sh
ember generate mirage-factory factory-name
```

This will create a Mirage factory in the `mirage/factories` directory. The generated factory is based off the EmberData model of the same name. The factory will include all attributes that are defined in the EmberData model to be implemented by the user.

### Fixtures

Mirage fixtures are not automatically discovered as they have been in the past. Instead, generate a Mirage fixture via the `mirage-fixture` blueprint:

```sh
ember generate mirage-fixture fixture-name
```

This will create a Mirage fixture in the `mirage/fixtures` directory. A fixture can be used to pre-populate the Mirage database with data. It can provide any type of data, including arrays and objects. Fixtures do not have endpoints serving their data; rather, they are used to pre-populate the Mirage database with data that can be accessed via the Mirage server. Custom endpoints can access fixtures by using the `server.db` API in the Mirage route handler.

### Models

EmberData models are not automatically discovered as they have been in the past. Instead, generate a Mirage model via the `mirage-model` blueprint:

```sh
ember generate mirage-model model-name
```

This will create a Mirage model in the `mirage/models` directory. The generated model will be a simple wrapper around the EmberData model and should include any relationships already defined in the EmberData model. Note that attributes are not necessary to define in the Mirage model.

### Scenarios

Mirage scenarios are not automatically discovered as they have been in the past. Instead, generate a Mirage scenario via the `mirage-scenario` blueprint:

```sh
ember generate mirage-scenario scenario-name
```

This will create a Mirage scenario in the `mirage/scenarios` directory. A scenario is a set of data and instructions (routes, loading fixtures, etc.) that can be used to set up the Mirage server in a specific state. Scenarios are useful for testing different application states or simulating different user interactions. A `default` scenario is automatically created for you, which is used to set up the Mirage server when it is started - this is what is used if no scenario is specified. You can create additional scenarios as needed.

### Serializers

EmberData serializers are not automatically discovered as they have been in the past. Instead, generate a Mirage serializer via the `mirage-serializer` blueprint:

```sh
ember generate mirage-serializer serializer-name
```

This will create a Mirage serializer in the `mirage/serializers` directory.

### TypeScript

This addon is written in TypeScript. If a consuming application is also using TypeScript, type hints will be provided.

## License

This project is licensed under the [MIT License](../../LICENSE.md).

<!-- Link references -->

[miragejs]: https://miragejs.com/
[msw]: https://mswjs.io/
[mirage-msw]: https://github.com/miragejs/mirage-msw/
