import Section from '@nrg-ui/showcase/components/section';
import pageTitle from 'ember-page-title/helpers/page-title';

<template>
  {{pageTitle "Showcase"}}

  <div class="row g-0">
    <div class="col px-md-0 py-3">
      <div class="container mx-auto">
        <Section @name="Section Title" as |Section|>
          <Section.Subsection @name="Subsection Title">
            <p>Your content goes here</p>
          </Section.Subsection>
        </Section>
      </div>
    </div>
  </div>
</template>
