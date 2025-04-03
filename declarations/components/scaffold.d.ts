import Component from '@glimmer/component';
import type { AppBarBlock } from './app-bar.gts';
import type { GroupSignature, ItemSignature } from './sidebar.gts';
import type { Dropdown as ContextMenuType } from '../services/context-menu.ts';
import type ResponsiveService from '../services/responsive.ts';
import type ThemeService from '../services/theme.ts';
import type { ComponentLike } from '@glint/template';
import type { IntlService } from 'ember-intl';
type EnvironmentConfig = Record<string, string> & {
    modulePrefix: string;
};
export interface ScaffoldSignature {
    Element: HTMLDivElement;
    Args: {
        allowThemes?: boolean;
        environment?: string;
    };
    Blocks: {
        'app-bar-left': [AppBarBlock];
        'app-bar-center': [AppBarBlock];
        'app-bar-right': [AppBarBlock];
        'app-bar-mobile-drop-section': [AppBarBlock];
        'context-menu': [ContextMenuType];
        default: [];
        'footer-left': [];
        'footer-right': [];
        about: [];
        sidebar: [
            {
                Item: ComponentLike<ItemSignature>;
                Group: ComponentLike<GroupSignature>;
            }
        ];
        'sidebar-footer': [ComponentLike<ItemSignature>];
    };
}
export default class Scaffold extends Component<ScaffoldSignature> {
    intl: IntlService;
    responsive: ResponsiveService;
    theme: ThemeService;
    showAboutModel: boolean;
    _showSidebar?: boolean;
    get showSidebar(): boolean;
    set showSidebar(value: boolean);
    get allowThemes(): boolean;
    get environmentConfig(): EnvironmentConfig;
    get sidebarIcon(): "list" | "x-lg";
    get themeText(): string;
    toggleSidebar: () => void;
    toggleAboutModal: (open: boolean) => void;
}
export {};
