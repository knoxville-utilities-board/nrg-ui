import { getContext, settled } from '@ember/test-helpers';

import type Media from '../services/media.ts';
import type Owner from '@ember/owner';

export async function setBreakpoint(breakpoint: string) {
  const breakpointArray = Array.isArray(breakpoint) ? breakpoint : [breakpoint];
  const { owner } = getContext() as { owner: Owner };
  const media = owner.lookup('service:media') as Media;

  for (let i = 0; i < breakpointArray.length; i++) {
    const breakpointName = breakpointArray[i];
    if (breakpointName === 'auto') {
      media.mocked = false;
      return;
    }

    if (Object.keys(media.breakpoints).indexOf(breakpointName) === -1) {
      throw new Error(
        `Breakpoint "${breakpointName}" not defined as a breakpoint`,
      );
    }
  }

  media.matches = breakpointArray;
  media.trigger('mediaChanged');

  await settled();
}
