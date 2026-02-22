import InputField from './-private/input-field.ts';
import type { Optional } from '../../index.ts';
export interface TextInputArgs {
    format?: ((value: Optional<string>) => string) | false;
}
export default class TextInput extends InputField<TextInputArgs> {
    isFocused: boolean;
    get displayValue(): Optional<string>;
    toggleFocus(isFocused: boolean): void;
}
