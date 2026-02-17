import Button from '@nrg-ui/core/components/button';
import MktgPromoContainer from '@nrg-ui/core/components/mktg/promo-container';
import Section from '@nrg-ui/showcase/components/section';

<template>
  <Section @name="Promo Container" @parentName="mktg-components" as |Section|>
    <Section.Subsection @name="Basics" @model={{this}} @elementTag="div">
      {{! <:description>
        <p>The promo container acts as a container for one or more promo
          components as well as a section header component. The container
          implements flex box grid to aid in the organization of promo
          components. Sizing of the promo components can be defined by adding
          classes such as 'col-{number}' to each promo component, or by
          specifying 'row-cols-{number}' on the promo container itself.
          <br />Note that each child component must be implemented using dot
          notation.</p>
      </:description> }}
      <:example>
        <MktgPromoContainer class="bg-body" as |Container|>
          <Container.SectionHeader @subject="Subject" @title="Section Title">
            <:subheader>
              <p class="m-0">
                Here's some content to give context and summarize this section.
              </p>
              <div class="d-flex justify-content-center mb-4">
                <Button type="button" class="mx-2 mt-2 btn btn-primary">
                  Contact Us
                </Button>
                <Button type="button" class="mx-2 mt-2 btn text-primary">
                  Or call (865) 111-2323
                </Button>
              </div>
            </:subheader>
          </Container.SectionHeader>
          <Container.Promo class="col-12 col-md-4" @productName="Product" @vertical={{true}}>
            <:img>
              <img
                src="https://place-hold.it/400x150"
                alt="Placeholder"
                class="rounded d-flex mb-3 w-100"
              />
            </:img>
            <:description>
              <p>Here's why you should try this product and a description of it.
                <br />
                <span class="fw-semibold">For only $15 per month</span>
                <ul class="my-3">
                  <li>Option</li>
                  <li>Option</li>
                  <li>Option</li>
                </ul>
              </p>
              <Button type="button" class="mt-2 btn bg-primary-subtle text-primary">
                Learn More
              </Button>
            </:description>
          </Container.Promo>
          <Container.Promo class="col-12 col-md-4" @productName="Product" @vertical={{true}}>
            <:img>
              <img
                src="https://place-hold.it/400x150"
                alt="Placeholder"
                class="rounded d-flex mb-3 w-100"
              />
            </:img>
            <:description>
              <p>Here's why you should try this product and a description of it.
                <br />
                <span class="fw-semibold">For only $15 per month</span>
                <ul class="my-3">
                  <li>Option</li>
                  <li>Option</li>
                  <li>Option</li>
                </ul>
              </p>
              <Button type="button" class="mt-2 btn bg-primary-subtle text-primary">
                Learn More
              </Button>
            </:description>
          </Container.Promo>
          <Container.Promo class="col-12 col-md-4" @productName="Product" @vertical={{true}}>
            <:img>
              <img
                src="https://place-hold.it/400x150"
                alt="Placeholder"
                class="rounded d-flex mb-3 w-100"
              />
            </:img>
            <:description>
              <p>Here's why you should try this product and a description of it.
                <br />
                <span class="fw-semibold">For only $15 per month</span>
                <ul class="my-3">
                  <li>Option</li>
                  <li>Option</li>
                  <li>Option</li>
                </ul>
              </p>
              <Button type="button" class="mt-2 btn bg-primary-subtle text-primary">
                Learn More
              </Button>
            </:description>
          </Container.Promo>
        </MktgPromoContainer>
      </:example>
    </Section.Subsection>
  </Section>
</template>
