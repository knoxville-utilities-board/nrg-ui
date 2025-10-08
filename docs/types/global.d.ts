import '@glint/ember-tsc/types';
import 'ember-source/types';

import NrgServiceRegistry from '@nrg-ui/core/service-registry';

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

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '@ember/service' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Registry extends NrgServiceRegistry {}
}
