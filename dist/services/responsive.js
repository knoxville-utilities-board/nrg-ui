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
  constructor() {
    super();
    this.isMobile = isMobile();
  }
  get isMobileDevice() {
    return this.isMobile.any;
  }
  get isSmallMobileScreen() {
    return this.media?.isSmallMobile;
  }
  get isMobileScreen() {
    return this.media?.isMobile;
  }
  get isTabletScreen() {
    return this.media?.isTablet;
  }
  get isComputerScreen() {
    return this.media?.isComputer;
  }
  get isLargeMonitor() {
    return this.media?.isLargeMonitor;
  }
  get isWidescreenMonitor() {
    return this.media?.isWidescreenMonitor;
  }
  get isMobileScreenGroup() {
    return this.isSmallMobileScreen || this.isMobileScreen || this.isTabletScreen;
  }
  get isComputerScreenGroup() {
    return this.isComputerScreen || this.isLargeMonitor || this.isWidescreenMonitor;
  }
}

export { Responsive as default };
//# sourceMappingURL=responsive.js.map
