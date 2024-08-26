import '@glint/environment-ember-loose';

import type { HelperLike } from '@glint/template';
import type NrgRegistry from '@nrg-ui/ember/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends NrgRegistry {
    'page-title': HelperLike<{
      Args: { Positional: [title: string] };
      Return: void;
    }>;
  }
}
