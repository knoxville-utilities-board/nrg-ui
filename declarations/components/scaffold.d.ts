import Component from '@glimmer/component';
import type { AppBarBlock } from './app-bar';
import type { Group, Item } from './sidebar';
import type { Dropdown as ContextMenuType } from '../services/context-menu.ts';
import type ResponsiveService from '../services/responsive.ts';
import type ThemeService from '../services/theme.ts';
import type { WithBoundArgs } from '@glint/template';
import type { IntlService } from 'ember-intl';
type EnvironmentConfig = Record<string, string> & {
    modulePrefix: string;
};
export interface ScaffoldOptions {
    contextMenuId: string;
}
export interface ScaffoldSignature {
    Element: HTMLDivElement;
    Args: {
        allowThemes?: boolean;
        contextMenuId?: string;
        environment?: string;
        onSidebarToggle?: (open: boolean) => void;
    };
    Blocks: {
        'app-bar-left': [AppBarBlock];
        'app-bar-right': [AppBarBlock];
        'context-menu': [ContextMenuType, string];
        default: [ScaffoldOptions];
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
    get contextMenuId(): string;
    get environmentConfig(): EnvironmentConfig;
    get sidebarIcon(): "list" | "x-lg";
    get isDark(): boolean;
    set isDark(value: boolean);
    toggleSidebar: () => void;
    toggleAboutModal: (open: boolean) => void;
    sidebarClicked: (evt: MouseEvent) => void;
}
export {};
