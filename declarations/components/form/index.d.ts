import Component from '@glimmer/component';
import type { FieldSignature } from './field';
import type { Binding } from '../../index.ts';
import type { Validator, ValidatorImpl } from '../../validation/types';
import type { ButtonSignature } from '../button';
import type Owner from '@ember/owner';
import type { ComponentLike } from '@glint/template';
type Wrapper = {
    id: string;
    v: ValidatorImpl<unknown, object, object>;
};
export type ValidatorsObject = Record<string, Validator | Validator[]>;
export interface FormType {
    didValidate: boolean;
    isValidFor(name: string): boolean;
    errorFor(name: string): string | undefined;
    warningFor(name: string): string | undefined;
    registerBinding(binding: Binding<object>, name?: string): void;
    unregisterBinding(name: string): void;
    registerValidator(validator: ValidatorImpl<unknown, object, object>, name?: string): string;
    unregisterValidator(name: string, id: string): void;
}
export interface FormState {
    isValid: boolean;
}
export interface FormSignature {
    Element: HTMLFormElement;
    Args: {
        didValidate?: boolean;
        disabled?: boolean;
        loading?: boolean;
        preventScroll?: boolean;
        submitClass?: string;
        validators?: ValidatorsObject;
        willValidate?: (event: SubmitEvent) => unknown;
        onSubmit?: (event: SubmitEvent) => unknown;
    };
    Blocks: {
        default: [
            {
                Field: ComponentLike<FieldSignature>;
                SubmitButton: ComponentLike<ButtonSignature>;
            },
            FormState
        ];
    };
}
export default class Form extends Component<FormSignature> implements FormType {
    _didValidate: boolean;
    element: HTMLElement;
    staticValidations: Map<string, Wrapper[]>;
    bindings: Map<string, Binding>;
    constructor(owner: Owner, args: FormSignature['Args']);
    get didValidate(): boolean;
    get loading(): boolean;
    get validations(): Map<string, Wrapper[]>;
    get isValid(): boolean;
    get submitButtonClass(): string;
    submit: import("ember-concurrency").TaskForAsyncTaskFunction<unknown, (event: SubmitEvent) => Promise<void>>;
    registerBinding(binding: Binding, name?: string): void;
    unregisterBinding(name: string): void;
    registerValidator(validator: ValidatorImpl<unknown, object, object>, name?: string): string;
    unregisterValidator(name: string, id: string): void;
    setElement(element: HTMLElement): void;
    checkValidations(): void;
    isValidFor(name: string): boolean;
    errorFor(name: string): string | undefined;
    warningFor(name: string): string | undefined;
}
export {};
