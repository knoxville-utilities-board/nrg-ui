import { getContext, settled } from '@ember/test-helpers';

async function setBreakpoint(breakpoint) {
  const {
    owner
  } = getContext();
  const media = owner.lookup('service:media');
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

export { setBreakpoint };
//# sourceMappingURL=index.js.map
