import BoundValue from './bound-value.ts';
import Select from './select.gts';
import type { DropdownSignature, Optional } from '../../index.ts';
import type { PopoverVisibility } from '../popover.gts';
import type { TOC } from '@ember/component/template-only';
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
export interface MultiSelectSignature<T> {
    Element: HTMLButtonElement;
    Args: {
        closeOnSelect?: boolean;
        defaultText?: string;
        defaultTextKey?: string;
        describedBy?: string;
        disabled?: boolean;
        displayPath?: string;
        id?: string;
        isInvalid?: boolean;
        isWarning?: boolean;
        loading?: boolean;
        noOptionsText?: string;
        noOptionsTextKey?: string;
        options: T[];
        scrollable?: boolean;
        serializationPath?: string | null;
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
}
export default class MultiSelect<T> extends BoundValue<MultiSelectSignature<T>, T[]> {
    intl: IntlService;
    lastSelection: Optional<SelectOption<T>>;
    self: Record<'value', Optional<T[]>>;
    TypedSelect: typeof Select;
    constructor(owner: unknown, args: MultiSelectSignature<T>['Args']);
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
