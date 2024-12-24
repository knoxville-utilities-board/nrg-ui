import Component from '@glimmer/component';
import type { Alignment, Placement } from '@floating-ui/dom';
import type { ComponentLike } from '@glint/template';
export interface PopoverActions {
    toggle: (evt: Event) => Promise<void>;
    show: (evt: Event) => Promise<void>;
    hide: (evt: Event) => Promise<void>;
}
interface HeaderSignature {
    Element: HTMLHeadingElement;
    Blocks: {
        default: [];
    };
}
interface BodySignature {
    Element: HTMLDivElement;
    Blocks: {
        default: [];
    };
}
export type Direction = 'top' | 'end' | 'bottom' | 'start';
export interface PopoverSignature {
    Element: HTMLDivElement;
    Args: {
        alignment?: Alignment;
        arrow?: boolean;
        controlElement?: HTMLElement;
        isShown?: boolean;
        offset?: string | number;
        side?: Direction;
        onShow?: () => void | Promise<void>;
        onHide?: () => void | Promise<void>;
    };
    Blocks: {
        control: [PopoverActions];
        content: [
            {
                Header: ComponentLike<HeaderSignature>;
                Body: ComponentLike<BodySignature>;
            },
            PopoverActions
        ] | [];
    };
}
export default class Popover extends Component<PopoverSignature> {
    _control: HTMLElement | null;
    popover: HTMLElement | null;
    arrow: HTMLElement | null;
    id: string;
    _isShown: boolean;
    get hasArrow(): boolean;
    get offset(): number;
    get placement(): Placement;
    get middleware(): {
        name: string;
        options?: any;
        fn: (state: import("@floating-ui/dom").MiddlewareState) => import("@floating-ui/dom").MiddlewareReturn | Promise<import("@floating-ui/dom").MiddlewareReturn>;
    }[];
    get side(): Direction;
    get isShown(): boolean;
    get control(): HTMLElement | null;
    setArrow: (popover: HTMLElement) => void;
    show: (evt: Event) => Promise<void>;
    hide: () => Promise<void>;
    toggle: (evt: Event) => Promise<void>;
    initPopover: (popover: HTMLElement) => void;
    showPopover: () => Promise<void>;
}
export {};
//# sourceMappingURL=popover.d.ts.map