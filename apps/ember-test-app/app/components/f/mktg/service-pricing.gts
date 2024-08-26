import { fn } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import ServicePricing from '@nrg-ui/ember/components/mktg/service-pricing';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

export default class extends Component {
  @tracked
  class = 'col-6';

  @tracked
  selected = true;

  @tracked
  active = false;

  @action
  update(key: string, value: unknown) {
    this[key] = value;
  }

  <template>
    <FreestyleSection @name="Service Pricing" as |Section|>
      <Section.subsection @name="Basics">
        <FreestyleUsage>
          <:example>
            <ServicePricing
              class={{this.class}}
              @label="Service"
              @package="Package"
              @description="Description"
              @icon="bi-telephone"
              @selected={{this.selected}}
              @active={{this.active}}
              as |Addon|
            >
              <Addon @label="Product 1" @price="$80" @quantity="2" />
              <Addon @label="Product 2" @price="$5.99/mo" />
              <Addon @label="Product 3" @price="$4.99/mo" />
              <Addon @label="Product 4" @price="$4.99/mo" />
            </ServicePricing>
            <ServicePricing
              class={{this.class}}
              @label="Phone"
              @description="Add (optional)"
              @icon="bi-tv"
              @selected={{this.selected}}
              @active={{this.active}}
            />
          </:example>
          <:api as |Args|>
            <Args.String
              @description="The class to apply to the service pricing component. Note that this is not an argument but rather a class applied directly to the section header."
              @name="class"
              @value={{this.class}}
              @onInput={{fn this.update "class"}}
            />
            <Args.Bool
              @description="When true, the service pricing component will be selected"
              @name="selected"
              @value={{this.selected}}
              @onInput={{fn this.update "selected"}}
              @defaultValue={{true}}
            />
            <Args.Bool
              @description="When true, the service pricing component will be active"
              @name="active"
              @value={{this.active}}
              @onInput={{fn this.update "active"}}
              @defaultValue={{false}}
            />
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}
