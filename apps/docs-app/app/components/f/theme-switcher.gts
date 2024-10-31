import { array, fn } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ThemeSwitcher } from '@nrg-ui/core';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

export default class extends Component {
  <template>
    <FreestyleSection @name="Theme Switcher" as |Section|>
      <Section.subsection @name="Basics">
        <FreestyleUsage>
          <:example>
            <ThemeSwitcher />
          </:example>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}
