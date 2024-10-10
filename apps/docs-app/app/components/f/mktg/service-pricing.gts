import { fn } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { MktgServicePricing } from '@nrg-ui/core';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

export default class extends Component {
  @tracked
  class = 'col-6';

  @tracked
  active = false;

  @tracked
  description = 'Description';

  @tracked
  icon = 'bi-telephone';

  @tracked
  label = 'Label';

  @tracked
  product = 'Product';

  @tracked
  selected = true;

  @action
  update(key: string, value: unknown) {
    this[key] = value;
  }

  <template>
    <FreestyleSection @name="Service Pricing" as |Section|>
      <Section.subsection @name="Basics">
        <FreestyleUsage>
          <:example>
            <MktgServicePricing
              class={{this.class}}
              @active={{this.active}}
              @description={{this.description}}
              @icon={{this.icon}}
              @label={{this.label}}
              @product={{this.product}}
              @selected={{this.selected}}
              as |Addon|
            >
              <Addon @label="Product 1" @price="$80" @quantity="2" />
              <Addon @label="Product 2" @price="$5.99/mo" />
              <Addon @label="Product 3" @price="$4.99/mo" />
              <Addon @label="Product 4" @price="$4.99/mo" />
            </MktgServicePricing>
            <MktgServicePricing
              class={{this.class}}
              @active={{this.active}}
              @description="Add (optional)"
              @icon="bi-tv"
              @label="Phone"
              @selected={{this.selected}}
            />
          </:example>
          <:api as |Args|>
            <Args.String
              @description="The class to apply to the service pricing component. Note that this is not an argument but rather a class applied directly to the service pricing component."
              @name="class"
              @value={{this.class}}
              @onInput={{fn this.update "class"}}
            />
            <Args.Bool
              @description=""
              @name="active"
              @value={{this.active}}
              @onInput={{fn this.update "active"}}
              @defaultValue={{false}}
            />
            <Args.String
              @description="Renders the description in the top right (Typically used for pricing information)"
              @name="description"
              @value={{this.description}}
              @onInput={{fn this.update "description"}}
            />
            <Args.String
              @description="Renders a icon in the top left"
              @name="icon"
              @value={{this.icon}}
              @onInput={{fn this.update "icon"}}
            />
            <Args.String
              @description="Renders the label in the top left"
              @name="label"
              @value={{this.label}}
              @onInput={{fn this.update "label"}}
            />
            <Args.String
              @description="Renders the product name in the top left"
              @name="product"
              @value={{this.product}}
              @onInput={{fn this.update "product"}}
            />
            <Args.Bool
              @description="When true, the service pricing component will be selected"
              @name="selected"
              @value={{this.selected}}
              @onInput={{fn this.update "selected"}}
              @defaultValue={{true}}
            />
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}
