import Component from '@glimmer/component';
import ServicePricing from '@nrg-ui/ember/components/mktg/service-pricing';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class extends Component {
  <template>
    <FreestyleSection @name="Service Pricing" as |Section|>
      <Section.subsection @name="Basics">
        <FreestyleUsage>
          <:example>
            <ServicePricing
              @label="Service"
              @package="Package"
              @description="$107/mo"
              @icon="bi-tv"
              @selected={{true}}
              @active={{false}}
              as |Addon|
            >
              <Addon @label="Product 1" @price="$80" @quantity="2" />
              <Addon @label="Product 2" @price="$5.99/mo" />
              <Addon @label="Product 3" @price="$4.99/mo" />
              <Addon @label="Product 4" @price="$4.99/mo" />
            </ServicePricing>
          </:example>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}
