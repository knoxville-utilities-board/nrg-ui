import Component from '@glimmer/component';
import Search from './search.gts';
import Select from './select.gts';
import type { CheckboxGroupSignature } from './checkbox-group.gts';
import type { CheckboxSignature } from './checkbox.gts';
import type { DatetimeSignature } from './datetime.gts';
import type { FormType } from './index.gts';
import type { NumberInputSignature } from './number-input.gts';
import type { RadioGroupSignature } from './radio-group.gts';
import type { SearchSignature } from './search.gts';
import type { SelectSignature } from './select.gts';
import type { TextAreaSignature } from './text-area.gts';
import type { TextInputSignature } from './text-input.gts';
import type { Binding } from '../../';
import type { ComponentLike } from '@glint/template';
declare interface TextSignature {
    Element: HTMLDivElement;
    Args: {
        id?: string;
        field: Field;
    };
    Blocks: {
        default: [];
    };
}
export interface FieldSignature {
    Element: HTMLLabelElement;
    Args: {
        disabled?: boolean;
        form?: FormType;
        label?: string;
        required?: boolean;
        validatorKey?: string;
    };
    Blocks: {
        default: [
            {
                Checkbox: ComponentLike<CheckboxSignature>;
                CheckboxGroup: ComponentLike<CheckboxGroupSignature>;
                Datetime: ComponentLike<DatetimeSignature>;
                NumberInput: ComponentLike<NumberInputSignature>;
                PhoneInput: ComponentLike<TextInputSignature>;
                RadioGroup: ComponentLike<RadioGroupSignature>;
                Search: ComponentLike<SearchSignature<any>>;
                Select: ComponentLike<SelectSignature<any>>;
                Text: ComponentLike<TextSignature>;
                TextArea: ComponentLike<TextAreaSignature>;
                TextInput: ComponentLike<TextInputSignature>;
            }
        ];
    };
}
export default class Field extends Component<FieldSignature> {
    TypedSearch: {
        new (owner: unknown, args: {
            binding?: Binding;
            defaultValue?: any;
            useDefaultValue?: boolean;
            allowChange?: ((newValue: any, oldValue: any) => boolean) | undefined;
            initBinding?: (binding: Binding) => void;
            onChange?: ((value: any, ...args: unknown[]) => void) | undefined;
        } & {
            basic?: boolean;
            clearable?: boolean;
            describedBy?: string;
            disabled?: boolean;
            displayPath?: string;
            format?: ((value: import("../../").Optional<string>) => string) | false;
            hideSearchIcon?: boolean;
            id?: string;
            isInvalid?: boolean;
            isWarning?: boolean;
            loading?: boolean;
            minCharacters?: number;
            noResultsLabel?: string;
            placeholder?: string;
            readonly?: boolean;
            scrollable?: boolean;
            searchTimeout?: number;
            serializationPath?: string;
            side?: import("../popover.ts").Direction;
            onShow?: () => unknown | Promise<unknown>;
            onHide?: () => unknown | Promise<unknown>;
            onQuery: (searchString: string) => Promise<any[]>;
        }): Search<any>;
    };
    TypedSelect: {
        new (owner: unknown, args: {
            binding?: Binding;
            defaultValue?: any;
            useDefaultValue?: boolean;
            allowChange?: ((newValue: any, oldValue: any) => boolean) | undefined;
            initBinding?: (binding: Binding) => void;
            onChange?: ((value: any, ...args: unknown[]) => void) | undefined;
        } & {
            defaultText?: string;
            describedBy?: string;
            disabled?: boolean;
            displayPath?: string;
            id?: string;
            isInvalid?: boolean;
            isWarning?: boolean;
            loading?: boolean;
            options: any[];
            scrollable?: boolean;
            serializationPath?: string | null;
            side?: import("../popover.ts").Direction;
        }): Select<any>;
    };
    hasText: boolean;
    fieldId: `${string}-${string}-${string}-${string}-${string}`;
    messageId: `${string}-${string}-${string}-${string}-${string}`;
    textId: `${string}-${string}-${string}-${string}-${string}`;
    requiredId?: string;
    binding: Binding<object>;
    constructor(owner: unknown, args: FieldSignature['Args']);
    get isValid(): boolean | undefined;
    get hasError(): boolean;
    get hasWarning(): boolean;
    get errorMessage(): string | undefined;
    get warningMessage(): string | undefined;
    get validatorKey(): string;
    get describedBy(): string;
    initBinding(binding: Binding<object>): void;
    setupValidator(element: Element | undefined, [required]: [boolean]): void;
}
export {};
