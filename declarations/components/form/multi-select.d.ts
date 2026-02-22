import BoundValue from './bound-value.ts';
import Select from './select';
import type { BoundValueSignature, DropdownSignature, Optional } from '../../index.ts';
import type { PopoverVisibility } from '../popover';
import type { FieldOptions } from './field';
import type { TOC } from '@ember/component/template-only';
import type Owner from '@ember/owner';
import type { WithBoundArgs } from '@glint/template';
import type { IntlService } from 'ember-intl';
declare type SelectOption<T> = {
    label: string;
    value: T;
    raw?: T;
    selected?: boolean;
};
declare interface RemoveButtonSignature {
    Element: HTMLSpanElement;
    Args: {
        disabled?: boolean;
        onClick: (evt: MouseEvent) => unknown;
    };
}
declare const RemoveButton: TOC<RemoveButtonSignature>;
export type MultiSelectSignature<T> = BoundValueSignature<{
    Element: HTMLButtonElement;
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
        fieldOptions?: FieldOptions;
        onAdd?: (value: T) => unknown;
        onRemove?: (value: T) => unknown;
        onShow?: () => unknown | Promise<unknown>;
        onHide?: () => unknown | Promise<unknown>;
    };
    Blocks: {
        control?: [PopoverVisibility];
        display?: [T[]];
        option?: [T | undefined];
        selection?: [
            {
                value: T | undefined;
                Remove: WithBoundArgs<typeof RemoveButton, 'disabled' | 'onClick'>;
            }
        ];
        empty?: [];
        menu?: DropdownSignature['Blocks']['menu'];
    };
}, T[]>;
export default class MultiSelect<T> extends BoundValue<MultiSelectSignature<T>, T[]> {
    intl: IntlService;
    lastSelection: Optional<SelectOption<T>>;
    self: Record<'value', Optional<T[]>>;
    TypedSelect: typeof Select;
    constructor(owner: Owner, args: MultiSelectSignature<T>['Args']);
    get defaultText(): string;
    get noOptionsText(): string;
    get closeOnSelect(): boolean;
    get internalOptions(): SelectOption<T>[];
    get selectedOptions(): SelectOption<T>[];
    get availableOptions(): SelectOption<T>[];
    addItem: (option: Optional<SelectOption<T>>) => void;
    removeItem: (option: Optional<SelectOption<T>>, index: number) => void;
}
export {};
