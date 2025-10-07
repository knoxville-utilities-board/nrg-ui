import '@glint/ember-tsc/types';
import 'ember-source/types';

import { HelperLike } from '@glint/template';
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

type GetCodeSnippet = HelperLike<{
  Args: {
    Positional: [string];
  };
  Return: {
    source: string;
    language: string;
  };
}>;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends NrgTemplateRegistry,
      PageTitleRegistry {
    'get-code-snippet': GetCodeSnippet;
  }
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '@ember/service' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Registry extends NrgServiceRegistry {}
}
