import InputField from './-private/input-field.ts';
import type { Optional } from '../../';
export interface TextInputSignature {
    format?: ((value: Optional<string>) => string) | false;
}
export default class TextInput extends InputField<TextInputSignature> {
    isFocused: boolean;
    get displayValue(): Optional<string>;
    toggleFocus(isFocused: boolean): void;
}
