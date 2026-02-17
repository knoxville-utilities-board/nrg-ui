import { getContext, settled } from '@ember/test-helpers';

import type MediaService from '../services/media.ts';
import type Owner from '@ember/owner';

export async function setBreakpoint(breakpoint: string) {
  const { owner } = getContext() as { owner: Owner };
  const media = owner.lookup('service:media') as MediaService;

  if (breakpoint === 'auto') {
    media.mocked = false;
    return;
  }

  if (Object.keys(media.breakpoints).indexOf(breakpoint) === -1) {
    throw new Error(`Breakpoint "${breakpoint}" not defined as a breakpoint`);
  }

  media._mockedBreakpoint = breakpoint;
  media.trigger('mediaChanged');

  await settled();
}
