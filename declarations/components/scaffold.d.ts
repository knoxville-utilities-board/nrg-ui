import Component from '@glimmer/component';
import type { AppBarBlock } from './app-bar.gts';
import type { Group, Item } from './sidebar.gts';
import type { Dropdown as ContextMenuType } from '../services/context-menu.ts';
import type ResponsiveService from '../services/responsive.ts';
import type ThemeService from '../services/theme.ts';
import type { WithBoundArgs } from '@glint/template';
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
        'app-bar-right': [AppBarBlock];
        'context-menu': [ContextMenuType];
        default: [];
        'footer-left': [];
        'footer-right': [];
        about: [];
        sidebar: [
            {
                Item: WithBoundArgs<typeof Item, 'header' | 'onClickInternal'>;
                Group: WithBoundArgs<typeof Group, 'onClickInternal'>;
            }
        ];
        'sidebar-footer': [WithBoundArgs<typeof Item, 'onClickInternal'>];
    };
}
export default class Scaffold extends Component<ScaffoldSignature> {
    self: Record<'isDark', boolean>;
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
    get isDark(): boolean;
    set isDark(value: boolean);
    toggleSidebar: () => void;
    toggleAboutModal: (open: boolean) => void;
    sidebarClicked: (evt: MouseEvent) => void;
}
export {};
