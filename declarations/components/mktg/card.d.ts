import type { TOC } from '@ember/component/template-only';
export interface MktgCardSignature {
    Element: HTMLDivElement;
    Args: {
        title?: string;
        subtitle?: string;
        leftAlignCallout?: boolean;
        horizontal?: boolean;
        hasBorder?: boolean;
        hasHorizontalDivider?: boolean;
    };
    Blocks: {
        start: [];
        end: [];
        callout: [];
    };
}
declare const MktgCard: TOC<MktgCardSignature>;
export default MktgCard;
