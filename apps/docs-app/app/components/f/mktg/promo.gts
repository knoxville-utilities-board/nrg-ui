import { fn } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Button from '@nrg-ui/core/components/button';
import Promo from '@nrg-ui/core/components/mktg/promo';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

export default class extends Component {
  @tracked
  class = 'bg-primary text-white';

  @tracked
  verticalClass = 'col-12 col-md-6';

  @tracked
  productName = 'Product';

  @action
  update(key: string, value: unknown) {
    this[key] = value;
  }
  <template>
    <FreestyleSection @name="Promo" as |Section|>
      <Section.subsection @name="Horizontal Promo">
        <FreestyleUsage>
          <:example>
            <Promo class={{this.class}} @productName={{this.productName}}>
              <:img>
                <img
                  src="https://place-hold.it/500x500"
                  alt="Placeholder"
                  class="w-100 h-100"
                />
              </:img>
              <:header>
                <p class="m-0 p-0">Try This Product</p>
              </:header>
              <:description>
                <p>Here's why you should try this product and a description of
                  it.
                  <span class="fw-semibold">For only $15 per month</span>
                  <ul class="my-3">
                    <li>Option</li>
                    <li>Option</li>
                    <li>Option</li>
                  </ul>
                </p>
                <Button
                  type="button"
                  class="mt-2 btn bg-primary-subtle text-primary"
                >Learn More</Button>
              </:description>
            </Promo>
          </:example>
          <:api as |Args|>
            <Args.String
              @description="The class to apply to the promo. Note that this is not an argument but rather a class applied directly to the promo"
              @name="class"
              @value={{this.class}}
              @onInput={{fn this.update "class"}}
            />
            <Args.Base
              @defaultValue="false"
              @description="When true, the promo renders in a vertical orientation. Note that the default value is false, as shown in the above example."
              @name="vertical"
              @type="Bool"
            >
              <p>false</p>
            </Args.Base>
            <Args.Yield
              @description="Named yield block to render a description of the promo including any actionable items, such as buttons"
              @name="description"
            />
            <Args.Yield
              @description="Named yield block to render the header text of the promo"
              @name="header"
            />
            <Args.Yield
              @description="Named yield block to render the image"
              @name="img"
            />
          </:api>
        </FreestyleUsage>
      </Section.subsection>
      <Section.subsection @name="Vertical Promo">
        <FreestyleUsage>
          <:example>
            <Promo
              class={{this.verticalClass}}
              @productName={{this.productName}}
              @vertical={{true}}
            >
              <:img>
                <img
                  src="https://place-hold.it/400x150"
                  alt="Placeholder"
                  class="rounded d-flex mb-3 w-100"
                />
              </:img>
              <:description>
                <p>Here's why you should try this product and a description of
                  it.
                  <span class="fw-semibold">For only $15 per month</span>
                  <ul class="my-3">
                    <li>Option</li>
                    <li>Option</li>
                    <li>Option</li>
                  </ul>
                </p>
                <Button
                  type="button"
                  class="mt-2 btn bg-primary-subtle text-primary"
                >Learn More</Button>
              </:description>
            </Promo>
          </:example>
          <:api as |Args|>
            <Args.String
              @description="The class to apply to the promo. Note that this is not an argument but rather a class applied directly to the promo"
              @name="class"
              @value={{this.verticalClass}}
              @onInput={{fn this.update "verticalClass"}}
            />
            <Args.Base
              @defaultValue="false"
              @description="When true, the promo renders in a vertical orientation. Note that the default value is false, as shown in the above example."
              @name="vertical"
              @type="Bool"
            >
              <p>true</p>
            </Args.Base>
            <Args.Yield
              @description="Named yield block to render a description of the promo including any actionable items, such as buttons"
              @name="description"
            />
            <Args.Yield
              @description="Named yield block to render the header text of the promo"
              @name="header"
            />
            <Args.Yield
              @description="Named yield block to render the image"
              @name="img"
            />
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}
