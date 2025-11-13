import { fn } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Icon from '@nrg-ui/core/components/icon';
import Section from '@nrg-ui/showcase/components/section';

import type { IconType } from '@nrg-ui/core';
import type {
  ColorType,
  SizeType,
  SubtleColorType,
} from '@nrg-ui/core/components/icon';

const colorOptions = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark',
] as ColorType[];

const backgroundColorOptions = [
  '',
  'primary-subtle',
  'primary',
  'secondary-subtle',
  'secondary',
  'success-subtle',
  'success',
  'danger-subtle',
  'danger',
  'warning-subtle',
  'warning',
  'info-subtle',
  'info',
  'light-subtle',
  'light',
  'dark-subtle',
  'dark',
] as (ColorType | SubtleColorType)[];

const sizeOptions = ['1', '2', '3', '4', '5', '6'] as SizeType[];

export default class IconDemo extends Component {
  @tracked
  size: (typeof sizeOptions)[number] = '2';

  @tracked
  type: IconType = 'bi-telephone';

  @tracked
  color: ColorType = 'primary';

  @tracked
  circular = false;

  @tracked
  backgroundColor?: ColorType | SubtleColorType;

  @action
  update(key: string, value: unknown) {
    if (key === 'circular' && value === false) {
      this.backgroundColor = undefined;
    }
  }

  <template>
    <Section @name="Icon" as |Section|>
      <Section.Subsection @name="Basics" @model={{this}} @elementTag="div">
        <:example as |model|>
          <Icon
            @backgroundColor={{model.backgroundColor}}
            @circular={{model.circular}}
            @color={{model.color}}
            @type={{model.type}}
            @size={{model.size}}
          />
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.String
              @defaultValue="{{this.color}}-subtle"
              @description="When circular is true, the background color will be determined if a value is passed here. Note that default of this value is the subtle version of the color used for icon color."
              @name="backgroundColor"
              @options={{backgroundColorOptions}}
            />
            <Args.Boolean
              @defaultValue={{false}}
              @description="When true, the icon will render within a padded circle. Note that the default value is false."
              @name="circular"
              @onInput={{fn this.update "circular"}}
            />
            <Args.String
              @description="The color of the icon."
              @defaultValue="reset"
              @name="color"
              @options={{colorOptions}}
              @required={{true}}
            />
            <Args.String
              @description="The size of the icon."
              @name="size"
              @options={{sizeOptions}}
              @required={{true}}
            />
            <Args.String
              @description="The bootstrap icon type. This is a class that is applied to the icon tag utilizing Bootstrap's icon library."
              @name="type"
              @required={{true}}
              @displayType="IconType"
              @typeLink="https://icons.getbootstrap.com/"
            />
          </Api.Arguments>
        </:api>
      </Section.Subsection>
    </Section>
  </template>
}
