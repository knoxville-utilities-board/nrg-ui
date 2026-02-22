import Component from '@glimmer/component';
import MultiSelect from './multi-select';
import Search from './search';
import Select from './select';
import type { CheckboxGroupSignature } from './checkbox-group';
import type { CheckboxSignature } from './checkbox';
import type { DatetimeSignature } from './datetime';
import type { FileUploadSignature } from './file-upload';
import type { FormType } from './index';
import type { MultiSelectSignature } from './multi-select';
import type { NumberInputArgs } from './number-input';
import type { PhoneInputArgs } from './phone-input';
import type { RadioGroupSignature } from './radio-group';
import type { SearchSignature } from './search';
import type { SelectSignature } from './select';
import type { TextAreaSignature } from './text-area';
import type { Binding } from '../../index.ts';
import type { InputFieldSignature } from './-private/input-field.ts';
import type { TextInputArgs } from './text-input';
import type Owner from '@ember/owner';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
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
                NumberInput: ComponentLike<InputFieldSignature<NumberInputArgs, number>>;
                PhoneInput: ComponentLike<InputFieldSignature<PhoneInputArgs>>;
                RadioGroup: ComponentLike<RadioGroupSignature>;
                Search: ComponentLike<SearchSignature<any>>;
                Select: ComponentLike<SelectSignature<any>>;
                Text: WithBoundArgs<ComponentLike<TextSignature>, 'field'>;
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
    initBinding?: (binding: Binding) => void;
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
            format?: ((value: import("../../index.ts").Optional<string>) => string) | false;
            hideSearchIcon?: boolean;
            loading?: boolean;
            minCharacters?: number;
            noResultsLabel?: string;
            placeholder?: string;
            readonly?: boolean;
            scrollable?: boolean;
            searchTimeout?: number;
            serializationPath?: string;
            side?: import('../popover').Direction;
            fieldOptions?: FieldOptions;
            onShow?: () => unknown | Promise<unknown>;
            onHide?: () => unknown | Promise<unknown>;
            onQuery?: ((searchString: string) => any[] | Promise<any[]>) | undefined;
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
            options?: readonly any[] | undefined;
            scrollable?: boolean;
            serializationPath?: string | null;
            side?: import('../popover').Direction;
            fieldOptions?: FieldOptions;
        }): Select<any>;
    };
    TypedMultiSelect: {
        new (owner: Owner, args: {
            binding?: Binding;
            defaultValue?: any[] | undefined;
            useDefaultValue?: boolean;
            fieldOptions?: FieldOptions;
            allowChange?: ((newValue: import("../../index.ts").Optional<any[]>, oldValue: import("../../index.ts").Optional<any[]>) => boolean) | undefined;
            initBinding?: (binding: Binding) => void;
            onChange?: ((value: import("../../index.ts").Optional<any[]>, ...args: unknown[]) => void) | undefined;
        } & {
            closeOnSelect?: boolean;
            defaultText?: string;
            defaultTextKey?: string;
            displayPath?: string;
            loading?: boolean;
            noOptionsText?: string;
            noOptionsTextKey?: string;
            options?: readonly any[] | undefined;
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
    binding: Binding;
    constructor(owner: Owner, args: FieldSignature['Args']);
    get isValid(): boolean | undefined;
    get hasError(): boolean;
    get hasWarning(): boolean;
    get errorMessage(): string | undefined;
    get warningMessage(): string | undefined;
    get validatorKey(): string;
    get describedBy(): string;
    initBinding(binding: Binding): void;
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
