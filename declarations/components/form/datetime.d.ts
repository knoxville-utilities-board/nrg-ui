import BoundValue from './bound-value.ts';
import type { FieldOptions } from './field';
import type { BoundValueSignature } from '../../index.ts';
import type { Dayjs, OpUnitType } from 'dayjs';
export type DatetimeSignature = BoundValueSignature<{
    Element: HTMLDivElement;
    Args: {
        allowMinuteSelection?: boolean;
        dateFormat?: string;
        maxDate?: Date | Dayjs;
        minDate?: Date | Dayjs;
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
        onHide?: () => void;
        onShow?: () => void;
    };
    Blocks: {
        default: [];
    };
}, Date>;
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
    get defaultValue(): Date | null;
    onBlur(): void;
    onFocus(evt: FocusEvent): void;
    onDateSelect(value: Date): void;
}
