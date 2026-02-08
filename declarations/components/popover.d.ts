import Component from '@glimmer/component';
import type Owner from '@ember/owner';
import type { Alignment, Placement } from '@floating-ui/dom';
import type { ComponentLike } from '@glint/template';
export interface PopoverVisibility {
    isShown: boolean;
    toggle: (evt: Event) => Promise<void>;
    show: (evtOrInput: HTMLInputElement | Event) => Promise<void>;
    hide: () => Promise<void>;
}
export interface HeaderSignature {
    Element: HTMLHeadingElement;
    Blocks: {
        default: [];
    };
}
export interface BodySignature {
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
        delay?: number;
        flip?: boolean;
        fullWidth?: boolean;
        offset?: string | number;
        side?: Direction;
        onShow?: () => unknown;
        onHide?: () => unknown;
    };
    Blocks: {
        control: [PopoverVisibility];
        content: [
            {
                Header: ComponentLike<HeaderSignature>;
                Body: ComponentLike<BodySignature>;
            },
            PopoverVisibility
        ];
    };
}
export default class Popover extends Component<PopoverSignature> {
    _control: HTMLElement | null;
    popover: HTMLElement | null;
    arrow: HTMLElement | null;
    cleanupAutoUpdate: (() => void) | null;
    id: string;
    adjustedSide: Direction;
    isShown: boolean;
    constructor(owner: Owner, args: PopoverSignature['Args']);
    get control(): HTMLElement | null;
    get hasArrow(): boolean;
    get middleware(): {
        name: string;
        options?: any;
        fn: (state: import("@floating-ui/dom").MiddlewareState) => import("@floating-ui/dom").MiddlewareReturn | Promise<import("@floating-ui/dom").MiddlewareReturn>;
    }[];
    get offset(): number;
    get placement(): Placement;
    get side(): Direction;
    hide: () => Promise<void>;
    initPopover: (popover: HTMLElement) => void;
    setArrow: (popover: HTMLElement) => void;
    show: (evtOrInput: Event | HTMLInputElement) => Promise<void>;
    showPopover: () => void;
    showPopoverModifier: import("ember-modifier").FunctionBasedModifier<{
        Args: {
            Positional: unknown[];
            Named: import("ember-modifier/-private/signature").EmptyObject;
        };
        Element: Element;
    }>;
    updatePosition: () => Promise<void>;
    toggle: (evt: Event) => Promise<void>;
    triggerDisplay: import("ember-concurrency").TaskForAsyncTaskFunction<unknown, (evtOrInput: Event | HTMLInputElement) => Promise<void>>;
}
