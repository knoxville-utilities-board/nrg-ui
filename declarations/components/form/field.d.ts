import Component from '@glimmer/component';
import MultiSelect from './multi-select.gts';
import Search from './search.gts';
import Select from './select.gts';
import type { CheckboxGroupSignature } from './checkbox-group.gts';
import type { CheckboxSignature } from './checkbox.gts';
import type { DatetimeSignature } from './datetime.gts';
import type { FileUploadSignature } from './file-upload.gts';
import type { FormType } from './index.gts';
import type { MultiSelectSignature } from './multi-select.gts';
import type { NumberInputArgs } from './number-input.gts';
import type { PhoneInputArgs } from './phone-input.gts';
import type { RadioGroupSignature } from './radio-group.gts';
import type { SearchSignature } from './search.gts';
import type { SelectSignature } from './select.gts';
import type { TextAreaSignature } from './text-area.gts';
import type { Binding } from '../../';
import type { InputFieldSignature } from './-private/input-field.ts';
import type { TextInputArgs } from './text-input.gts';
import type Owner from '@ember/owner';
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
                FileUpload: ComponentLike<FileUploadSignature>;
                MultiSelect: ComponentLike<MultiSelectSignature<any>>;
                NumberInput: ComponentLike<NumberInputArgs>;
                PhoneInput: ComponentLike<InputFieldSignature<PhoneInputArgs>>;
                RadioGroup: ComponentLike<RadioGroupSignature>;
                Search: ComponentLike<SearchSignature<any>>;
                Select: ComponentLike<SelectSignature<any>>;
                Text: ComponentLike<TextSignature>;
                TextArea: ComponentLike<TextAreaSignature>;
                TextInput: ComponentLike<InputFieldSignature<TextInputArgs>>;
            },
            FieldOptions
        ];
    };
}
export interface FieldOptions {
    describedBy?: string;
    disabled?: boolean;
    form?: FormType;
    id?: string;
    initBinding?: (binding: Binding<object>) => void;
    isInvalid?: boolean;
    isWarning?: boolean;
    required?: boolean;
    validatorKey?: string;
}
export default class Field extends Component<FieldSignature> {
    TypedSearch: {
        new (owner: Owner, args: {
            binding?: Binding;
            defaultValue?: any;
            useDefaultValue?: boolean;
            fieldOptions?: FieldOptions;
            allowChange?: ((newValue: any, oldValue: any) => boolean) | undefined;
            initBinding?: (binding: Binding) => void;
            onChange?: ((value: any, ...args: unknown[]) => void) | undefined;
        } & {
            basic?: boolean;
            clearable?: boolean;
            displayPath?: string;
            format?: ((value: import("../../").Optional<string>) => string) | false;
            hideSearchIcon?: boolean;
            loading?: boolean;
            minCharacters?: number;
            noResultsLabel?: string;
            placeholder?: string;
            readonly?: boolean;
            scrollable?: boolean;
            searchTimeout?: number;
            serializationPath?: string;
            side?: import("../popover.gts").Direction;
            fieldOptions?: FieldOptions;
            onShow?: () => unknown | Promise<unknown>;
            onHide?: () => unknown | Promise<unknown>;
            onQuery: (searchString: string) => Promise<any[]>;
        }): Search<any>;
    };
    TypedSelect: {
        new (owner: Owner, args: {
            binding?: Binding;
            defaultValue?: any;
            useDefaultValue?: boolean;
            fieldOptions?: FieldOptions;
            allowChange?: ((newValue: any, oldValue: any) => boolean) | undefined;
            initBinding?: (binding: Binding) => void;
            onChange?: ((value: any, ...args: unknown[]) => void) | undefined;
        } & {
            closeOnSelect?: boolean;
            defaultText?: string;
            defaultTextKey?: string;
            displayPath?: string;
            loading?: boolean;
            noOptionsText?: string;
            noOptionsTextKey?: string;
            options: any[];
            scrollable?: boolean;
            serializationPath?: string | null;
            side?: import("../popover.gts").Direction;
            fieldOptions?: FieldOptions;
        }): Select<any>;
    };
    TypedMultiSelect: {
        new (owner: Owner, args: {
            closeOnSelect?: boolean;
            defaultText?: string;
            defaultTextKey?: string;
            displayPath?: string;
            loading?: boolean;
            noOptionsText?: string;
            noOptionsTextKey?: string;
            options: any[];
            scrollable?: boolean;
            serializationPath?: string | null;
            fieldOptions?: FieldOptions;
            onAdd?: ((value: any) => unknown) | undefined;
            onRemove?: ((value: any) => unknown) | undefined;
            onShow?: () => unknown | Promise<unknown>;
            onHide?: () => unknown | Promise<unknown>;
        }): MultiSelect<any>;
    };
    hasText: boolean;
    fieldId: `${string}-${string}-${string}-${string}-${string}`;
    messageId: `${string}-${string}-${string}-${string}-${string}`;
    textId: `${string}-${string}-${string}-${string}-${string}`;
    requiredId?: string;
    binding: Binding<object>;
    constructor(owner: Owner, args: FieldSignature['Args']);
    get isValid(): boolean | undefined;
    get hasError(): boolean;
    get hasWarning(): boolean;
    get errorMessage(): string | undefined;
    get warningMessage(): string | undefined;
    get validatorKey(): string;
    get describedBy(): string;
    initBinding(binding: Binding<object>): void;
    setupValidator(required?: boolean): void;
    setupValidatorModifier: import("ember-modifier").FunctionBasedModifier<{
        Args: {
            Positional: [boolean | undefined];
            Named: import("ember-modifier/-private/signature").EmptyObject;
        };
        Element: Element;
    }>;
}
export {};
