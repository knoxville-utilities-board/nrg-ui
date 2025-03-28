import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';
interface EnvironmentDisplaySignature {
    Element: HTMLDivElement;
    Args: {
        environment?: string;
    };
}
export interface AppBarSignature {
    Element: HTMLDivElement;
    Args: {
        environment?: string;
    };
    Blocks: {
        left: [];
        right: [];
        center: [
            {
                Environment: ComponentLike<EnvironmentDisplaySignature>;
            }
        ];
        'mobile-drop-section': [];
    };
}
declare const AppBar: TOC<AppBarSignature>;
export default AppBar;
