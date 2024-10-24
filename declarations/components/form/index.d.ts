import Component from '@glimmer/component';
import type { FieldSignature } from './field.gts';
import type { Binding } from '../../index.ts';
import type { ValidatorBuilder, Validator } from '../../validation/types';
import type { ButtonSignature } from '../button.gts';
import type { ComponentLike } from '@glint/template';
type Wrapper = {
    id: string;
    v: Validator<unknown, object, object, object>;
};
type ValidatorArray = ValidatorBuilder<unknown, object, object, object>[];
type ValidatorsObject = Record<string, ValidatorBuilder<unknown, object, object, object> | ValidatorArray>;
export interface FormType {
    didValidate: boolean;
    isValidFor(name: string): boolean;
    errorFor(name: string): string | undefined;
    warningFor(name: string): string | undefined;
    registerBinding(binding: Binding<object>, name?: string): void;
    registerValidator(validator: Validator<unknown, object, object, object>, name?: string): string;
    unregisterValidator(name: string, id: string): void;
}
export interface FormSignature {
    Element: HTMLFormElement;
    Args: {
        didValidate?: boolean;
        disabled?: boolean;
        loading?: boolean;
        preventScroll?: boolean;
        validators?: ValidatorsObject;
        willValidate?: (event: SubmitEvent) => unknown;
        onSubmit?: (event: SubmitEvent) => unknown;
    };
    Blocks: {
        default: [
            {
                Field: ComponentLike<FieldSignature>;
                SubmitButton: ComponentLike<ButtonSignature>;
            }
        ];
    };
}
export default class Form extends Component<FormSignature> implements FormType {
    _didValidate: boolean;
    element: HTMLElement;
    staticValidations: Map<string, Wrapper[]>;
    bindings: Map<string, Binding>;
    constructor(owner: unknown, args: FormSignature['Args']);
    get didValidate(): boolean;
    get loading(): boolean;
    get validations(): Map<string, Wrapper[]>;
    get isValid(): boolean;
    submit: import("ember-concurrency").TaskForAsyncTaskFunction<unknown, (event: SubmitEvent) => Promise<void>>;
    registerBinding(binding: Binding, name?: string): void;
    unregisterBinding(name: string): void;
    registerValidator(validator: Validator<unknown, object, object, object>, name?: string): string;
    unregisterValidator(name: string, id: string): void;
    setElement(element: HTMLElement): void;
    checkValidations(): void;
    isValidFor(name: string): boolean;
    errorFor(name: string): string | undefined;
    warningFor(name: string): string | undefined;
}
export {};
//# sourceMappingURL=index.d.ts.map