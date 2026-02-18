import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Button from '@nrg-ui/core/components/button';
import MktgPromo from '@nrg-ui/core/components/mktg/promo';
import Section from '@nrg-ui/showcase/components/section';

export default class PromoDemo extends Component {
  @tracked
  productName = 'Product';

  <template>
    <Section @name="Promo" @parentName="mktg" as |Section|>
      <Section.Subsection @name="Horizontal Promo" @model={{this}} @elementTag="div">
        <:example as |model|>
          <MktgPromo class="bg-primary text-white" @productName={{model.productName}}>
            <:img>
              <img src="https://place-hold.it/500x500" alt="Placeholder" class="w-100 h-100" />
            </:img>
            <:header>
              <p class="m-0 p-0">Try This Product</p>
            </:header>
            <:description>
              <p>Here's why you should try this product and a description of it.
                <span class="fw-semibold">For only $15 per month</span>
                <ul class="my-3">
                  <li>Option</li>
                  <li>Option</li>
                  <li>Option</li>
                </ul>
              </p>
              <Button type="button" class="mt-2 btn btn-light">
                Learn More
              </Button>
            </:description>
          </MktgPromo>
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.String
              @description="The name of the product being promoted"
              @name="productName"
            />
            <Args.Boolean
              @defaultValue={{false}}
              @description="When true, the promo renders in a vertical orientation. Note that the default value is false, as shown in the above example."
              @name="vertical"
            />
          </Api.Arguments>
          <Api.Blocks as |Block|>
            <Block
              @description="Named yield block to render a description of the promo including any actionable items, such as buttons"
              @name="description"
            />
            <Block
              @description="Named yield block to render the header text of the promo"
              @name="header"
            />
            <Block @description="Named yield block to render the image" @name="img" />
          </Api.Blocks>
        </:api>
      </Section.Subsection>
      <Section.Subsection @name="Vertical Promo" @model={{this}} @elementTag="div">
        <:example as |model|>
          <MktgPromo class="col-12 col-md-6" @productName={{model.productName}} @vertical={{true}}>
            <:img>
              <img
                src="https://place-hold.it/400x150"
                alt="Placeholder"
                class="rounded d-flex mb-3 w-100"
              />
            </:img>
            <:description>
              <p>Here's why you should try this product and a description of it.
                <span class="fw-semibold">For only $15 per month</span>
                <ul class="my-3">
                  <li>Option</li>
                  <li>Option</li>
                  <li>Option</li>
                </ul>
              </p>
              <Button type="button" class="mt-2 btn bg-primary">
                Learn More
              </Button>
            </:description>
          </MktgPromo>
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.String
              @description="The name of the product being promoted"
              @name="productName"
            />
            <Args.Boolean
              @defaultValue={{false}}
              @description="When true, the promo renders in a vertical orientation. Note that the default value is false, as shown in the above example."
              @name="vertical"
            />
          </Api.Arguments>
          <Api.Blocks as |Block|>
            <Block
              @description="Named yield block to render a description of the promo including any actionable items, such as buttons"
              @name="description"
            />
            <Block
              @description="Named yield block to render the header text of the promo"
              @name="header"
            />
            <Block @description="Named yield block to render the image" @name="img" />
          </Api.Blocks>
        </:api>
      </Section.Subsection>
    </Section>
  </template>
}
