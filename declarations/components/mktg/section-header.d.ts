import type { TOC } from '@ember/component/template-only';
interface SectionHeaderSignature {
    Element: HTMLDivElement;
    Args: {
        subject?: string;
        title?: string;
    };
    Blocks: {
        subheader: [];
    };
}
declare const SectionHeader: TOC<SectionHeaderSignature>;
export default SectionHeader;
//# sourceMappingURL=section-header.d.ts.map