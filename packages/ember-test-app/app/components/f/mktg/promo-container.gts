import Component from '@glimmer/component';
import PromoContainer from '@nrg-ui/ember/components/mktg/promo-container';
import Button from '@nrg-ui/ember/components/button';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import { fn } from '@ember/helper';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class extends Component {
  @tracked
  class = 'row-cols-1 row-cols-md-3';

  @action
  update(key: string, value: unknown) {
    this[key] = value;
  }

  <template>
    <FreestyleSection @name="Promo Container" as |Section|>
      <Section.subsection @name="Basics">
        <FreestyleUsage>
          <:description>
            <p>The promo container acts as a container for one or more promo
              components. The container implements flex box grid to aid in the
              organization of promo components. Sizing of the promo components
              can be defined by adding classes such as 'col-{number}' to each
              promo component, or by specifying 'row-cols-{number}' on the promo
              container itself. This can be seen most clearly when implementing
              multiple promo components with vertical orientation.
              <br />Note that each child promo component must be implemented
              using dot notation.</p>
          </:description>
          <:example>
            <PromoContainer class={{this.class}} as |Container|>
              <Container.Promo
                class=""
                @vertical={{true}}
                @productName="Product"
              >
                <:img>
                  <img
                    src="https://place-hold.it/400x150"
                    alt="Placeholder"
                    class="rounded d-flex mb-3 w-100"
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
              </Container.Promo>
              <Container.Promo
                class=""
                @vertical={{true}}
                @productName="Product"
              >
                <:img>
                  <img
                    src="https://place-hold.it/400x150"
                    alt="Placeholder"
                    class="rounded d-flex mb-3 w-100"
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
              </Container.Promo>
              <Container.Promo
                class=""
                @vertical={{true}}
                @productName="Product"
              >
                <:img>
                  <img
                    src="https://place-hold.it/400x150"
                    alt="Placeholder"
                    class="rounded d-flex mb-3 w-100"
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
              </Container.Promo>
            </PromoContainer>
          </:example>
          <:api as |Args|>
            <Args.String
              @description="The class to apply to the promo container. Note that this is not an argument but rather a class applied directly to the promo container"
              @name="class"
              @value={{this.class}}
              @onInput={{fn this.update "class"}}
            />
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}
