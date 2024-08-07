import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';

import type NRGRegistry from '@nrg-ui/ember/template-registry';
import type PageTitle from 'ember-page-title/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends PageTitle, NRGRegistry {
    // local entries
  }
}
