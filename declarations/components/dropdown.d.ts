import Component from '@glimmer/component';
import type { Direction, PopoverVisibility } from './popover.gts';
import type { Alignment } from '@floating-ui/dom';
import type { ComponentLike } from '@glint/template';
import type { WithBoundArgs } from '@glint/template';
import type IntlService from 'ember-intl/services/intl';
interface ItemSignature {
    Element: HTMLSpanElement;
    Args: {
        disabled?: boolean;
        onSelect?: (evt: MouseEvent) => unknown;
        onSelectInternal: (evt: MouseEvent, callback?: (evt: MouseEvent) => unknown) => unknown;
    };
    Blocks: {
        default: [];
    };
}
declare class Item extends Component<ItemSignature> {
    onSelect: (evt: MouseEvent) => void;
}
interface DividerSignature {
    Element: HTMLHRElement;
}
interface HeaderSignature {
    Element: HTMLHeadingElement;
    Blocks: {
        default: [];
    };
}
export interface DropdownSignature {
    Element: HTMLDivElement;
    Args: {
        alignment?: Alignment;
        closeOnSelect?: boolean;
        controlElement?: HTMLElement;
        disabled?: boolean;
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
        control: [PopoverVisibility];
        menu: [
            {
                Divider: ComponentLike<DividerSignature>;
                Header: ComponentLike<HeaderSignature>;
                Item: WithBoundArgs<typeof Item, 'onSelectInternal'>;
            }
        ];
    };
}
export default class Dropdown extends Component<DropdownSignature> {
    menuElement: HTMLElement;
    visibility: PopoverVisibility;
    menuId: `${string}-${string}-${string}-${string}-${string}`;
    intl: IntlService;
    get alignment(): Alignment;
    get disabled(): boolean | undefined;
    get hasIcon(): boolean;
    get showLeftIcon(): boolean;
    get showRightIcon(): boolean;
    get icon(): "bi-caret-down-fill" | "bi-caret-left-fill" | "bi-caret-right-fill" | "bi-caret-up-fill";
    get scrollable(): boolean;
    onMenuInsert: (visibility: PopoverVisibility, element: HTMLElement) => void;
    onSelect: (evt: MouseEvent, callback?: (evt: MouseEvent) => unknown) => Promise<void>;
}
export {};
//# sourceMappingURL=dropdown.d.ts.map