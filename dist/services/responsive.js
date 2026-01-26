import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import isMobile from 'ismobilejs';
import { g, i } from 'decorator-transforms/runtime';

class Responsive extends Service {
  static {
    g(this.prototype, "media", [service]);
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
  get isXSmallScreen() {
    return this.media.isXSmall;
  }
  get isSmallScreen() {
    return this.media.isSmall;
  }
  get isMediumScreen() {
    return this.media.isMedium;
  }
  get isLargeScreen() {
    return this.media.isLarge;
  }
  get isXLargeScreen() {
    return this.media.isXLarge;
  }
  get isXXLargeScreen() {
    return this.media.isXXLarge;
  }
  get isMobileScreenGroup() {
    return this.isXSmallScreen || this.isSmallScreen;
  }
  get isComputerScreenGroup() {
    return this.isLargeScreen || this.isXLargeScreen || this.isXXLargeScreen;
  }
}

export { Responsive as default };
//# sourceMappingURL=responsive.js.map
