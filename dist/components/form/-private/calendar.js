import { fn, concat } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import dayjs from 'dayjs';
import { t } from 'ember-intl';
import onKey from 'ember-keyboard/modifiers/on-key';
import { notEq } from 'ember-truth-helpers';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime';

const DAY_HEADERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MINUTE_INTERVAL = 5;
class DatetimeCalendar extends Component {
  static {
    g(this.prototype, "isSelectingDays", [tracked], function () {
      return false;
    });
  }
  #isSelectingDays = (i(this, "isSelectingDays"), void 0);
  static {
    g(this.prototype, "isSelectingMonths", [tracked], function () {
      return false;
    });
  }
  #isSelectingMonths = (i(this, "isSelectingMonths"), void 0);
  static {
    g(this.prototype, "isSelectingYears", [tracked], function () {
      return false;
    });
  }
  #isSelectingYears = (i(this, "isSelectingYears"), void 0);
  static {
    g(this.prototype, "isSelectingHours", [tracked], function () {
      return false;
    });
  }
  #isSelectingHours = (i(this, "isSelectingHours"), void 0);
  static {
    g(this.prototype, "isSelectingMinutes", [tracked], function () {
      return false;
    });
  }
  #isSelectingMinutes = (i(this, "isSelectingMinutes"), void 0);
  constructor(owner1, args1) {
    super(owner1, args1);
    if (args1.type === 'datetime' || args1.type === 'date') {
      this.isSelectingDays = true;
    } else if (args1.type === 'time') {
      this.isSelectingHours = true;
    }
  }
  get currentValue() {
    if (this.args.value) {
      return this.args.value;
    }
    const now1 = dayjs();
    if (now1.isBefore(this.args.minDate)) {
      return this.args.minDate;
    } else if (now1.isAfter(this.args.maxDate)) {
      return this.args.maxDate;
    }
    return now1;
  }
  get hasValue() {
    return Boolean(this.args.value);
  }
  get selectedDayIndex() {
    const value1 = this.currentValue;
    return dayjs(value1).date();
  }
  get selectedMonthIndex() {
    const value1 = this.currentValue;
    return dayjs(value1).month();
  }
  get selectedYearIndex() {
    const value1 = this.currentValue;
    return dayjs(value1).year();
  }
  get selectedHourIndex() {
    const value1 = this.currentValue;
    const hasTime1 = this.args.type === 'datetime' || this.args.type === 'time';
    if (!hasTime1) {
      return;
    }
    return dayjs(value1).hour();
  }
  get selectedMinuteIndex() {
    const value1 = this.currentValue;
    const hasTime1 = this.args.type === 'datetime' || this.args.type === 'time';
    if (!hasTime1) {
      return;
    }
    return dayjs(value1).minute();
  }
  get showNowShortcut() {
    if (this.args.showNowShortcut === false) {
      return false;
    }
    const now1 = dayjs();
    const userDisabled1 = this.args.isDateDisabled?.(now1.toDate());
    const afterMaxDate1 = now1.isAfter(this.args.maxDate, 'date');
    const beforeMinDate1 = now1.isBefore(this.args.minDate, 'date');
    return !userDisabled1 && !afterMaxDate1 && !beforeMinDate1;
  }
  get headerDisplay() {
    const calendar1 = dayjs({
      day: this.selectedDayIndex,
      month: this.selectedMonthIndex,
      year: this.selectedYearIndex
    });
    if (this.isSelectingYears) {
      const firstYear1 = this.years[0]?.[0]?.year;
      const lastYear1 = this.years[4]?.[1]?.year;
      return `${firstYear1} - ${lastYear1}`;
    }
    let format1 = 'MMMM YYYY';
    if (this.isSelectingMonths) {
      format1 = 'YYYY';
    } else if (this.isSelectingHours || this.isSelectingMinutes) {
      format1 = 'LL';
    }
    return calendar1.format(format1);
  }
  get minutes() {
    let calendar1 = dayjs({
      hour: this.selectedHourIndex,
      day: this.selectedDayIndex,
      month: this.selectedMonthIndex,
      year: this.selectedYearIndex
    });
    const rows1 = [];
    for (let i1 = 0; i1 < 4; i1++) {
      const row1 = [];
      for (let j1 = 0; j1 < 3; j1++) {
        const minute1 = calendar1.minute();
        const disabled1 = this.isDateDisabled(calendar1.toDate(), 'minute');
        const selected1 = !disabled1 && this.hasValue && this.selectedMinuteIndex === minute1;
        row1.push({
          display: calendar1.format('LT'),
          minute: minute1,
          disabled: disabled1,
          selected: selected1
        });
        calendar1 = calendar1.add(MINUTE_INTERVAL, 'minute');
      }
      rows1.push(row1);
    }
    return rows1;
  }
  get hours() {
    let calendar1 = dayjs({
      day: this.selectedDayIndex,
      month: this.selectedMonthIndex,
      year: this.selectedYearIndex
    });
    const rows1 = [];
    for (let i1 = 0; i1 < 6; i1++) {
      const row1 = [];
      for (let j1 = 0; j1 < 4; j1++) {
        const hour1 = calendar1.hour();
        const disabled1 = this.isDateDisabled(calendar1.toDate(), 'hour');
        const selected1 = !disabled1 && this.hasValue && this.selectedHourIndex === hour1;
        row1.push({
          display: calendar1.format('LT'),
          hour: hour1,
          disabled: disabled1,
          selected: selected1
        });
        calendar1 = calendar1.add(1, 'hour');
      }
      rows1.push(row1);
    }
    return rows1;
  }
  get days() {
    const today1 = dayjs();
    const weeks1 = [];
    let calendar1 = dayjs({
      month: this.selectedMonthIndex,
      year: this.selectedYearIndex
    }).startOf('week');
    for (let i1 = 0; i1 < 6; i1++) {
      const week1 = [];
      do {
        const date1 = calendar1.date();
        const month1 = calendar1.month();
        const year1 = calendar1.year();
        const isDifferentMonth1 = month1 !== this.selectedMonthIndex;
        const dateIsToday1 = calendar1.isSame(today1, 'date');
        const disabled1 = this.isDateDisabled(calendar1.toDate(), 'date') || isDifferentMonth1;
        const selected1 = !disabled1 && this.hasValue && this.selectedDayIndex === date1;
        week1.push({
          customClass: dateIsToday1 && 'today' || '',
          display: date1,
          date: date1,
          month: month1,
          year: year1,
          disabled: disabled1,
          selected: selected1
        });
        calendar1 = calendar1.add(1, 'day');
      } while (calendar1.day() != 0);
      weeks1.push(week1);
    }
    return weeks1;
  }
  get months() {
    const rows1 = [];
    let calendar1 = dayjs({
      year: this.selectedYearIndex
    });
    for (let i1 = 0; i1 < 4; i1++) {
      const row1 = [];
      for (let j1 = 0; j1 < 3; j1++) {
        const month1 = calendar1.month();
        const disabled1 = this.isDateDisabled(calendar1.toDate(), 'month');
        const selected1 = !disabled1 && this.hasValue && this.selectedMonthIndex === month1;
        row1.push({
          display: calendar1.format('MMM'),
          month: month1,
          disabled: disabled1,
          selected: selected1
        });
        calendar1 = calendar1.add(1, 'month');
      }
      rows1.push(row1);
    }
    return rows1;
  }
  get years() {
    const rows1 = [];
    const remainder1 = this.selectedYearIndex % 10;
    const beginYear1 = this.selectedYearIndex - remainder1;
    let year1 = beginYear1;
    for (let i1 = 0; i1 < 5; i1++) {
      const row1 = [];
      for (let j1 = 0; j1 < 2; j1++, year1++) {
        const calendar1 = dayjs({
          year: year1
        });
        const disabled1 = this.isDateDisabled(calendar1.toDate(), 'year');
        const selected1 = !disabled1 && this.hasValue && this.selectedYearIndex === year1;
        row1.push({
          display: year1,
          year: year1,
          disabled: disabled1,
          selected: selected1
        });
      }
      rows1.push(row1);
    }
    return rows1;
  }
  get table() {
    let columnHeaders1 = DAY_HEADERS;
    let columnCountClass1 = 'seven';
    let rows1 = this.days;
    if (this.isSelectingMonths) {
      columnHeaders1 = null;
      columnCountClass1 = 'three';
      rows1 = this.months;
    } else if (this.isSelectingYears) {
      columnHeaders1 = null;
      columnCountClass1 = 'two';
      rows1 = this.years;
    } else if (this.isSelectingHours) {
      columnHeaders1 = null;
      columnCountClass1 = 'four';
      rows1 = this.hours;
    } else if (this.isSelectingMinutes) {
      columnHeaders1 = null;
      columnCountClass1 = 'three';
      rows1 = this.minutes;
    }
    return {
      columnCountClass: columnCountClass1,
      columnHeaders: columnHeaders1,
      rows: rows1
    };
  }
  get allowMinuteSelection() {
    return this.args.allowMinuteSelection !== false;
  }
  isBeyondDateRange(date1, precision1) {
    date1 = dayjs(date1);
    let valid1 = true;
    if (this.args.minDate) {
      valid1 = !date1.isBefore(this.args.minDate, precision1);
    }
    if (this.args.maxDate) {
      valid1 = valid1 && !date1.isAfter(this.args.maxDate, precision1);
    }
    return !valid1;
  }
  isDateDisabled(date1, precision1) {
    const userDisabled1 = this.args.isDateDisabled?.(date1, precision1);
    const isBeyondDateRange1 = this.isBeyondDateRange(date1, precision1);
    return userDisabled1 || isBeyondDateRange1;
  }
  manipulateDate(operation1, dateTransformation1) {
    let date1 = dayjs({
      day: this.selectedDayIndex,
      month: this.selectedMonthIndex,
      year: this.selectedYearIndex,
      hour: this.selectedHourIndex ?? 0,
      minute: this.selectedMinuteIndex ?? 0
    });
    const currentDate1 = date1.clone();
    date1 = date1[operation1](dateTransformation1);
    let precision1 = undefined;
    if (this.isSelectingDays) {
      precision1 = 'day';
    } else if (this.isSelectingMonths) {
      precision1 = 'month';
    } else if (this.isSelectingYears) {
      precision1 = 'year';
    } else if (this.isSelectingHours) {
      precision1 = 'hour';
    } else if (this.isSelectingMinutes) {
      precision1 = 'minute';
    }
    const userDisabled1 = this.args.isDateDisabled?.(date1.toDate(), precision1);
    if (userDisabled1) {
      this.onSelect(currentDate1.toDate());
      return;
    }
    const dateBeforeMinDate1 = this.args.minDate && date1.isBefore(this.args.minDate);
    const dateAfterMaxDate1 = this.args.maxDate && date1.isAfter(this.args.maxDate);
    if (dateBeforeMinDate1) {
      date1 = dayjs(this.args.minDate).clone();
      const remainder1 = date1.minute() % MINUTE_INTERVAL;
      date1 = date1.add(remainder1, 'minute');
    } else if (dateAfterMaxDate1) {
      date1 = dayjs(this.args.maxDate).clone();
      const remainder1 = date1.minute() % MINUTE_INTERVAL;
      date1 = date1.subtract(remainder1, 'minute');
    }
    this.onSelect(date1.toDate());
  }
  selectDate() {
    const value1 = dayjs({
      year: this.selectedYearIndex,
      month: this.selectedMonthIndex,
      day: this.selectedDayIndex,
      hour: this.selectedHourIndex ?? 0,
      minute: this.selectedMinuteIndex ?? 0
    });
    this.onSelect(value1.toDate());
  }
  onSelect(date1) {
    this.args.onSelect?.(date1);
  }
  close() {
    this.args.onClose?.();
  }
  moveLeft(evt1) {
    evt1.preventDefault();
    evt1.stopPropagation();
    if (this.isSelectingDays) {
      this.manipulateDate('subtract', {
        day: 1
      });
    } else if (this.isSelectingMonths) {
      this.manipulateDate('subtract', {
        month: 1
      });
    } else if (this.isSelectingYears) {
      this.manipulateDate('subtract', {
        year: 1
      });
    } else if (this.isSelectingMinutes) {
      this.manipulateDate('subtract', {
        minute: MINUTE_INTERVAL
      });
    } else if (this.isSelectingHours) {
      this.manipulateDate('subtract', {
        hour: 1
      });
    }
  }
  static {
    n(this.prototype, "moveLeft", [action]);
  }
  moveRight(evt1) {
    evt1.preventDefault();
    evt1.stopPropagation();
    if (this.isSelectingDays) {
      this.manipulateDate('add', {
        day: 1
      });
    } else if (this.isSelectingMonths) {
      this.manipulateDate('add', {
        month: 1
      });
    } else if (this.isSelectingYears) {
      this.manipulateDate('add', {
        year: 1
      });
    } else if (this.isSelectingMinutes) {
      this.manipulateDate('add', {
        minute: MINUTE_INTERVAL
      });
    } else if (this.isSelectingHours) {
      this.manipulateDate('add', {
        hour: 1
      });
    }
  }
  static {
    n(this.prototype, "moveRight", [action]);
  }
  moveUp(evt1) {
    evt1.preventDefault();
    evt1.stopPropagation();
    if (this.isSelectingDays) {
      this.manipulateDate('subtract', {
        week: 1
      });
    } else if (this.isSelectingMonths) {
      this.manipulateDate('subtract', {
        month: 3
      });
    } else if (this.isSelectingYears) {
      this.manipulateDate('subtract', {
        year: 2
      });
    } else if (this.isSelectingMinutes) {
      this.manipulateDate('subtract', {
        minute: MINUTE_INTERVAL * 3
      });
    } else if (this.isSelectingHours) {
      this.manipulateDate('subtract', {
        hour: 4
      });
    }
  }
  static {
    n(this.prototype, "moveUp", [action]);
  }
  moveDown(evt1) {
    evt1.preventDefault();
    evt1.stopPropagation();
    if (this.isSelectingDays) {
      this.manipulateDate('add', {
        week: 1
      });
    } else if (this.isSelectingMonths) {
      this.manipulateDate('add', {
        month: 3
      });
    } else if (this.isSelectingYears) {
      this.manipulateDate('add', {
        year: 2
      });
    } else if (this.isSelectingMinutes) {
      this.manipulateDate('add', {
        minute: MINUTE_INTERVAL * 3
      });
    } else if (this.isSelectingHours) {
      this.manipulateDate('add', {
        hour: 4
      });
    }
  }
  static {
    n(this.prototype, "moveDown", [action]);
  }
  onEnter(evt1) {
    evt1.preventDefault();
    evt1.stopPropagation();
    this.goToNextWorkFlowStep();
  }
  static {
    n(this.prototype, "onEnter", [action]);
  }
  onEscape(evt1) {
    evt1.preventDefault();
    evt1.stopPropagation();
    this.close();
  }
  static {
    n(this.prototype, "onEscape", [action]);
  }
  setToNow() {
    const now1 = new Date();
    if (!this.allowMinuteSelection) {
      now1.setMinutes(0, 0, 0);
    }
    this.onSelect(now1);
  }
  static {
    n(this.prototype, "setToNow", [action]);
  }
  clickCell(cell1, evt1) {
    evt1.preventDefault();
    evt1.stopPropagation();
    if (this.isSelectingMinutes) {
      this.manipulateDate('set', {
        minute: cell1.minute
      });
    } else if (this.isSelectingHours) {
      this.manipulateDate('set', {
        hour: cell1.hour,
        minute: 0
      });
    } else if (this.isSelectingMonths) {
      this.manipulateDate('set', {
        month: cell1.month
      });
    } else if (this.isSelectingYears) {
      this.manipulateDate('set', {
        year: cell1.year
      });
    } else if (this.isSelectingDays) {
      this.manipulateDate('set', {
        date: cell1.date,
        month: cell1.month,
        year: cell1.year
      });
    }
    this.goToNextWorkFlowStep();
  }
  static {
    n(this.prototype, "clickCell", [action]);
  }
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
  static {
    n(this.prototype, "onHeaderDisplayClick", [action]);
  }
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
  static {
    n(this.prototype, "goToNextWorkFlowStep", [action]);
  }
  onPrevious() {
    if (this.isSelectingDays) {
      this.manipulateDate('subtract', {
        month: 1
      });
    } else if (this.isSelectingMonths) {
      this.manipulateDate('subtract', {
        year: 1
      });
    } else if (this.isSelectingYears) {
      this.manipulateDate('subtract', {
        year: 10
      });
    } else if (this.isSelectingHours || this.isSelectingMinutes) {
      this.manipulateDate('subtract', {
        day: 1
      });
    }
  }
  static {
    n(this.prototype, "onPrevious", [action]);
  }
  onNext() {
    if (this.isSelectingDays) {
      this.manipulateDate('add', {
        month: 1
      });
    } else if (this.isSelectingMonths) {
      this.manipulateDate('add', {
        year: 1
      });
    } else if (this.isSelectingYears) {
      this.manipulateDate('add', {
        year: 10
      });
    } else if (this.isSelectingHours || this.isSelectingMinutes) {
      this.manipulateDate('add', {
        day: 1
      });
    }
  }
  static {
    n(this.prototype, "onNext", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("\n    <div tabindex=\"-1\" class=\"position-absolute overflow-hidden rounded border mt-5 z-3\" role=\"dialog\" {{onKey \"ArrowUp\" this.moveUp}} {{onKey \"ArrowDown\" this.moveDown}} {{onKey \"ArrowLeft\" this.moveLeft}} {{onKey \"ArrowRight\" this.moveRight}} {{onKey \"Enter\" this.onEnter}} {{onKey \"Escape\" this.onEscape}} ...attributes>\n      <table class=\"table table-borderless calendar mb-0\">\n        <thead class=\"table-light\">\n          {{#if (notEq @type \"time\")}}\n            <tr class=\"header\">\n              <th colspan=\"7\">\n                <span role=\"button\" {{on \"click\" this.onHeaderDisplayClick}}>\n                  {{this.headerDisplay}}\n                </span>\n                <span aria-label={{t \"nrg.base.previous\"}} class=\"float-start\" role=\"button\" {{on \"click\" this.onPrevious}}>\n                  <i class=\"bi-chevron-left\" role=\"img\"></i>\n                </span>\n                <span aria-label={{t \"nrg.base.next\"}} class=\"float-end\" role=\"button\" {{on \"click\" this.onNext}}>\n                  <i class=\"bi-chevron-right\"></i>\n                </span>\n              </th>\n            </tr>\n          {{/if}}\n          {{#if this.table.columnHeaders}}\n            <tr>\n              {{#each this.table.columnHeaders as |columnHeader|}}\n                <th>{{columnHeader}}</th>\n              {{/each}}\n            </tr>\n          {{/if}}\n        </thead>\n        <tbody>\n          {{#each this.table.rows as |row|}}\n            <tr>\n              {{#each row as |cell|}}\n                <td class=\"cell\n                    {{if cell.disabled \"disabled\"}}\n                    {{if cell.selected \"active focus\"}}\n                    {{cell.customClass}}\" role=\"button\" {{on \"click\" (fn this.clickCell cell)}}>\n                  {{cell.display}}\n                </td>\n              {{/each}}\n            </tr>\n          {{/each}}\n        </tbody>\n        <tfoot class=\"table-light\">\n          {{#if this.showNowShortcut}}\n            <tr>\n              <td colspan=\"7\" class=\"today cell\" role=\"button\" {{on \"click\" this.setToNow}}>\n                {{t (concat \"nrg.base.datetime.\" @type)}}\n              </td>\n            </tr>\n          {{/if}}\n        </tfoot>\n      </table>\n    </div>\n  ", {
      strictMode: true,
      scope: () => ({
        onKey,
        notEq,
        on,
        t,
        fn,
        concat
      })
    }), this);
  }
}

export { DatetimeCalendar as default };
//# sourceMappingURL=calendar.js.map
