import Component from '@glimmer/component';
import type Owner from '@ember/owner';
import type { Dayjs, OpUnitType } from 'dayjs';
type TransformData = Partial<{
    [index in OpUnitType]: number;
}>;
type Cell = {
    display: string | number;
    disabled: boolean;
    selected: boolean;
    customClass?: string;
} & TransformData;
export interface DatetimeCalendarSignature {
    Element: HTMLDivElement;
    Args: {
        allowMinuteSelection?: boolean;
        maxDate?: Date | Dayjs;
        minDate?: Date | Dayjs;
        showNowShortcut?: boolean;
        type?: 'datetime' | 'date' | 'time';
        value?: Date | Dayjs | null;
        isDateDisabled?: (date: Date, precision?: OpUnitType) => boolean;
        onClose?: () => void;
        onSelect?: (date: Date) => void;
    };
    Blocks: {
        default: [];
    };
}
export default class DatetimeCalendar extends Component<DatetimeCalendarSignature> {
    isSelectingDays: boolean;
    isSelectingMonths: boolean;
    isSelectingYears: boolean;
    isSelectingHours: boolean;
    isSelectingMinutes: boolean;
    constructor(owner: Owner, args: DatetimeCalendarSignature['Args']);
    get currentValue(): Dayjs;
    get hasValue(): boolean;
    get selectedDayIndex(): number;
    get selectedMonthIndex(): number;
    get selectedYearIndex(): number;
    get selectedHourIndex(): number | undefined;
    get selectedMinuteIndex(): number | undefined;
    get showNowShortcut(): boolean;
    get headerDisplay(): string;
    get minutes(): Cell[][];
    get hours(): Cell[][];
    get days(): Cell[][];
    get months(): Cell[][];
    get years(): Cell[][];
    get table(): {
        columnCountClass: string;
        columnHeaders: string[] | null;
        rows: Cell[][];
    };
    get allowMinuteSelection(): boolean;
    isBeyondDateRange(date: Date | Dayjs, precision: OpUnitType): boolean;
    isDateDisabled(date: Date, precision: OpUnitType): boolean;
    manipulateDate(operation: 'add' | 'subtract' | 'set', dateTransformation: TransformData): void;
    selectDate(): void;
    onSelect(date: Date): void;
    close(): void;
    moveLeft(evt: Event): void;
    moveRight(evt: Event): void;
    moveUp(evt: Event): void;
    moveDown(evt: Event): void;
    onEnter(evt: Event): void;
    onEscape(evt: Event): void;
    setToNow(): void;
    clickCell(cell: TransformData, evt: Event): void;
    onHeaderDisplayClick(): void;
    goToNextWorkFlowStep(): void;
    onPrevious(): void;
    onNext(): void;
}
export {};
