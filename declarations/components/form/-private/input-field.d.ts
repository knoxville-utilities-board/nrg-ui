import BoundValue from '../bound-value.ts';
import type { AttrValue } from '@glint/template';
export type InputFieldSignature<S> = {
    Element: HTMLInputElement;
    Args: {
        basic?: boolean;
        describedBy?: string;
        disabled?: boolean;
        id?: string;
        isInvalid?: boolean;
        isWarning?: boolean;
        readonly?: boolean;
    };
} & S;
export default class InputField<S = object, T extends AttrValue = string> extends BoundValue<InputFieldSignature<S>, T> {
    get classList(): string;
    change(evt: Event): void;
}
