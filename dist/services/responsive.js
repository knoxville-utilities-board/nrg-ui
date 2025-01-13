import Service, { inject } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import isMobile from 'ismobilejs';
import { g, i } from 'decorator-transforms/runtime';

class Responsive extends Service {
  static {
    g(this.prototype, "media", [inject]);
  }
  #media = (i(this, "media"), undefined);
  static {
    g(this.prototype, "isMobile", [tracked]);
  }
  #isMobile = (i(this, "isMobile"), undefined);
  constructor(owner) {
    super(owner);
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
    return this.isMobile?.tablet;
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
