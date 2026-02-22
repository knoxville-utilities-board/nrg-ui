import InputField from './-private/input-field.ts';
import type { Optional } from '../../index.ts';
import type { IntlService } from 'ember-intl';
export interface NumberInputArgs {
    allowBlank?: boolean;
    allowDecimals?: boolean;
    format?: ((value: Optional<number>) => string) | 'number' | 'currency' | 'percent' | false;
    formatPrecision?: number;
}
export default class NumberInput extends InputField<NumberInputArgs, number> {
    isFocused: boolean;
    displayString: boolean;
    intl: IntlService;
    get format(): false | "number" | ((value: Optional<number>) => string) | "currency" | "percent";
    get displayValue(): string | Optional<number>;
    get allowDecimals(): boolean;
    change(event: Event): void;
    toggleFocus(focused: boolean): void;
}
