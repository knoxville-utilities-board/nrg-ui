import InputField from './-private/input-field.ts';
import type { Optional } from '../../';
export interface PhoneInputSignature {
    Args: {
        format?: ((value: Optional<string>) => string) | false;
    };
}
export default class PhoneField extends InputField<PhoneInputSignature> {
    isFocused: boolean;
    get format(): false | ((value: string) => string);
    get displayValue(): Optional<string>;
    change(event: Event): void;
    toggleFocus(focused: boolean): void;
}
//# sourceMappingURL=phone-input.d.ts.map