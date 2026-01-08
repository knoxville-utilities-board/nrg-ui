import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import MktgServicePricing from '@nrg-ui/core/components/mktg/service-pricing';
import Section from '@nrg-ui/showcase/components/section';

export default class ServicePricingDemo extends Component {
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

  <template>
    <Section @name="Service Pricing" as |Section|>
      <Section.Subsection @name="Basics" @model={{this}} @elementTag="div">
        <:example as |model|>
          <MktgServicePricing
            class="col-6"
            @active={{model.active}}
            @description={{model.description}}
            @icon={{model.icon}}
            @label={{model.label}}
            @product={{model.product}}
            @selected={{model.selected}}
            as |Addon|
          >
            <Addon @label="Product 1" @price="$80" @quantity={{2}} />
            <Addon @label="Product 2" @price="$5.99/mo" />
            <Addon @label="Product 3" @price="$4.99/mo" />
            <Addon @label="Product 4" @price="$4.99/mo" />
          </MktgServicePricing>
          <MktgServicePricing
            class="col-6"
            @active={{model.active}}
            @description="Add (optional)"
            @icon="bi-tv"
            @label="Phone"
            @selected={{model.selected}}
          />
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.Boolean
              @description="When true, the service pricing component will appear active"
              @name="active"
              @defaultValue={{false}}
            />
            <Args.String
              @description="Renders the description in the top right (Typically used for pricing information)"
              @name="description"
            />
            <Args.String
              @description="Renders a icon in the top left"
              @name="icon"
              @displayType="IconType"
              @typeLink="https://icons.getbootstrap.com/"
            />
            <Args.String @description="Renders the label in the top left" @name="label" />
            <Args.String @description="Renders the product name in the top left" @name="product" />
            <Args.Boolean
              @description="When true, the service pricing component will be selected"
              @name="selected"
              @defaultValue={{true}}
            />
          </Api.Arguments>
        </:api>
      </Section.Subsection>
    </Section>
  </template>
}
