import Footer from '@nrg-ui/core/components/footer';
import Section from '@nrg-ui/showcase/components/section';

<template>
  <Section @name="Footer" as |Section|>
    <Section.Subsection @name="Basics" @model={{this}} @elementTag="footer">
      <:example>
        <Footer>
          <:left>
            Left section
          </:left>
          <:right>
            Right Section
          </:right>
        </Footer>
      </:example>
      <:api as |Api|>
        <Api.Blocks as |Block|>
          <Block
            @description="Named yield block that renders content in the left of the footer"
            @name="left"
          />
          <Block
            @description="Named yield block that renders content on the right side of the footer"
            @name="right"
          />
        </Api.Blocks>
      </:api>
    </Section.Subsection>
  </Section>
</template>
