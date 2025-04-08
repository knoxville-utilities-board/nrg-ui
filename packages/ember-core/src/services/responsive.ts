import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import isMobile, { type isMobileResult } from 'ismobilejs';

// TODO: Make this better
import type { MediaService } from '../../unpublished-development-types';
import type Owner from '@ember/owner';

export default class Responsive extends Service {
  @service
  declare media: MediaService;

  @tracked
  declare isMobile: isMobileResult;

  constructor(owner: Owner) {
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

declare module '@ember/service' {
  interface Registry {
    responsive: Responsive;
  }
}
