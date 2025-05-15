import Service, { inject } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import isMobile from 'ismobilejs';
import { g, i } from 'decorator-transforms/runtime';

class Responsive extends Service {
  static {
    g(this.prototype, "media", [inject]);
  }
  #media = (i(this, "media"), void 0);
  static {
    g(this.prototype, "isMobile", [tracked]);
  }
  #isMobile = (i(this, "isMobile"), void 0);
  constructor(owner) {
    super(owner);
    this.isMobile = isMobile();
  }
  get isMobileDevice() {
    return this.isMobile.any;
  }
  get isMobileScreen() {
    return this.media?.isMobile;
  }
  get isTabletScreen() {
    return this.media?.isTablet;
  }
  get isComputerScreen() {
    return this.media?.isDesktop;
  }
  get isLargeMonitor() {
    return this.media?.isJumbo;
  }
  get isMobileScreenGroup() {
    return this.isMobileScreen || this.isTabletScreen;
  }
  get isComputerScreenGroup() {
    return this.isComputerScreen || this.isLargeMonitor;
  }
}

export { Responsive as default };
//# sourceMappingURL=responsive.js.map
