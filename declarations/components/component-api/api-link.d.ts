import type { TOC } from '@ember/component/template-only';
export interface ApiLinkSignature {
    Element: HTMLAnchorElement;
    Args: {
        displayType?: string;
        link?: string;
        type: string;
    };
}
export declare const ApiLink: TOC<ApiLinkSignature>;
export default ApiLink;
