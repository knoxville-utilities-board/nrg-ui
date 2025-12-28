import BoundValue from './bound-value.ts';
import type { BoundValueSignature, DropdownSignature, Optional } from '../../index.ts';
import type { Direction, PopoverVisibility } from '../popover';
import type { FieldOptions } from './field';
import type IntlService from 'ember-intl/services/intl';
declare type SelectOption<T> = {
    label: string;
    value: T;
    raw: T;
};
export type SelectSignature<T> = BoundValueSignature<{
    Args: {
        closeOnSelect?: boolean;
        defaultText?: string;
        defaultTextKey?: string;
        displayPath?: string;
        loading?: boolean;
        noOptionsText?: string;
        noOptionsTextKey?: string;
        options?: readonly T[];
        scrollable?: boolean;
        serializationPath?: string | null;
        side?: Direction;
        fieldOptions?: FieldOptions;
    };
    Blocks: {
        control?: [PopoverVisibility];
        display?: [T | undefined];
        option?: [T | undefined];
        empty?: [];
        menu?: DropdownSignature['Blocks']['menu'];
    };
    Element: HTMLButtonElement;
}, T>;
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
    get noOptionsText(): string;
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
