import { array, fn, hash } from '@ember/helper';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import NumberInput, { numberInputFormats } from '@nrg-ui/core/components/form/number-input';
import { bind } from '@nrg-ui/core/helpers/bind';
import Section from '@nrg-ui/showcase/components/section';
import pageTitle from 'ember-page-title/helpers/page-title';

function print(...msg: unknown[]) {
  console.log(...msg);
}

export default class NumberInputDemo extends Component {
  @tracked
  allowBlank: boolean = false;

  @tracked
  allowDecimals: boolean = false;

  @tracked
  readonly: boolean = false;

  @tracked
  disabled: boolean = false;

  @tracked
  format: string = 'number';

  @tracked
  formatPrecision: number = 2;

  @tracked
  value?: number;

  <template>
    {{pageTitle "Number Input"}}

    <div class="container mx-auto">
      <Section @name="Number Input" as |Section|>
        <Section.Subsection @name="Basic" @model={{this}} @elementTag="input">
          <:example as |model|>
            <NumberInput
              @allowBlank={{model.allowBlank}}
              @allowDecimals={{model.allowDecimals}}
              @fieldOptions={{hash disabled=model.disabled}}
              @format={{model.format}}
              @formatPrecision={{model.formatPrecision}}
              @readonly={{model.readonly}}
              @binding={{bind model "value"}}
              @onChange={{fn print "The value changed to"}}
            />
          </:example>
          <:api as |Api|>
            <Api.Arguments as |Args|>
              <Args.Boolean
                @name="allowBlank"
                @defaultValue={{false}}
                @description="When true, the input will be allowed to be blank"
              />
              <Args.Boolean
                @name="allowDecimals"
                @defaultValue={{false}}
                @description="When true, the input will be allowed to have decimal values"
              />
              <Args.String
                @name="format"
                @defaultValue="number"
                @description="The format to use for displaying the number (e.g., 'number', 'currency')"
                @options={{numberInputFormats}}
              />
              <Args.Number
                @name="formatPrecision"
                @defaultValue={{2}}
                @description="The number of decimal places to display when formatting the number"
              />
              <Args.Boolean
                @name="disabled"
                @defaultValue={{false}}
                @description="When true, the input will be disabled"
              />
              <Args.Boolean
                @name="readonly"
                @defaultValue={{false}}
                @description="When true, the input will be readonly"
              />
            </Api.Arguments>
            <Api.Actions as |Action p|>
              <Action
                @name="onChange"
                @description="The action to call when the value changes"
                @parameters={{array (p "newValue" type="string")}}
              />
            </Api.Actions>
          </:api>
        </Section.Subsection>
      </Section>
    </div>
  </template>
}
