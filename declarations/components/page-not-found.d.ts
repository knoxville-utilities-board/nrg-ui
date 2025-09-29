import type { TOC } from '@ember/component/template-only';
export interface PageNotFoundSignature {
    Element: HTMLDivElement;
    Args: {
        url: string;
    };
}
declare const PageNotFound: TOC<PageNotFoundSignature>;
export default PageNotFound;
