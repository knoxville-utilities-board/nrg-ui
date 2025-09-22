import { settled } from '@ember/test-helpers';
import { createServer } from 'miragejs';

import type { TestContext } from '@ember/test-helpers';
import type { Registry, Server } from 'miragejs';
import type { AnyFactories, AnyModels } from 'miragejs/-types';

export interface MirageTestContext<
  Models extends AnyModels,
  Factories extends AnyFactories,
> extends TestContext {
  server?: Server<Registry<Models, Factories>>;
}

export async function startServer<
  Models extends AnyModels,
  Factories extends AnyFactories,
  ConfigType extends Parameters<typeof createServer<Models, Factories>>[0],
>(config: ConfigType) {
  const server = createServer({
    environment: 'test',
    ...config,
  });

  config?.seeds?.(server);

  await server.start();

  // This only works after the server was created.
  if (
    typeof location !== 'undefined' &&
    location.search.indexOf('mirageLogging') !== -1
  ) {
    server.logging = true;
  }

  return server;
}

export async function stopServer(server: Server) {
  await settled();

  if (server) {
    server.shutdown();
  }
}

export function setupMirage<
  Models extends AnyModels,
  Factories extends AnyFactories,
  ConfigType extends Parameters<typeof createServer<Models, Factories>>[0],
>(hooks: NestedHooks, config: ConfigType) {
  hooks.beforeEach(async function <
    TC extends MirageTestContext<Models, Factories>,
  >(this: TC) {
    if (!this.owner) {
      throw new Error(
        'You must call one of the ember-qunit setupTest(),' +
          ' setupRenderingTest() or setupApplicationTest() methods before' +
          ' calling setupMirage()',
      );
    }

    this.server = await startServer<Models, Factories, ConfigType>(config);
  });

  hooks.afterEach(async function <
    TC extends MirageTestContext<Models, Factories>,
  >(this: TC) {
    if (this.server) {
      await stopServer(this.server as unknown as Server);
    }
  });
}
