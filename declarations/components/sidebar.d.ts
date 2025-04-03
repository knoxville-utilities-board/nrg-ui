import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';
export interface ItemSignature {
    Element: HTMLAnchorElement | HTMLDivElement;
    Args: {
        active?: boolean;
        disabled?: boolean;
        header?: boolean;
        route?: string;
        url?: string;
        onClick?: (evt: MouseEvent) => unknown;
    };
    Blocks: {
        badge: [];
        default: [];
    };
}
export interface GroupSignature {
    Element: HTMLAnchorElement | HTMLDivElement;
    Args: {
        active?: boolean;
        disabled?: boolean;
        route?: string;
        url?: string;
        onClick?: (evt: MouseEvent) => unknown;
    };
    Blocks: {
        badge: [];
        header: [];
        items: [ComponentLike<ItemSignature>];
    };
}
export interface SidebarSignature {
    Element: HTMLDivElement;
    Args: {
        sticky?: boolean;
    };
    Blocks: {
        default: [
            {
                Group: ComponentLike<GroupSignature>;
                Item: ComponentLike<ItemSignature>;
            }
        ];
        footer: [ComponentLike<ItemSignature>];
    };
}
declare const Sidebar: TOC<SidebarSignature>;
export default Sidebar;
