import Component from '@glimmer/component';
import Icon from '@nrg-ui/ember/components/icon';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { fn } from '@ember/helper';

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
    'Default',
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
    if (key === 'backgroundColor' && value === 'Default') {
      value = `${this.color}-subtle`;
    }
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
              @type={{this.type}}
              @color={{this.color}}
              @circular={{this.circular}}
              @backgroundColor={{this.backgroundColor}}
            />
          </:example>
          <:api as |Args|>
            <Args.String
              @name="type"
              @description="The bootstrap icon type. This is a class that is applied to the icon tag utilizing Bootstrap's icon library."
              @required={{true}}
              @value={{this.type}}
              @onInput={{fn this.update "type"}}
            />
            <Args.String
              @name="color"
              @description="The color of the icon."
              @value={{this.color}}
              @onInput={{fn this.update "color"}}
              @options={{this.colorOptions}}
              @required={{true}}
            />
            <Args.Bool
              @name="circular"
              @description="When true, the icon will render within a padded circle. Note that the default value is false."
              @value={{this.circular}}
              @onInput={{fn this.update "circular"}}
              @defaultValue={{false}}
            />
            <Args.String
              @name="backgroundColor"
              @description="When circular is true, the background color will be determined if a value is passed here. Note that default of this value is the subtle version of the color used for icon color."
              @value={{this.backgroundColor}}
              @onInput={{fn this.update "backgroundColor"}}
              @options={{this.backgroundColorOptions}}
              @defaultValue="{{this.color}}-subtle"
            />
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}
