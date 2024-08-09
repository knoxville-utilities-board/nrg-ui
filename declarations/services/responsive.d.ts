import Service from '@ember/service';
import { type isMobileResult } from 'ismobilejs';
import type { MediaService } from '../../unpublished-development-types';
export default class Responsive extends Service {
    media: MediaService;
    isMobile: isMobileResult;
    constructor();
    get isMobileDevice(): boolean;
    get isSmallMobileScreen(): boolean;
    get isMobileScreen(): boolean;
    get isTabletScreen(): boolean;
    get isComputerScreen(): boolean;
    get isLargeMonitor(): boolean;
    get isWidescreenMonitor(): boolean;
    get isMobileScreenGroup(): boolean;
    get isComputerScreenGroup(): boolean;
}
declare module '@ember/service' {
    interface Registry {
        responsive: Responsive;
    }
}
//# sourceMappingURL=responsive.d.ts.map