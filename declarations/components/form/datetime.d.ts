import BoundValue from './bound-value.ts';
import type { FieldOptions } from './field.gts';
import type { OpUnitType } from 'dayjs';
export interface DatetimeSignature {
    Element: HTMLDivElement;
    Args: {
        allowMinuteSelection?: boolean;
        dateFormat?: string;
        maxDate?: Date;
        minDate?: Date;
        parseFormat?: string | string[];
        placeholder?: string;
        readonly?: boolean;
        showNowShortcut?: boolean;
        timeFormat?: string;
        type?: 'datetime' | 'date' | 'time';
        basic?: boolean;
        fieldOptions?: FieldOptions;
        _class?: string;
        isDateDisabled?: (date: Date, precision?: OpUnitType) => boolean;
    };
    Blocks: {
        default: [];
    };
}
export default class Datetime extends BoundValue<DatetimeSignature, Date> {
    self: Record<'displayValue', string>;
    isFocused: boolean;
    inputValue: string;
    get dateFormat(): string;
    get timeFormat(): string;
    get type(): "time" | "date" | "datetime";
    get showNowShortcut(): boolean;
    get icon(): "bi-calendar-fill" | "bi-clock-fill";
    get displayFormat(): string;
    get displayValue(): string;
    set displayValue(value: string);
    get parseFormats(): string | string[];
    getDefaultValue(): Date;
    onBlur(): void;
    onFocus(evt: FocusEvent): void;
    onDateSelect(value: Date): void;
}
