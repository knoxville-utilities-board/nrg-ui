import { click, findAll, render, triggerKeyEvent } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import Calendar from '@nrg-ui/core/components/form/-private/calendar';
import dayjs from 'dayjs';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../../helpers';

import type { TestContext as BaseContext } from '@ember/test-helpers';
import type { OpUnitType } from 'dayjs';

interface TestContext extends BaseContext {
  model: Model;
}

class Model {
  @tracked
  value?: Date = new Date();
}

module(
  'Integration | Component | form/-private/datetime/calendar',
  function (this: TestContext, hooks) {
    setupRenderingTest(hooks);

    hooks.beforeEach(function (this: TestContext) {
      this.model = new Model();
    });

    test('use arrow key to move to previous day', async function (this: TestContext, assert) {
      const { model } = this;

      model.value = dayjs().toDate();

      const onSelect = (date: Date) => {
        model.value = date;
      };

      await render(<template>
        <Calendar @type="date" @value={{model.value}} @onSelect={{onSelect}} />
      </template>);

      await triggerKeyEvent('.calendar', 'keydown', 'ArrowLeft');
      await triggerKeyEvent('.calendar', 'keydown', 'Enter');

      const expectedDate = dayjs().subtract(1, 'day');

      assert.true(expectedDate.isSame(model.value, 'day'));
    });

    test('use arrow key to move to next day', async function (this: TestContext, assert) {
      const { model } = this;

      const onSelect = (date: Date) => {
        model.value = date;
      };

      await render(<template>
        <Calendar @type="date" @value={{model.value}} @onSelect={{onSelect}} />
      </template>);

      await triggerKeyEvent('.calendar', 'keydown', 'ArrowRight');
      await triggerKeyEvent('.calendar', 'keydown', 'Enter');

      const expectedDate = dayjs().add(1, 'day');

      assert.true(expectedDate.isSame(model.value, 'day'));
    });

    test('maxDate limits selection', async function (this: TestContext, assert) {
      const { model } = this;

      const expectedDate = dayjs();

      const onSelect = (date: Date) => {
        model.value = date;
      };

      await render(<template>
        <Calendar
          @type="date"
          @value={{model.value}}
          @maxDate={{model.value}}
          @onSelect={{onSelect}}
        />
      </template>);

      await triggerKeyEvent('.calendar', 'keydown', 'ArrowRight');
      await triggerKeyEvent('.calendar', 'keydown', 'Enter');

      assert.true(expectedDate.isSame(model.value, 'day'));
    });

    test('minDate limits selection', async function (this: TestContext, assert) {
      const { model } = this;

      const expectedDate = dayjs();

      const onSelect = (date: Date) => {
        model.value = date;
      };

      await render(<template>
        <Calendar
          @type="date"
          @value={{model.value}}
          @minDate={{model.value}}
          @onSelect={{onSelect}}
        />
      </template>);

      await triggerKeyEvent('.calendar', 'keydown', 'ArrowLeft');
      await triggerKeyEvent('.calendar', 'keydown', 'Enter');

      assert.true(expectedDate.isSame(model.value, 'day'));
    });

    test('disabled dates are not navigable', async function (this: TestContext, assert) {
      const { model } = this;

      const onSelect = (date: Date) => {
        model.value = date;
      };

      const isDateDisabled = (date: Date) => {
        return dayjs(date).day() === 3;
      };

      const expectedDate = dayjs({
        day: 20,
        month: 1,
        year: 2020,
      });
      model.value = expectedDate.toDate();

      const minDate = expectedDate.day(1).toDate();
      const maxDate = expectedDate.day(5).toDate();

      await render(<template>
        <Calendar
          @type="date"
          @value={{model.value}}
          @minDate={{minDate}}
          @maxDate={{maxDate}}
          @isDateDisabled={{isDateDisabled}}
          @onSelect={{onSelect}}
        />
      </template>);

      await triggerKeyEvent('.calendar', 'keydown', 'ArrowLeft');
      await triggerKeyEvent('.calendar', 'keydown', 'Enter');

      assert.true(expectedDate.isSame(model.value, 'day'));
    });

    test('disabled dates are not clickable', async function (this: TestContext, assert) {
      const { model } = this;

      const onSelect = (date: Date) => {
        model.value = date;
      };

      const isDateDisabled = (date: Date) => {
        return dayjs(date).day() === 3;
      };

      const expectedDate = dayjs({
        day: 20,
        month: 1,
        year: 2020,
      });
      model.value = expectedDate.toDate();

      const minDate = expectedDate.day(1).toDate();
      const maxDate = expectedDate.day(5).toDate();

      await render(<template>
        <Calendar
          @type="date"
          @value={{model.value}}
          @minDate={{minDate}}
          @maxDate={{maxDate}}
          @isDateDisabled={{isDateDisabled}}
          @onSelect={{onSelect}}
        />
      </template>);

      const availableDateCells = findAll('.calendar tbody td.cell');

      await click(availableDateCells[24]!);

      assert.true(expectedDate.isSame(model.value, 'day'));
    });

    test("previous month's dates are clickable", async function (this: TestContext, assert) {
      const { model } = this;

      model.value = dayjs({
        day: 31,
        month: 6,
        year: 2020,
      }).toDate();

      const onSelect = (date: Date) => {
        model.value = date;
      };

      const expectedDate = dayjs({
        day: 30,
        month: 5,
        year: 2020,
      });

      await render(<template>
        <Calendar @type="date" @value={{model.value}} @onSelect={{onSelect}} />
      </template>);

      const availableDateCells = findAll('.calendar tbody td.cell');

      await click(availableDateCells[2]!);

      assert.true(expectedDate.isSame(model.value, 'day'));
    });

    test("next month's dates are clickable", async function (this: TestContext, assert) {
      const { model } = this;

      model.value = dayjs({
        day: 15,
        month: 1,
        year: 2020,
      }).toDate();

      const onSelect = (date: Date) => {
        model.value = date;
      };

      const expectedDate = dayjs({
        day: 6,
        month: 2,
        year: 2020,
      });

      await render(<template>
        <Calendar @type="date" @value={{model.value}} @onSelect={{onSelect}} />
      </template>);

      const availableDateCells = findAll('.calendar tbody td.cell');

      await click(availableDateCells[40]!);

      assert.true(expectedDate.isSame(model.value, 'day'));
    });

    test('go through full date time workflow', async function (this: TestContext, assert) {
      const { model } = this;

      const onSelect = (date: Date) => {
        model.value = date;
      };

      await render(<template>
        <Calendar
          @type="datetime"
          @value={{model.value}}
          @onSelect={{onSelect}}
        />
      </template>);

      await triggerKeyEvent('.calendar', 'keydown', 'ArrowRight');
      await triggerKeyEvent('.calendar', 'keydown', 'Enter');

      await click('tbody tr:first-child td:first-child');
      await click('tbody tr:nth-child(4) td:last-child');

      const expectedDate = dayjs().add(1, 'day').hour(0).minute(55);

      assert.true(expectedDate.isSame(model.value, 'minute'));
    });

    test('go through time only workflow', async function (this: TestContext, assert) {
      const { model } = this;

      const onSelect = (date: Date) => {
        model.value = date;
      };

      await render(<template>
        <Calendar @type="time" @value={{model.value}} @onSelect={{onSelect}} />
      </template>);

      await click('tbody tr:first-child td:first-child');
      await click('tbody tr:nth-child(4) td:last-child');

      const expectedDate = dayjs().hour(0).minute(55);

      assert.true(expectedDate.isSame(model.value, 'minute'));
    });

    test('header navigation changes indexes', async function (this: TestContext, assert) {
      const { model } = this;

      const onSelect = (date: Date) => {
        model.value = date;
      };

      await render(<template>
        <Calendar @type="date" @value={{model.value}} @onSelect={{onSelect}} />
      </template>);

      await click('.bi-chevron-right');
      await triggerKeyEvent('.calendar', 'keydown', 'Enter');

      const expectedDate = dayjs().add(1, 'month');

      assert.true(expectedDate.isSame(model.value, 'day'));
    });

    test('today/now button hidden if after max date', async function (this: TestContext, assert) {
      const { model } = this;

      model.value = dayjs({
        day: 20,
        month: 1,
        year: 2020,
      }).toDate();

      const maxDate = model.value;

      await render(<template>
        <Calendar @type="date" @value={{model.value}} @maxDate={{maxDate}} />
      </template>);

      assert.dom('tbody tr:nth-child(7)').doesNotExist();
    });

    test('no time is selected if no value is passed in', async function (this: TestContext, assert) {
      await render(<template><Calendar @type="time" /></template>);

      assert.dom('.calendar td.active').doesNotExist();
    });

    test('no date is selected if no value is passed in', async function (this: TestContext, assert) {
      await render(<template><Calendar @type="date" /></template>);

      assert.dom('.calendar td.active').doesNotExist();
    });

    test('isDateDisabled can use precision', async function (this: TestContext, assert) {
      const { model } = this;

      const hour = 8;
      const minute = 15;
      const minDate = dayjs({
        hour,
        minute,
      });
      model.value = minDate.toDate();

      const isDateDisabled = (date: Date, precision?: OpUnitType) => {
        if (precision == 'hour') {
          return dayjs(date).isBefore(minDate, precision);
        }
        return dayjs(date).isSameOrBefore(minDate, precision);
      };

      await render(<template>
        <Calendar
          @type="time"
          @value={{model.value}}
          @isDateDisabled={{isDateDisabled}}
        />
      </template>);

      await click(findAll('tbody tr td.cell')[hour]!);

      const lastDisabledTime = findAll('tbody tr td.cell.disabled')[minute / 5];

      assert.dom(lastDisabledTime).hasClass('disabled');
    });

    test('datetime flow (hours only)', async function (this: TestContext, assert) {
      const { model } = this;

      const onSelect = (date: Date) => {
        model.value = date;
      };

      await render(<template>
        <Calendar
          @type="datetime"
          @value={{model.value}}
          @onSelect={{onSelect}}
          @allowMinuteSelection={{false}}
        />
      </template>);

      await triggerKeyEvent('.calendar', 'keydown', 'ArrowRight');
      await triggerKeyEvent('.calendar', 'keydown', 'Enter');

      await click('tbody tr:first-child td:first-child');

      const expectedDate = dayjs().add(1, 'day').hour(0).minute(0);
      assert.true(expectedDate.isSame(model.value, 'minute'));
    });

    test('time flow (hours only)', async function (this: TestContext, assert) {
      const { model } = this;

      const onSelect = (date: Date) => {
        model.value = date;
      };

      await render(<template>
        <Calendar
          @type="time"
          @value={{model.value}}
          @onSelect={{onSelect}}
          @allowMinuteSelection={{false}}
        />
      </template>);

      await click('tbody tr:first-child td:first-child');

      const expectedDate = dayjs().hour(0).minute(0);

      assert.true(expectedDate.isSame(model.value, 'minute'));
    });

    test('header is hidden with time only', async function (this: TestContext, assert) {
      await render(<template><Calendar @type="time" /></template>);

      assert.dom('.calendar thead tr').doesNotExist();
    });
  },
);
