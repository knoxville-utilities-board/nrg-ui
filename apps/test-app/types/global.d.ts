import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';

import NrgServiceRegistry from '@nrg-ui/core/service-registry';
import NrgTemplateRegistry from '@nrg-ui/core/template-registry';
import PageTitleRegistry from 'ember-page-title/template-registry';

// Adding Dayjs plugins for TypeScript
import 'dayjs';
import 'dayjs/plugin/customParseFormat';
import 'dayjs/plugin/duration';
import 'dayjs/plugin/isBetween';
import 'dayjs/plugin/isSameOrAfter';
import 'dayjs/plugin/isSameOrBefore';
import 'dayjs/plugin/localizedFormat';
import 'dayjs/plugin/objectSupport';
import 'dayjs/plugin/relativeTime';
import 'dayjs/plugin/timezone';
import 'dayjs/plugin/utc';
import 'dayjs/plugin/weekday';



declare module '@glint/environment-ember-loose/registry' {

  export default interface Registry extends NrgTemplateRegistry, PageTitleRegistry {
    // Add any registry entries from other addons here that your addon itself uses (in non-strict mode templates)
    // See https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons
  }
}

declare module '@ember/service' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Registry extends NrgServiceRegistry {}
}
