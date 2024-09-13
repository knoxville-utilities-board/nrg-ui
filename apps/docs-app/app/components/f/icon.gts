import { fn } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Icon from '@nrg-ui/core/components/icon';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

export default class extends Component {
  colorOptions = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
  ];

  backgroundColorOptions = [
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
  ];

  sizeOptions = ['1', '2', '3', '4', '5', '6'];

  @tracked
  class = '';

  @tracked
  size = '2';

  @tracked
  type = 'bi-telephone';

  @tracked
  color = 'primary';

  @tracked
  circular = false;

  @tracked
  backgroundColor = undefined;

  @action
  update(key: string, value: unknown) {
    if (key === 'circular' && value === false) {
      this.backgroundColor = undefined;
    }
    this[key] = value;
  }

  <template>
    <FreestyleSection @name="Icon" as |Section|>
      <Section.subsection @name="Basics">
        <FreestyleUsage>
          <:example>
            <Icon
              @backgroundColor={{this.backgroundColor}}
              @circular={{this.circular}}
              @color={{this.color}}
              @type={{this.type}}
              @size={{this.size}}
            />
          </:example>
          <:api as |Args|>
            <Args.String
              @defaultValue="{{this.color}}-subtle"
              @description="When circular is true, the background color will be determined if a value is passed here. Note that default of this value is the subtle version of the color used for icon color."
              @name="backgroundColor"
              @value={{this.backgroundColor}}
              @options={{this.backgroundColorOptions}}
              @onInput={{fn this.update "backgroundColor"}}
            />
            <Args.Bool
              @defaultValue={{false}}
              @description="When true, the icon will render within a padded circle. Note that the default value is false."
              @name="circular"
              @value={{this.circular}}
              @onInput={{fn this.update "circular"}}
            />
            <Args.String
              @description="The color of the icon."
              @name="color"
              @options={{this.colorOptions}}
              @required={{true}}
              @value={{this.color}}
              @onInput={{fn this.update "color"}}
            />
            <Args.String
              @description="The size of the icon."
              @name="size"
              @options={{this.sizeOptions}}
              @required={{true}}
              @value={{this.size}}
              @onInput={{fn this.update "size"}}
            />

            <Args.String
              @description="The bootstrap icon type. This is a class that is applied to the icon tag utilizing Bootstrap's icon library."
              @name="type"
              @required={{true}}
              @value={{this.type}}
              @onInput={{fn this.update "type"}}
            />
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}
