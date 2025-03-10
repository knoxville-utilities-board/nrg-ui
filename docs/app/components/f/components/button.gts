// @ts-nocheck - TODO

import { array, fn } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Button } from '@nrg-ui/core';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

export default class ButtonDemo extends Component {
  classOptions = [
    'btn-primary',
    'btn-secondary',
    'btn-success',
    'btn-danger',
    'btn-warning',
    'btn-info',
    'btn-light',
    'btn-dark',
    'btn-link',
  ];

  @tracked
  class = 'btn-primary';

  @tracked
  disabled = false;

  @tracked
  loading = false;

  @tracked
  text = 'Click me!';

  @tracked
  icon = 'bi-arrow-right';

  @tracked
  iconLabel?: string;

  @tracked
  iconPosition = 'left';

  @action
  update(key: string, value: unknown) {
    this[key] = value;
  }

  <template>
    <FreestyleSection @name="Button" as |Section|>
      <Section.subsection @name="Basics">
        <FreestyleUsage>
          <:example>
            <Button
              class={{this.class}}
              @disabled={{this.disabled}}
              @loading={{this.loading}}
              @text={{this.text}}
              @type={{this.type}}
            />
          </:example>
          <:api as |Args|>
            <Args.String
              @name="class"
              @description="The class to apply to the button. Note that this is not an argument but rather a class applied directly to the button"
              @value={{this.class}}
              @onInput={{fn this.update "class"}}
              @options={{this.classOptions}}
            />
            <Args.Bool
              @name="disabled"
              @defaultValue={{false}}
              @description="When true, the button will be disabled"
              @value={{this.disabled}}
              @onInput={{fn this.update "disabled"}}
            />
            <Args.Bool
              @name="loading"
              @defaultValue={{false}}
              @description="When true, the text will be replaced with a loading spinner"
              @value={{this.loading}}
              @onInput={{fn this.update "loading"}}
            />
            <Args.String
              @name="text"
              @description="The text to display on the button"
              @value={{this.text}}
              @onInput={{fn this.update "text"}}
            />
            <Args.String
              @name="type"
              @defaultValue="button"
              @description="The type of button"
              @value={{this.type}}
              @options={{array "button" "submit"}}
              @onInput={{fn this.update "type"}}
            />
          </:api>
        </FreestyleUsage>
      </Section.subsection>

      <Section.subsection @name="Icon">
        <FreestyleUsage>
          <:example>
            <Button
              class="btn-primary"
              @icon={{this.icon}}
              @iconLabel={{this.iconLabel}}
              @iconPosition={{this.iconPosition}}
            >
              Go now
            </Button>
          </:example>
          <:api as |Args|>
            <Args.String
              @name="icon"
              @description="The icon to display"
              @value={{this.icon}}
              @onInput={{fn this.update "icon"}}
            />
            <Args.String
              @name="iconLabel"
              @description="The label for the icon (for accessibility)"
              @value={{this.iconLabel}}
              @onInput={{fn this.update "iconLabel"}}
            />
            <Args.String
              @name="iconPosition"
              @defaultValue="left"
              @description="The position of the icon relative to the text"
              @value={{this.iconPosition}}
              @options={{array "left" "right"}}
              @onInput={{fn this.update "iconPosition"}}
            />
          </:api>
        </FreestyleUsage>
      </Section.subsection>

      <Section.subsection @name="Icon-Only Button">
        <FreestyleUsage>
          <:example>
            <Button
              class="btn-primary"
              @icon={{this.icon}}
              @iconLabel={{this.iconLabel}}
              @iconPosition="center"
            />
          </:example>
          <:api as |Args|>
            <Args.String
              @name="icon"
              @description="The icon to display"
              @value={{this.icon}}
              @onInput={{fn this.update "icon"}}
            />
            <Args.String
              @name="iconLabel"
              @description="The label for the icon (for accessibility)"
              @value={{this.iconLabel}}
              @onInput={{fn this.update "iconLabel"}}
            />
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'F::Components::Button': typeof ButtonDemo;
  }
}
