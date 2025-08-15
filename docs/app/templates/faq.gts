import Button from '@nrg-ui/core/components/button';
import MktgFaq from '@nrg-ui/core/components/mktg/faq';
import MktgSectionHeader from '@nrg-ui/core/components/mktg/section-header';
import { pageTitle } from 'ember-page-title';

<template>
  {{pageTitle "FAQs"}}

  <main data-theme="marketing" class="bg-primary-subtle vh-100 text-primary">
    <div class="container p-5">
      <div class="row">
        <MktgSectionHeader
          class="col-12 col-lg-6"
          @title="We're here to answer all of your questions!"
          @subject="FAQs"
        >
          <:subheader>
            <div class="d-flex justify-content-center mb-4">
              <Button type="button" class="mx-2 mt-2 btn btn-primary">
                Contact Us
              </Button>
              <Button type="button" class="mx-2 mt-2 btn text-primary">
                Or call (865)111-2323
              </Button>
            </div>
          </:subheader>
        </MktgSectionHeader>
      </div>
      <MktgFaq @defaultOpen={{true}} @question="How does a FAQ Component work?">
        <:answer>
          <p>
            Once you click the icon in the upper right corner, this answer will
            appear. Pass values into the Open, Question, and Answer parameters,
            and voila! Pretty neat!
          </p>
        </:answer>
      </MktgFaq>
      <MktgFaq @question="Question?">
        <:answer>
          <p>
            Answer
          </p>
        </:answer>
      </MktgFaq>
      <MktgFaq @question="Question?">
        <:answer>
          <p>
            Answer
          </p>
        </:answer>
      </MktgFaq>
      <MktgFaq @question="Question?">
        <:answer>
          <p>
            Answer
          </p>
        </:answer>
      </MktgFaq>
      <MktgFaq @question="Question?">
        <:answer>
          <p>
            Answer
          </p>
        </:answer>
      </MktgFaq>
    </div>
  </main>
</template>
