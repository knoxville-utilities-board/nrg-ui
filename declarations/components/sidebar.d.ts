import Component from '@glimmer/component';
import type { TOC } from '@ember/component/template-only';
import type Owner from '@ember/owner';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
interface LinkToArgs {
    active?: boolean;
    activeClass?: string;
    'current-when'?: string | boolean;
    disabled?: boolean;
    model?: unknown;
    models?: unknown[];
    query?: Record<string, unknown>;
    replace?: boolean;
    route?: string;
}
export interface ItemSignature {
    Element: HTMLAnchorElement | HTMLDivElement;
    Args: LinkToArgs & {
        header?: boolean;
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
    constructor(owner: Owner, args: ItemSignature['Args']);
    get classes(): string;
    get models(): unknown[];
    get query(): Record<string, unknown>;
    onClick: (evt: MouseEvent) => void;
}
export interface GroupSignature {
    Element: HTMLAnchorElement | HTMLDivElement;
    Args: LinkToArgs & {
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
    constructor(owner: Owner, args: GroupSignature['Args']);
    get classes(): string;
    get models(): unknown[];
    get query(): Record<string, unknown>;
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
