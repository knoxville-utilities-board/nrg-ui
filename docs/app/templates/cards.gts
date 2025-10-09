import Button from '@nrg-ui/core/components/button';
import MktgCardContainer from '@nrg-ui/core/components/mktg/card-container';

<template>
  <div data-theme="marketing" class="container">
    <p class="py-3 fw-bold">
      Row on desktop, stacked on mobile
    </p>
    {{! template-lint-disable no-inline-styles }}
    <MktgCardContainer style="--bs-gap: .5rem;" as |Container|>
      <Container.Card
        @isClickable={{true}}
        @hasBorder={{false}}
        class="g-col-12 g-col-md-4"
      >
        <:header>
          <p>
            This card has hasBorder param false
          </p>
        </:header>
        <:body>
          <p>
            Here is some body content
          </p>
        </:body>
      </Container.Card>
      <Container.Card @isClickable={{true}} class="g-col-12 g-col-md-4">
        <:header>
          <p>
            Here is a title
          </p>
        </:header>
        <:body>
          <p>
            Here is some body content
          </p>
        </:body>
      </Container.Card>
      <Container.Card @isClickable={{true}} class="g-col-12 g-col-md-4">
        <:header>
          <p>
            Here is a title
          </p>
        </:header>
        <:body>
          <p>
            Here is some body content
          </p>
        </:body>
      </Container.Card>
    </MktgCardContainer>
    <div class="container">
      <p class="pt-3 fw-bold">
        Vertical card with right aligned price and hasBorder param false
      </p>
      <MktgCardContainer class="justify-content-center" as |Container|>
        <Container.MktgCard
          class="g-col-12"
          @title="The Gig"
          @subtitle="Experience lightning-fast internet connectivity"
          @hasBorder={{false}}
        >
          <:start>
            <div class="d-flex w-100 align-items-start">
              <p>
                Start Section can go here if you'd like
              </p>
            </div>
          </:start>
          <:callout>
            <p
              class="d-flex align-self-start align-self-md-center fs-1 fw-bold m-0"
            >
              &dollar;315
              <span class="fs-5 align-self-end mb-2">
                /mo
              </span>
            </p>
          </:callout>
          <:end>
            <p class="card-text mt-2">
              Includes:
            </p>
            <div class="container">
              <div class="row row-cols-2">
                <p class="col-12 col-md-6">
                  <span class="me-2 fw-bold">
                    &#x2713;
                  </span>
                  Cool feature
                </p>
                <p class="col-12 col-md-6">
                  <span class="me-2 fw-bold">
                    &#x2713;
                  </span>
                  Cool feature
                </p>
                <p class="col-12 col-md-6">
                  <span class="me-2 fw-bold">
                    &#x2713;
                  </span>
                  Cool feature
                </p>
                <p class="col-12 col-md-6">
                  <span class="me-2 fw-bold">
                    &#x2713;
                  </span>
                  Cool feature
                </p>
              </div>
            </div>
            <Button @text="Add to Bundle" class="btn-primary w-100 mt-2" />
          </:end>
        </Container.MktgCard>
      </MktgCardContainer>
      <p class="pt-3 fw-bold">
        Vertical card with left aligned price
      </p>
      <MktgCardContainer class="justify-content-center" as |Container|>
        <Container.MktgCard
          class="g-col-12"
          @title="The Gig"
          @subtitle="Experience lightning-fast internet connectivity"
          @leftAlignCallout={{true}}
        >
          <:callout>
            <p class="d-flex fs-1 fw-bold m-0">
              &dollar;300/mo
            </p>
          </:callout>
          <:end>
            <p class="card-text mt-2">
              Includes:
            </p>
            <div class="container">
              <div class="row row-cols-2">
                <p class="col-12 col-md-6">
                  <span class="me-2 fw-bold">
                    &#x2713;
                  </span>
                  Cool feature
                </p>
                <p class="col-12 col-md-6">
                  <span class="me-2 fw-bold">
                    &#x2713;
                  </span>
                  Cool feature
                </p>
                <p class="col-12 col-md-6">
                  <span class="me-2 fw-bold">
                    &#x2713;
                  </span>
                  Cool feature
                </p>
                <p class="col-12 col-md-6">
                  <span class="me-2 fw-bold">
                    &#x2713;
                  </span>
                  Cool feature
                </p>
              </div>
            </div>
            <Button @text="Add to Bundle" class="btn-primary w-100 mt-2" />
          </:end>
        </Container.MktgCard>
      </MktgCardContainer>
    </div>

    <div class="container">
      <p class="pt-3 fw-bold">
        Horizontal card
      </p>
      <MktgCardContainer as |Container|>
        <Container.MktgCard
          @title="The Gig 10"
          @horizontal={{true}}
          class="g-col-12"
        >
          <:callout>
            <p class="card-title d-flex align-self-start fs-1 fw-bold m-0 pb-2">
              &dollar;300/mo
            </p>
          </:callout>
          <:start>
            <p class="card-text text-body-secondary">
              Stream multiple 4k videos, download large files in seconds, and
              dominate online gaming like never before.
            </p>
            <Button
              @text="Get Started"
              class="bg-primary text-white w-100 mt-2"
            />
          </:start>
          <:end>
            <p class="card-text mt-2">
              Includes:
            </p>
            <div class="container">
              <div class="row">
                <p class="col-12">
                  <span class="me-2 fw-bold">
                    &#x2713;
                  </span>
                  Cool feature
                </p>
                <p class="col-12">
                  <span class="me-2 fw-bold">
                    &#x2713;
                  </span>
                  Cool feature
                </p>
                <p class="col-12">
                  <span class="me-2 fw-bold">
                    &#x2713;
                  </span>
                  Cool feature
                </p>
                <p class="col-12">
                  <span class="me-2 fw-bold">
                    &#x2713;
                  </span>
                  Cool feature
                </p>
              </div>
            </div>
          </:end>
        </Container.MktgCard>
      </MktgCardContainer>
    </div>
    <div class="p-5"></div>
  </div>
</template>
