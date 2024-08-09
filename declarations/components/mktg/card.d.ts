import type { TOC } from '@ember/component/template-only';
interface CardSignature {
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
declare const MktgCard: TOC<CardSignature>;
export default MktgCard;
//# sourceMappingURL=card.d.ts.map