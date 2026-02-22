import type { TOC } from '@ember/component/template-only';
export interface MktgHeaderSignature {
    Element: HTMLDivElement;
    Args: {
        dropSection?: boolean;
        flexCollapse?: boolean;
    };
    Blocks: {
        brand: [];
        title: [];
        options: [];
        nav: [];
    };
}
declare const MktgHeader: TOC<MktgHeaderSignature>;
export default MktgHeader;
