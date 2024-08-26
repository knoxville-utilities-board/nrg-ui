import Component from '@glimmer/component';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class extends Component {
  <template>
    <FreestyleSection @name="Service Pricing" as |Section|>
      <Section.subsection @name="Basics" />
    </FreestyleSection>
  </template>
}
