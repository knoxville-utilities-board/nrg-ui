import { macroCondition, getConfig } from '@embroider/macros';
import ApplicationRoute from '@kub/common/routes/application';

export default class extends ApplicationRoute {
  async beforeModel() {
    if (macroCondition(getConfig('@kub/common').isUsingMirage)) {
      const { setupMirage } = await import('@kub/common/routes/application');
      const options = {
        // Models, fixtures, etc. are automatically loaded from mirage/config.js
        // Place any custom options here
      };
      const { default: config } = await import('../mirage/config.js');

      await setupMirage(config(options));
    }

    await super.beforeModel(...arguments);
  }
}
