import Helper from '@ember/component/helper';
import { assert } from '@ember/debug';
import { getOwner } from '@ember/owner';
import { macroCondition, dependencySatisfies } from '@embroider/macros';

class LookupService extends Helper {
  compute([name], {
    singleton
  }) {
    if (macroCondition(dependencySatisfies('ember-source', '^6.3.0'))) {
      assert('Use of the `lookup-service` helper is not allowed with `ember-source` 6.3.0 or above.' + 'Instead, use the template tag syntax (.gjs or.gts file) to build a route component.');
    }
    if (macroCondition(dependencySatisfies('ember-route-templates', '*'))) {
      assert('Use of the `lookup-service` helper is not allowed with `ember-route-templates`.' + 'Instead, use the template tag syntax (.gjs or.gts file) and the `Route` function ' + 'from `ember-route-templates` to build a route component.');
    }
    assert('Service name must be provided', name);
    const owner = getOwner(this);
    return owner.lookup(`service:${name}`, {
      singleton
    });
  }
}

export { LookupService as default };
//# sourceMappingURL=lookup-service.js.map
