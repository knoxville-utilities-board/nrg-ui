import Component from '@glimmer/component';
import type { TOC } from '@ember/component/template-only';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
export interface ItemSignature {
    Element: HTMLAnchorElement | HTMLDivElement;
    Args: {
        active?: boolean;
        disabled?: boolean;
        header?: boolean;
        route?: string;
        url?: string;
        onClick?: (evt: MouseEvent) => unknown;
        onClickInternal?: (evt: MouseEvent) => unknown;
    };
    Blocks: {
        badge: [];
        default: [];
    };
}
export declare class Item extends Component<ItemSignature> {
    get classes(): string;
    onClick: (evt: MouseEvent) => void;
}
export interface GroupSignature {
    Element: HTMLAnchorElement | HTMLDivElement;
    Args: {
        active?: boolean;
        disabled?: boolean;
        route?: string;
        url?: string;
        onClick?: (evt: MouseEvent) => unknown;
        onClickInternal?: (evt: MouseEvent) => unknown;
    };
    Blocks: {
        badge: [];
        header: [];
        items: [ComponentLike<ItemSignature>];
    };
}
export declare class Group extends Component<GroupSignature> {
    get classes(): string;
    onClick: (evt: MouseEvent) => void;
}
export interface SidebarSignature {
    Element: HTMLDivElement;
    Args: {
        sticky?: boolean;
        onClickInternal?: (evt: MouseEvent) => unknown;
    };
    Blocks: {
        default: [
            {
                Group: WithBoundArgs<typeof Group, 'onClickInternal'>;
                Item: WithBoundArgs<typeof Item, 'header' | 'onClickInternal'>;
            }
        ];
        footer: [WithBoundArgs<typeof Item, 'onClickInternal'>];
    };
}
declare const Sidebar: TOC<SidebarSignature>;
export default Sidebar;
