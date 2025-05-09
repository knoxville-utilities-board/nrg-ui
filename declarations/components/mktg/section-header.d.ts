import type { TOC } from '@ember/component/template-only';
export interface MktgSectionHeaderSignature {
    Element: HTMLDivElement;
    Args: {
        subject?: string;
        title?: string;
    };
    Blocks: {
        subheader: [];
    };
}
declare const SectionHeader: TOC<MktgSectionHeaderSignature>;
export default SectionHeader;
