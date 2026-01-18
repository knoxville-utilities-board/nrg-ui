import Service from '@ember/service';
import { type isMobileResult } from 'ismobilejs';
import type MediaService from './media.ts';
import type Owner from '@ember/owner';
export default class Responsive extends Service {
    media: MediaService;
    isMobile: isMobileResult;
    constructor(owner: Owner);
    get isMobileDevice(): boolean;
    get isXSmallScreen(): boolean;
    get isSmallScreen(): boolean;
    get isMediumScreen(): boolean;
    get isLargeScreen(): boolean;
    get isXLargeScreen(): boolean;
    get isXXLargeScreen(): boolean;
    get isMobileScreenGroup(): boolean;
    get isComputerScreenGroup(): boolean;
}
declare module '@ember/service' {
    interface Registry {
        responsive: Responsive;
    }
}
