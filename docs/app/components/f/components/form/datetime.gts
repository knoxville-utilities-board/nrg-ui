import { A } from '@ember/array';
import { array, hash } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Datetime from '@nrg-ui/core/components/form/datetime';
import { bind } from '@nrg-ui/core/helpers/bind';
import Section from '@nrg-ui/showcase/components/section';

export default class DatetimeDemo extends Component {
  @tracked
  allowMinuteSelection = true;

  @tracked
  basic = false;

  @tracked
  dateFormat?: string;

  @tracked
  disabled = false;

  @tracked
  maxDate?: Date;

  @tracked
  minDate?: Date;

  @tracked
  parseFormat: string[] = A();

  @tracked
  placeholder?: string;

  @tracked
  readonly = false;

  @tracked
  showNowShortcut = true;

  @tracked
  timeFormat?: string;

  @tracked
  type = 'date';

  @tracked
  value?: Date;

  @action
  onHide() {
    console.log('Datetime closed');
  }

  @action
  onShow() {
    console.log('Datetime opened');
  }

  <template>
    <Section @name="Datetime" as |Section|>
      <Section.Subsection @name="Basic" @model={{this}} @elementTag="div">
        <:example as |model|>
          <Datetime
            @allowMinuteSelection={{model.allowMinuteSelection}}
            @basic={{model.basic}}
            @binding={{bind model "value"}}
            @dateFormat={{model.dateFormat}}
            @fieldOptions={{hash disabled=model.disabled}}
            @maxDate={{model.maxDate}}
            @minDate={{model.minDate}}
            @onHide={{model.onHide}}
            @onShow={{model.onShow}}
            @parseFormat={{model.parseFormat}}
            @placeholder={{model.placeholder}}
            @readonly={{model.readonly}}
            @showNowShortcut={{model.showNowShortcut}}
            @timeFormat={{model.timeFormat}}
            @type={{model.type}}
          />
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.String
              @name="type"
              @defaultValue="date"
              @description="The type of input to render"
              @options={{array "date" "datetime" "time"}}
            />
            <Args.String
              @name="dateFormat"
              @defaultValue="LL"
              @description="If provided, the date portion of the value will be formatted with this pattern"
            />
            <Args.String
              @name="timeFormat"
              @defaultValue="LT"
              @description="If provided, the time portion of the value will be formatted with this pattern"
            />
            {{! TODO: Add back when array arguments are supported by Showcase }}
            {{!-- <Args.Array
              @name="parseFormat"
              @description="When provided, no dates before this point can be selected"
              @items={{this.parseFormat}}
              @type="String"
            /> --}}
            <Args.Boolean
              @name="allowMinuteSelection"
              @defaultValue={{true}}
              @description="Whether to allow selection of minutes"
            />
            <Args.Boolean
              @name="basic"
              @description="Whether to render the basic version of the input"
            />
            <Args.Boolean
              @name="fieldOptions.disabled"
              @description="Whether the input is disabled"
            />
            <Args.Date
              @name="maxDate"
              @description="When provided, no dates after this point can be selected"
            />
            <Args.Date
              @name="minDate"
              @description="When provided, no dates before this point can be selected"
            />
            <Args.String
              @name="placeholder"
              @description="The placeholder text. Note that while this is a native HTML attribute, attributes are applied to the wrapping div and not the input element."
            />
            <Args.Boolean
              @name="readonly"
              @description="Whether the input is readonly"
            />
            <Args.Boolean
              @name="showNowShortcut"
              @defaultValue={{true}}
              @description="Whether to show a 'Now' button to select the current date and time"
            />
          </Api.Arguments>
          <Api.Actions as |Action p|>
            <Action
              @name="isDateDisabled"
              @description="A function that receives a date and returns whether it should be disabled"
              @parameters={{array
                (p "date" description="The date to check" type="Date")
                (p
                  "precision"
                  description="The precision to check at"
                  type="OpUnitType"
                )
              }}
              @returnType="boolean"
            />
            <Action
              @name="onHide"
              @description="Action called when the datetime calendar is closed"
            />
            <Action
              @name="onShow"
              @description="Action called when the datetime calendar is opened"
            />
          </Api.Actions>
        </:api>
      </Section.Subsection>
    </Section>
  </template>
}
