import { A } from '@ember/array';
import { array, fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Datetime from '@nrg-ui/core/components/form/datetime';
import bind from '@nrg-ui/core/helpers/bind';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

import CodeBlock from '../../code-block';

export default class extends Component {
  @tracked
  allowMinuteSelection = true;

  @tracked
  basic;

  @tracked
  dateFormat;

  @tracked
  disabled;

  @tracked
  maxDate;

  @tracked
  minDate;

  @tracked
  parseFormat = A();

  @tracked
  placeholder;

  @tracked
  readonly;

  @tracked
  showNowShortcut;

  @tracked
  timeFormat;

  @tracked
  type;

  @tracked
  value;

  @action
  update(key, value) {
    if (value instanceof Event) {
      value = value.target.value;
    }
    this[key] = value;
  }

  <template>
    <FreestyleSection @name="Datetime" as |Section|>
      <Section.subsection @name="Basic">
        <FreestyleUsage>
          <:example>
            <Datetime
              @allowMinuteSelection={{this.allowMinuteSelection}}
              @basic={{this.basic}}
              @binding={{bind this "value"}}
              @dateFormat={{this.dateFormat}}
              @disabled={{this.disabled}}
              @maxDate={{this.maxDate}}
              @minDate={{this.minDate}}
              @parseFormat={{this.parseFormat}}
              @placeholder={{this.placeholder}}
              @readonly={{this.readonly}}
              @showNowShortcut={{this.showNowShortcut}}
              @timeFormat={{this.timeFormat}}
              @type={{this.type}}
            />
          </:example>
          <:api as |Args|>
            <Args.Bool
              @name="allowMinuteSelection"
              @defaultValue={{true}}
              @description="Whether to allow selection of minutes"
              @value={{this.allowMinuteSelection}}
              @onInput={{fn this.update "allowMinuteSelection"}}
            />
            <Args.Bool
              @name="basic"
              @description="Whether to render the basic version of the input"
              @value={{this.basic}}
              @onInput={{fn this.update "basic"}}
            />
            <Args.String
              @name="dateFormat"
              @defaultValue="LL"
              @description="If provided, the date portion of the value will be formatted with this pattern"
              @value={{this.dateFormat}}
              @onInput={{fn this.update "dateFormat"}}
            />
            <Args.Bool
              @name="disabled"
              @description="Whether the input is disabled"
              @value={{this.disabled}}
              @onInput={{fn this.update "disabled"}}
            />
            <Args.Base
              @name="maxDate"
              @description="When provided, no dates after this point can be selected"
              @type="Date"
              @value={{this.maxDate}}
              @onInput={{fn this.update "maxDate"}}
            >
              {{! template-lint-disable require-input-label }}
              <input type="date" {{on "change" (fn this.update "maxDate")}} />
            </Args.Base>
            <Args.Base
              @name="minDate"
              @description="When provided, no dates before this point can be selected"
              @type="Date"
              @value={{this.minDate}}
              @onInput={{fn this.update "minDate"}}
            >
              {{! template-lint-disable require-input-label }}
              <input type="date" {{on "change" (fn this.update "minDate")}} />
            </Args.Base>
            <Args.Array
              @name="parseFormat"
              @description="When provided, no dates before this point can be selected"
              @items={{this.parseFormat}}
              @type="String"
            />
            <Args.String
              @name="placeholder"
              @description="The placeholder text"
              @value={{this.placeholder}}
              @onInput={{fn this.update "placeholder"}}
            />
            <Args.Bool
              @name="readonly"
              @description="Whether the input is readonly"
              @value={{this.readonly}}
              @onInput={{fn this.update "readonly"}}
            />
            <Args.Bool
              @name="showNowShortcut"
              @defaultValue={{true}}
              @description="Whether to show a 'Now' button to select the current date and time"
              @value={{this.showNowShortcut}}
              @onInput={{fn this.update "showNowShortcut"}}
            />
            <Args.String
              @name="timeFormat"
              @defaultValue="LT"
              @description="If provided, the time portion of the value will be formatted with this pattern"
              @value={{this.timeFormat}}
              @onInput={{fn this.update "timeFormat"}}
            />
            <Args.String
              @name="type"
              @defaultValue="date"
              @description="The type of input to render"
              @options={{array "date" "datetime" "time"}}
              @value={{this.type}}
              @onInput={{fn this.update "type"}}
            />
            <Args.Action
              @name="isDateDisabled"
              @description="A function that receives a date and returns whether it should be disabled"
            >
              <CodeBlock
                @lang="typescript"
                @code="(date: Date, precision?: OpUnitType) => boolean"
              />
            </Args.Action>
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}
