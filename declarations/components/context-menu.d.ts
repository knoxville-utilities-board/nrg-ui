import Component from '@glimmer/component';
import type { Direction } from './popover.ts';
import type { Dropdown as DropdownType } from '../services/context-menu.ts';
import type ContextMenuService from '../services/context-menu.ts';
import type { Alignment } from '@floating-ui/dom';
export interface ContextMenuItemSignature {
    Element: HTMLHRElement | HTMLHeadingElement | HTMLSpanElement;
    Args: {
        bottom?: boolean;
        closeOnSelect?: boolean;
        disabled?: boolean;
        divider?: boolean;
        header?: boolean;
        menuId: string;
        onSelect?: (evt: MouseEvent) => unknown;
    };
    Blocks: {
        default: [];
    };
}
export declare class ContextMenuItem extends Component<ContextMenuItemSignature> {
    contextMenu: ContextMenuService;
    get menu(): import("../services/context-menu.ts").Menu | undefined;
    get renderTo(): HTMLDivElement | undefined;
    get options(): DropdownType | undefined;
}
export interface ContextMenuSignature {
    Element: HTMLDivElement;
    Args: {
        disabled?: boolean;
        id: string;
        alignment?: Alignment;
        closeOnSelect?: boolean;
        controlElement?: HTMLElement;
        flip?: boolean;
        fullWidth?: boolean;
        hasIcon?: boolean;
        loading?: boolean;
        offset?: string | number;
        scrollable?: boolean;
        side?: Direction;
        onShow?: () => unknown | Promise<unknown>;
        onHide?: () => unknown | Promise<unknown>;
    };
    Blocks: {
        default: [DropdownType];
    };
}
export default class ContextMenu extends Component<ContextMenuSignature> {
    contextMenu: ContextMenuService;
    register: (top: HTMLDivElement, { menu: dropdown }: {
        menu: DropdownType;
    }) => void;
    unregister: () => void;
}
