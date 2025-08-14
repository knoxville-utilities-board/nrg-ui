import BoundValue from '../bound-value.ts';
import type { FieldOptions } from '../field.gts';
import type { AttrValue } from '@glint/template';
export type InputFieldSignature<S> = {
    Element: HTMLInputElement;
    Args: {
        basic?: boolean;
        readonly?: boolean;
        fieldOptions?: FieldOptions;
    } & S;
};
export default class InputField<S = object, T extends AttrValue = string> extends BoundValue<InputFieldSignature<S>, T> {
    get classList(): string;
    change(evt: Event): void;
}
