import type { TOC } from '@ember/component/template-only';
export interface FooterSignature {
    Element: HTMLElement;
    Blocks: {
        left?: [];
        right?: [];
    };
}
declare const Footer: TOC<FooterSignature>;
export default Footer;
