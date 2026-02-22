import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';
interface EnvironmentDisplaySignature {
    Element: HTMLDivElement;
    Args: {
        environment?: string;
    };
}
export interface AppBarBlock {
    Environment: ComponentLike<EnvironmentDisplaySignature>;
}
export interface AppBarSignature {
    Element: HTMLDivElement;
    Args: {
        environment?: string;
    };
    Blocks: {
        left: [AppBarBlock];
        right: [AppBarBlock];
    };
}
declare const AppBar: TOC<AppBarSignature>;
export default AppBar;
