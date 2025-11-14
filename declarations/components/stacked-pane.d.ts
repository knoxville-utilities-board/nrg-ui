import Component from '@glimmer/component';
import type { TOC } from '@ember/component/template-only';
import type RouterService from '@ember/routing/router-service';
export interface ContainerSignature {
    Element: HTMLElement;
    Blocks: {
        default?: [];
    };
}
declare const Container: TOC<ContainerSignature>;
export interface PaneSignature {
    Element: HTMLElement;
    Blocks: {
        default?: [];
    };
    Args: {
        placeholder?: boolean;
        previousRoute?: string;
        ratio?: 'focused' | 'half' | 'full';
    };
}
declare class Pane extends Component<PaneSignature> {
    router: RouterService;
    get ratio(): "focused" | "half" | "full";
}
export default Pane;
export { Container, Pane };
