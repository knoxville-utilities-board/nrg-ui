import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import isMobile, { type isMobileResult } from 'ismobilejs';

import type MediaService from './media.ts';
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

declare module '@ember/service' {
  interface Registry {
    responsive: Responsive;
  }
}
