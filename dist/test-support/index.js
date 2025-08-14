
import { getContext, settled } from '@ember/test-helpers';

async function setBreakpoint(breakpoint) {
  const breakpointArray = Array.isArray(breakpoint) ? breakpoint : [breakpoint];
  const {
    owner
  } = getContext();
  const media = owner.lookup('service:media');
  for (let i = 0; i < breakpointArray.length; i++) {
    const breakpointName = breakpointArray[i];
    if (breakpointName === 'auto') {
      media.mocked = false;
      return;
    }
    if (Object.keys(media.breakpoints).indexOf(breakpointName) === -1) {
      throw new Error(`Breakpoint "${breakpointName}" not defined as a breakpoint`);
    }
  }
  media.matches = breakpointArray;
  media.trigger('mediaChanged');
  await settled();
}

export { setBreakpoint };
//# sourceMappingURL=index.js.map
