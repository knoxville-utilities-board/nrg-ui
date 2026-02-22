import InputField from './-private/input-field.ts';
import { format as defaultFormat } from '../../utils/phone.ts';
import type { Optional } from '../../index.ts';
export interface PhoneInputArgs {
    format?: ((value: Optional<string>) => string) | false;
}
export default class PhoneField extends InputField<PhoneInputArgs> {
    isFocused: boolean;
    get format(): false | typeof defaultFormat;
    get displayValue(): Optional<string>;
    change(event: Event): void;
    toggleFocus(focused: boolean): void;
}
