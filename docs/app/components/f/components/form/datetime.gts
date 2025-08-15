import { A } from '@ember/array';
import { array, fn, hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { action, set } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Datetime from '@nrg-ui/core/components/form/datetime';
import { bind } from '@nrg-ui/core/helpers/bind';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

import CodeBlock from '../../../code-block';

class Model {
  @tracked
  property: Date | null = null;
}

export default class DatetimeDemo extends Component {
  model = new Model();

  @tracked
  allowMinuteSelection = true;

  @tracked
  basic = false;

  @tracked
  declare dateFormat: string;

  @tracked
  disabled = false;

  @tracked
  declare maxDate: Date;

  @tracked
  declare minDate: Date;

  @tracked
  parseFormat: string[] = A();

  @tracked
  declare placeholder: string;

  @tracked
  readonly = false;

  @tracked
  declare showNowShortcut: boolean;

  @tracked
  declare timeFormat: string;

  @tracked
  declare type: 'date' | 'datetime' | 'time';

  @tracked
  declare value: Date | string;

  @action
  update(key: string, value: Date | Event | string) {
    if (value instanceof Event) {
      value = (value.target as HTMLInputElement).value;
    }

    set(this, key, value);
  }

  <template>
    {{! @glint-expect-error - Freestyle doesn't have great types }}
    <FreestyleSection @name="Datetime" as |Section|>
      <Section.subsection @name="Basic">
        {{! @glint-expect-error - Freestyle doesn't have great types }}
        <FreestyleUsage>
          <:example>
            <Datetime
              @allowMinuteSelection={{this.allowMinuteSelection}}
              @basic={{this.basic}}
              {{! @glint-expect-error - Binding types are currently not supported }}
              @binding={{bind this.model "property"}}
              @dateFormat={{this.dateFormat}}
              @fieldOptions={{hash disabled=this.disabled}}
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
            <Args.String
              @name="type"
              @defaultValue="date"
              @description="The type of input to render"
              @options={{array "date" "datetime" "time"}}
              @value={{this.type}}
              @onInput={{fn this.update "type"}}
            />
            <Args.String
              @name="dateFormat"
              @defaultValue="LL"
              @description="If provided, the date portion of the value will be formatted with this pattern"
              @value={{this.dateFormat}}
              @onInput={{fn this.update "dateFormat"}}
            />
            <Args.String
              @name="timeFormat"
              @defaultValue="LT"
              @description="If provided, the time portion of the value will be formatted with this pattern"
              @value={{this.timeFormat}}
              @onInput={{fn this.update "timeFormat"}}
            />
            <Args.Array
              @name="parseFormat"
              @description="When provided, no dates before this point can be selected"
              @items={{this.parseFormat}}
              @type="String"
            />
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
            <Args.Bool
              @name="fieldOptions.disabled"
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

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'F::Components::Form::Datetime': typeof DatetimeDemo;
  }
}
