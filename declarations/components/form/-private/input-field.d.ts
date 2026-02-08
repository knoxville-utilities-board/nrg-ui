import BoundValue from '../bound-value.ts';
import type { BoundValueSignature } from '../bound-value.ts';
import type { FieldOptions } from '../field';
import type { AttrValue } from '@glint/template';
export type InputFieldSignature<S, T extends AttrValue = string> = BoundValueSignature<{
    Element: HTMLInputElement;
    Args: {
        basic?: boolean;
        readonly?: boolean;
        fieldOptions?: FieldOptions;
    } & S;
}, T>;
export default class InputField<S = object, T extends AttrValue = string> extends BoundValue<InputFieldSignature<S, T>, T> {
    get classList(): string;
    change(evt: Event): void;
}
