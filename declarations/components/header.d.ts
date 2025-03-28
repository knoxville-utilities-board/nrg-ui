import type { TOC } from '@ember/component/template-only';
export interface HeaderSignature {
    Element: HTMLDivElement;
    Blocks: {
        left: [];
        right: [];
        center: [];
        'mobile-drop-section': [];
    };
}
declare const HeaderComponent: TOC<HeaderSignature>;
export default HeaderComponent;
