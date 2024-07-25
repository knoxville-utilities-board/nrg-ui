import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import isMobile, { type isMobileResult } from 'ismobilejs';
// TODO: Make this better
import type { MediaService } from '../../unpublished-development-types';

export default class Responsive extends Service {
  @service declare media: MediaService;
  @tracked declare isMobile: isMobileResult;

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
    return (
      this.isSmallMobileScreen || this.isMobileScreen || this.isTabletScreen
    );
  }

  get isComputerScreenGroup() {
    return (
      this.isComputerScreen || this.isLargeMonitor || this.isWidescreenMonitor
    );
  }
}

declare module '@ember/service' {
  interface Registry {
    responsive: Responsive;
  }
}
