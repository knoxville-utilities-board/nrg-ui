import Helper from '@ember/component/helper';
import { assert } from '@ember/debug';
import { getOwner } from '@ember/owner';
import { dependencySatisfies, macroCondition } from '@embroider/macros';

import type { DIRegistry } from '@ember/owner';

export interface LookupServiceSignature<Name extends keyof DIRegistry['service'] & string> {
  Args: {
    Positional: [Name];
    Named: {
      singleton?: boolean;
    };
  };
  Return: DIRegistry['service'][Name];
}

export default class LookupService<
  Name extends keyof DIRegistry['service'] & string,
> extends Helper<LookupServiceSignature<Name>> {
  compute([name]: [Name], { singleton }: { singleton?: boolean }): DIRegistry['service'][Name] {
    if (macroCondition(dependencySatisfies('ember-source', '^6.3.0'))) {
      assert(
        'Use of the `lookup-service` helper is not allowed with `ember-source` 6.3.0 or above.' +
          'Instead, use the template tag syntax (.gjs or.gts file) to build a route component.',
      );
    }
    if (macroCondition(dependencySatisfies('ember-route-templates', '*'))) {
      assert(
        'Use of the `lookup-service` helper is not allowed with `ember-route-templates`.' +
          'Instead, use the template tag syntax (.gjs or.gts file) and the `Route` function ' +
          'from `ember-route-templates` to build a route component.',
      );
    }

    assert('Service name must be provided', name);

    const owner = getOwner(this);

    return owner!.lookup(`service:${name}`, {
      singleton,
    });
  }
}
