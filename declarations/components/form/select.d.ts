import BoundValue from './bound-value.ts';
import type { Optional } from '../../';
import type { Direction, PopoverVisibility } from '../popover.gts';
import type IntlService from 'ember-intl/services/intl';
declare type SelectOption<T> = {
    label: string;
    value: T;
    raw: T;
};
export interface SelectSignature<T> {
    Args: {
        defaultText?: string;
        describedBy?: string;
        disabled?: boolean;
        displayPath?: string;
        id?: string;
        isInvalid?: boolean;
        isWarning?: boolean;
        loading?: boolean;
        options: T[];
        scrollable?: boolean;
        serializationPath?: string | null;
        side?: Direction;
    };
    Blocks: {
        control?: [PopoverVisibility];
        display?: [T | undefined];
        option?: [T | undefined];
        empty?: [];
    };
    Element: HTMLButtonElement;
}
export default class Select<T> extends BoundValue<SelectSignature<T>, T> {
    visibility: PopoverVisibility;
    menuId: `${string}-${string}-${string}-${string}-${string}`;
    menuElement: Optional<HTMLElement>;
    activeItem: number;
    internalSearchBuffer: string;
    intl: IntlService;
    get classList(): string;
    get caretIcon(): "bi-caret-down-fill" | "bi-caret-up-fill";
    get defaultText(): string;
    get scrollable(): boolean;
    get isOpen(): boolean;
    get selected(): Optional<SelectOption<T>>;
    set selected(option: SelectOption<T>);
    get hasSelected(): boolean;
    get internalOptions(): SelectOption<T>[];
    get disabled(): boolean | undefined;
    selectItemBySearch(): boolean | undefined;
    scrollActiveItemIntoView(): void;
    onSelectInternal(option: SelectOption<T>, evt?: MouseEvent): void;
    onInsert(element: HTMLElement): void;
    toggleSelect(evt: MouseEvent): void;
    onFocus(evt: Event): void;
    onBlur(): void;
    onKeyboardInput(evt: KeyboardEvent): void;
    moveUp(evt: KeyboardEvent): void;
    moveDown(evt: KeyboardEvent): void;
    enterKeyHandler(evt: KeyboardEvent): void;
    exitKeyHandler(evt?: KeyboardEvent): void;
    saveVisibility(visibility: PopoverVisibility): void;
}
export {};
