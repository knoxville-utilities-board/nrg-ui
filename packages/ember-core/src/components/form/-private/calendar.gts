import { concat, fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import dayjs from 'dayjs';
import { t } from 'ember-intl';
// @ts-expect-error Ember keyboard doesn't currently ship a type for the `on-key` modifier
// https://github.com/adopted-ember-addons/ember-keyboard/issues/464
import onKey from 'ember-keyboard/modifiers/on-key';
import { notEq } from 'ember-truth-helpers';

import type Owner from '@ember/owner';
import type { Dayjs, OpUnitType } from 'dayjs';

const DAY_HEADERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MINUTE_INTERVAL = 5;

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
  @tracked
  isSelectingDays = false;

  @tracked
  isSelectingMonths = false;

  @tracked
  isSelectingYears = false;

  @tracked
  isSelectingHours = false;

  @tracked
  isSelectingMinutes = false;

  constructor(owner: Owner, args: DatetimeCalendarSignature['Args']) {
    super(owner, args);
    if (args.type === 'datetime' || args.type === 'date') {
      this.isSelectingDays = true;
    } else if (args.type === 'time') {
      this.isSelectingHours = true;
    }
  }

  get currentValue(): Dayjs {
    if (this.args.value) {
      return dayjs(this.args.value);
    }

    const { minDate, maxDate } = this.args;
    const min = dayjs(minDate),
      max = dayjs(maxDate);
    const now = dayjs();

    if (now.isBefore(min)) {
      return min;
    } else if (now.isAfter(max)) {
      return max;
    }

    return now;
  }

  get hasValue() {
    return Boolean(this.args.value);
  }

  get selectedDayIndex() {
    const value = this.currentValue;
    return value.date();
  }

  get selectedMonthIndex() {
    const value = this.currentValue;
    return value.month();
  }

  get selectedYearIndex() {
    const value = this.currentValue;
    return value.year();
  }

  get selectedHourIndex() {
    const value = this.currentValue;
    const hasTime = this.args.type === 'datetime' || this.args.type === 'time';
    if (!hasTime) {
      return;
    }
    return value.hour();
  }

  get selectedMinuteIndex() {
    const value = this.currentValue;
    const hasTime = this.args.type === 'datetime' || this.args.type === 'time';
    if (!hasTime) {
      return;
    }
    return value.minute();
  }

  get showNowShortcut() {
    if (this.args.showNowShortcut === false) {
      return false;
    }
    const now = dayjs();
    const userDisabled = this.args.isDateDisabled?.(now.toDate());
    const afterMaxDate = now.isAfter(this.args.maxDate, 'date');
    const beforeMinDate = now.isBefore(this.args.minDate, 'date');
    return !userDisabled && !afterMaxDate && !beforeMinDate;
  }

  get headerDisplay() {
    const calendar = dayjs({
      day: this.selectedDayIndex,
      month: this.selectedMonthIndex,
      year: this.selectedYearIndex,
    });
    if (this.isSelectingYears) {
      const firstYear = this.years[0]?.[0]?.year;
      const lastYear = this.years[4]?.[1]?.year;
      return `${firstYear} - ${lastYear}`;
    }
    let format = 'MMMM YYYY';
    if (this.isSelectingMonths) {
      format = 'YYYY';
    } else if (this.isSelectingHours || this.isSelectingMinutes) {
      format = 'LL';
    }
    return calendar.format(format);
  }

  get minutes(): Cell[][] {
    let calendar = dayjs({
      hour: this.selectedHourIndex,
      day: this.selectedDayIndex,
      month: this.selectedMonthIndex,
      year: this.selectedYearIndex,
    });
    const rows = [];
    for (let i = 0; i < 4; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        const minute = calendar.minute();
        const disabled = this.isDateDisabled(calendar.toDate(), 'minute');
        const selected = !disabled && this.hasValue && this.selectedMinuteIndex === minute;
        row.push({
          display: calendar.format('LT'),
          minute,
          disabled,
          selected,
        });
        calendar = calendar.add(MINUTE_INTERVAL, 'minute');
      }
      rows.push(row);
    }
    return rows;
  }

  get hours(): Cell[][] {
    let calendar = dayjs({
      day: this.selectedDayIndex,
      month: this.selectedMonthIndex,
      year: this.selectedYearIndex,
    });
    const rows = [];
    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 4; j++) {
        const hour = calendar.hour();
        const disabled = this.isDateDisabled(calendar.toDate(), 'hour');
        const selected = !disabled && this.hasValue && this.selectedHourIndex === hour;
        row.push({
          display: calendar.format('LT'),
          hour,
          disabled,
          selected,
        });
        calendar = calendar.add(1, 'hour');
      }
      rows.push(row);
    }
    return rows;
  }

  get days(): Cell[][] {
    const today = dayjs();
    const weeks = [];
    let calendar = dayjs({
      month: this.selectedMonthIndex,
      year: this.selectedYearIndex,
    }).startOf('week');
    for (let i = 0; i < 6; i++) {
      const week = [];
      do {
        const date = calendar.date();
        const month = calendar.month();
        const year = calendar.year();
        const isDifferentMonth = month !== this.selectedMonthIndex;
        const dateIsToday = calendar.isSame(today, 'date');
        const disabled = this.isDateDisabled(calendar.toDate(), 'date') || isDifferentMonth;
        const selected = !disabled && this.hasValue && this.selectedDayIndex === date;

        week.push({
          customClass: (dateIsToday && 'today') || '',
          display: date,
          date,
          month,
          year,
          disabled,
          selected,
        });
        calendar = calendar.add(1, 'day');
      } while (calendar.day() != 0);

      weeks.push(week);
    }
    return weeks;
  }

  get months(): Cell[][] {
    const rows = [];
    let calendar = dayjs({
      year: this.selectedYearIndex,
    });
    for (let i = 0; i < 4; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        const month = calendar.month();
        const disabled = this.isDateDisabled(calendar.toDate(), 'month');
        const selected = !disabled && this.hasValue && this.selectedMonthIndex === month;
        row.push({
          display: calendar.format('MMM'),
          month,
          disabled,
          selected,
        });
        calendar = calendar.add(1, 'month');
      }
      rows.push(row);
    }

    return rows;
  }

  get years(): Cell[][] {
    const rows = [];
    const remainder = this.selectedYearIndex % 10;
    const beginYear = this.selectedYearIndex - remainder;

    let year = beginYear;

    for (let i = 0; i < 5; i++) {
      const row = [];
      for (let j = 0; j < 2; j++, year++) {
        const calendar = dayjs({
          year,
        });
        const disabled = this.isDateDisabled(calendar.toDate(), 'year');
        const selected = !disabled && this.hasValue && this.selectedYearIndex === year;
        row.push({
          display: year,
          year,
          disabled,
          selected,
        });
      }
      rows.push(row);
    }

    return rows;
  }

  get table() {
    let columnHeaders: string[] | null = DAY_HEADERS;
    let columnCountClass = 'seven';
    let rows: Cell[][] = this.days;
    if (this.isSelectingMonths) {
      columnHeaders = null;
      columnCountClass = 'three';
      rows = this.months;
    } else if (this.isSelectingYears) {
      columnHeaders = null;
      columnCountClass = 'two';
      rows = this.years;
    } else if (this.isSelectingHours) {
      columnHeaders = null;
      columnCountClass = 'four';
      rows = this.hours;
    } else if (this.isSelectingMinutes) {
      columnHeaders = null;
      columnCountClass = 'three';
      rows = this.minutes;
    }
    return {
      columnCountClass,
      columnHeaders,
      rows,
    };
  }

  get allowMinuteSelection() {
    return this.args.allowMinuteSelection !== false;
  }

  isBeyondDateRange(date: Date | Dayjs, precision: OpUnitType) {
    date = dayjs(date);
    let valid = true;
    if (this.args.minDate) {
      valid = !date.isBefore(this.args.minDate, precision);
    }
    if (this.args.maxDate) {
      valid = valid && !date.isAfter(this.args.maxDate, precision);
    }
    return !valid;
  }

  isDateDisabled(date: Date, precision: OpUnitType) {
    const userDisabled = this.args.isDateDisabled?.(date, precision);
    const isBeyondDateRange = this.isBeyondDateRange(date, precision);
    return userDisabled || isBeyondDateRange;
  }

  manipulateDate(operation: 'add' | 'subtract' | 'set', dateTransformation: TransformData) {
    let date = dayjs({
      day: this.selectedDayIndex,
      month: this.selectedMonthIndex,
      year: this.selectedYearIndex,
      hour: this.selectedHourIndex ?? 0,
      minute: this.selectedMinuteIndex ?? 0,
    });
    const currentDate = date.clone();

    date = date[operation](dateTransformation);

    let precision: OpUnitType | undefined = undefined;

    if (this.isSelectingDays) {
      precision = 'day';
    } else if (this.isSelectingMonths) {
      precision = 'month';
    } else if (this.isSelectingYears) {
      precision = 'year';
    } else if (this.isSelectingHours) {
      precision = 'hour';
    } else if (this.isSelectingMinutes) {
      precision = 'minute';
    }

    const userDisabled = this.args.isDateDisabled?.(date.toDate(), precision);
    if (userDisabled) {
      this.onSelect(currentDate.toDate());
      return;
    }

    const dateBeforeMinDate = this.args.minDate && date.isBefore(this.args.minDate);
    const dateAfterMaxDate = this.args.maxDate && date.isAfter(this.args.maxDate);

    if (dateBeforeMinDate) {
      date = dayjs(this.args.minDate).clone();
      const remainder = date.minute() % MINUTE_INTERVAL;
      date = date.add(remainder, 'minute');
    } else if (dateAfterMaxDate) {
      date = dayjs(this.args.maxDate).clone();
      const remainder = date.minute() % MINUTE_INTERVAL;
      date = date.subtract(remainder, 'minute');
    }

    this.onSelect(date.toDate());
  }

  selectDate() {
    const value = dayjs({
      year: this.selectedYearIndex,
      month: this.selectedMonthIndex,
      day: this.selectedDayIndex,
      hour: this.selectedHourIndex ?? 0,
      minute: this.selectedMinuteIndex ?? 0,
    });
    this.onSelect(value.toDate());
  }

  onSelect(date: Date) {
    this.args.onSelect?.(date);
  }

  close() {
    this.args.onClose?.();
  }

  @action
  moveLeft(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();

    if (this.isSelectingDays) {
      this.manipulateDate('subtract', { day: 1 });
    } else if (this.isSelectingMonths) {
      this.manipulateDate('subtract', { month: 1 });
    } else if (this.isSelectingYears) {
      this.manipulateDate('subtract', { year: 1 });
    } else if (this.isSelectingMinutes) {
      this.manipulateDate('subtract', { minute: MINUTE_INTERVAL });
    } else if (this.isSelectingHours) {
      this.manipulateDate('subtract', { hour: 1 });
    }
  }

  @action
  moveRight(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();

    if (this.isSelectingDays) {
      this.manipulateDate('add', { day: 1 });
    } else if (this.isSelectingMonths) {
      this.manipulateDate('add', { month: 1 });
    } else if (this.isSelectingYears) {
      this.manipulateDate('add', { year: 1 });
    } else if (this.isSelectingMinutes) {
      this.manipulateDate('add', { minute: MINUTE_INTERVAL });
    } else if (this.isSelectingHours) {
      this.manipulateDate('add', { hour: 1 });
    }
  }

  @action
  moveUp(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();

    if (this.isSelectingDays) {
      this.manipulateDate('subtract', { week: 1 });
    } else if (this.isSelectingMonths) {
      this.manipulateDate('subtract', { month: 3 });
    } else if (this.isSelectingYears) {
      this.manipulateDate('subtract', { year: 2 });
    } else if (this.isSelectingMinutes) {
      this.manipulateDate('subtract', { minute: MINUTE_INTERVAL * 3 });
    } else if (this.isSelectingHours) {
      this.manipulateDate('subtract', { hour: 4 });
    }
  }

  @action
  moveDown(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();

    if (this.isSelectingDays) {
      this.manipulateDate('add', { week: 1 });
    } else if (this.isSelectingMonths) {
      this.manipulateDate('add', { month: 3 });
    } else if (this.isSelectingYears) {
      this.manipulateDate('add', { year: 2 });
    } else if (this.isSelectingMinutes) {
      this.manipulateDate('add', { minute: MINUTE_INTERVAL * 3 });
    } else if (this.isSelectingHours) {
      this.manipulateDate('add', { hour: 4 });
    }
  }

  @action
  onEnter(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();

    this.goToNextWorkFlowStep();
  }

  @action
  onEscape(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();

    this.close();
  }

  @action
  setToNow() {
    const now = new Date();
    if (!this.allowMinuteSelection) {
      now.setMinutes(0, 0, 0);
    }
    this.onSelect(now);
  }

  @action
  clickCell(cell: TransformData, evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();

    if (this.isSelectingMinutes) {
      this.manipulateDate('set', { minute: cell.minute });
    } else if (this.isSelectingHours) {
      this.manipulateDate('set', {
        hour: cell.hour,
        minute: 0,
      });
    } else if (this.isSelectingMonths) {
      this.manipulateDate('set', { month: cell.month });
    } else if (this.isSelectingYears) {
      this.manipulateDate('set', { year: cell.year });
    } else if (this.isSelectingDays) {
      this.manipulateDate('set', {
        year: cell.year,
        month: cell.month,
        date: cell.date,
      });
    }
    this.goToNextWorkFlowStep();
  }

  @action
  onHeaderDisplayClick() {
    if (this.isSelectingDays) {
      this.isSelectingDays = false;
      this.isSelectingMonths = true;
    } else if (this.isSelectingMonths) {
      this.isSelectingMonths = false;
      this.isSelectingYears = true;
    } else if (this.isSelectingYears) {
      this.isSelectingYears = false;
      this.isSelectingDays = true;
    }
  }

  @action
  goToNextWorkFlowStep() {
    if (this.args.type === 'datetime' || this.args.type === 'date') {
      if (this.isSelectingMonths) {
        this.isSelectingMonths = false;
        this.isSelectingDays = true;
        return;
      } else if (this.isSelectingYears) {
        this.isSelectingYears = false;
        this.isSelectingMonths = true;
        return;
      }
    }
    if (this.args.type === 'datetime' || this.args.type === 'time') {
      if (this.isSelectingHours) {
        this.isSelectingHours = false;
        if (this.allowMinuteSelection) {
          this.isSelectingMinutes = true;
        } else {
          this.close();
        }
        return;
      } else if (this.isSelectingMinutes) {
        this.close();
        return;
      }
    }
    if (this.args.type === 'datetime' && this.isSelectingDays) {
      this.isSelectingDays = false;
      this.isSelectingHours = true;
    } else if (this.args.type === 'date') {
      this.close();
    }
  }

  @action
  onPrevious() {
    if (this.isSelectingDays) {
      this.manipulateDate('subtract', { month: 1 });
    } else if (this.isSelectingMonths) {
      this.manipulateDate('subtract', { year: 1 });
    } else if (this.isSelectingYears) {
      this.manipulateDate('subtract', { year: 10 });
    } else if (this.isSelectingHours || this.isSelectingMinutes) {
      this.manipulateDate('subtract', { day: 1 });
    }
  }

  @action
  onNext() {
    if (this.isSelectingDays) {
      this.manipulateDate('add', { month: 1 });
    } else if (this.isSelectingMonths) {
      this.manipulateDate('add', { year: 1 });
    } else if (this.isSelectingYears) {
      this.manipulateDate('add', { year: 10 });
    } else if (this.isSelectingHours || this.isSelectingMinutes) {
      this.manipulateDate('add', { day: 1 });
    }
  }

  <template>
    <div
      tabindex="-1"
      class="position-absolute overflow-hidden rounded border mt-5"
      role="dialog"
      {{onKey "ArrowUp" this.moveUp}}
      {{onKey "ArrowDown" this.moveDown}}
      {{onKey "ArrowLeft" this.moveLeft}}
      {{onKey "ArrowRight" this.moveRight}}
      {{onKey "Enter" this.onEnter}}
      {{onKey "Escape" this.onEscape}}
      ...attributes
    >
      <table class="table table-borderless calendar mb-0">
        <thead>
          {{#if (notEq @type "time")}}
            <tr class="header">
              <th colspan="7">
                <span role="button" {{on "click" this.onHeaderDisplayClick}}>
                  {{this.headerDisplay}}
                </span>
                <span
                  aria-label={{t "nrg.base.previous"}}
                  class="float-start"
                  role="button"
                  {{on "click" this.onPrevious}}
                >
                  <i class="bi-chevron-left" role="img"></i>
                </span>
                <span
                  aria-label={{t "nrg.base.next"}}
                  class="float-end"
                  role="button"
                  {{on "click" this.onNext}}
                >
                  <i class="bi-chevron-right"></i>
                </span>
              </th>
            </tr>
          {{/if}}
          {{#if this.table.columnHeaders}}
            <tr>
              {{#each this.table.columnHeaders as |columnHeader|}}
                <th>{{columnHeader}}</th>
              {{/each}}
            </tr>
          {{/if}}
        </thead>
        <tbody>
          {{#each this.table.rows as |row|}}
            <tr>
              {{#each row as |cell|}}
                <td
                  class="cell
                    {{if cell.disabled 'disabled'}}
                    {{if cell.selected 'active focus'}}
                    {{cell.customClass}}"
                  role="button"
                  {{on "click" (fn this.clickCell cell)}}
                >
                  {{cell.display}}
                </td>
              {{/each}}
            </tr>
          {{/each}}
        </tbody>
        <tfoot>
          {{#if this.showNowShortcut}}
            <tr>
              <td colspan="7" class="today cell" role="button" {{on "click" this.setToNow}}>
                {{t (concat "nrg.base.datetime." @type)}}
              </td>
            </tr>
          {{/if}}
        </tfoot>
      </table>
    </div>
  </template>
}
