import { createServer } from 'miragejs';

import type { AnyFactories, AnyModels } from 'miragejs/-types';

export async function startServer<
  Models extends AnyModels,
  Factories extends AnyFactories,
  ConfigType extends Parameters<typeof createServer<Models, Factories>>[0],
>(
  config: ConfigType,
): Promise<ReturnType<typeof createServer<Models, Factories>>> {
  console.time('Mirage startup');

  const server = createServer<Models, Factories>(config);

  await server.start();

  console.timeEnd('Mirage startup');

  return server;
}

export default { startServer };
