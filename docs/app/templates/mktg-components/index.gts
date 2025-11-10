import { LinkTo } from '@ember/routing';
import version from '@nrg-ui/core/helpers/version';
import pageTitle from 'ember-page-title/helpers/page-title';

<template>
  {{pageTitle "Marketing Components (" (version) ")"}}

  <div class="row row-cols-1 row-cols-md-3 g-3 m-3 mt-4">
    <div class="mb-0">
      <div class="card bg-secondary-subtle text-center">
        <div class="card-body">
          <h5 class="card-title">
            <span class="align-middle">
              Card Container
            </span>
          </h5>
          <div class="mb-2">
          </div>
          <div class="d-grid col-8 col-md-4 mx-auto">
            <LinkTo
              class="btn btn-primary fw-semibold"
              @route="mktg-components.card-container"
            >
              Go
            </LinkTo>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-0">
      <div class="card bg-secondary-subtle text-center">
        <div class="card-body">
          <h5 class="card-title">
            <span class="align-middle">
              Card
            </span>
          </h5>
          <div class="mb-2">
          </div>
          <div class="d-grid col-8 col-md-4 mx-auto">
            <LinkTo
              class="btn btn-primary fw-semibold"
              @route="mktg-components.card"
            >
              Go
            </LinkTo>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-0">
      <div class="card bg-secondary-subtle text-center">
        <div class="card-body">
          <h5 class="card-title">
            <span class="align-middle">
              Footer
            </span>
          </h5>
          <div class="mb-2">
          </div>
          <div class="d-grid col-8 col-md-4 mx-auto">
            <LinkTo
              class="btn btn-primary fw-semibold"
              @route="mktg-components.footer"
            >
              Go
            </LinkTo>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-0">
      <div class="card bg-secondary-subtle text-center">
        <div class="card-body">
          <h5 class="card-title">
            <span class="align-middle">
              Navbar
            </span>
          </h5>
          <div class="mb-2">
          </div>
          <div class="d-grid col-8 col-md-4 mx-auto">
            <LinkTo
              class="btn btn-primary fw-semibold"
              @route="mktg-components.navbar"
            >
              Go
            </LinkTo>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-0">
      <div class="card bg-secondary-subtle text-center">
        <div class="card-body">
          <h5 class="card-title">
            <span class="align-middle">
              Header
            </span>
          </h5>
          <div class="mb-2">
          </div>
          <div class="d-grid col-8 col-md-4 mx-auto">
            <LinkTo
              class="btn btn-primary fw-semibold"
              @route="mktg-components.header"
            >
              Go
            </LinkTo>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-0">
      <div class="card bg-secondary-subtle text-center">
        <div class="card-body">
          <h5 class="card-title">
            <span class="align-middle">
              Promo Container
            </span>
          </h5>
          <div class="mb-2">
          </div>
          <div class="d-grid col-8 col-md-4 mx-auto">
            <LinkTo
              class="btn btn-primary fw-semibold"
              @route="mktg-components.promo-container"
            >
              Go
            </LinkTo>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-0">
      <div class="card bg-secondary-subtle text-center">
        <div class="card-body">
          <h5 class="card-title">
            <span class="align-middle">
              Promo
            </span>
          </h5>
          <div class="mb-2">
          </div>
          <div class="d-grid col-8 col-md-4 mx-auto">
            <LinkTo
              class="btn btn-primary fw-semibold"
              @route="mktg-components.promo"
            >
              Go
            </LinkTo>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-0">
      <div class="card bg-secondary-subtle text-center">
        <div class="card-body">
          <h5 class="card-title">
            <span class="align-middle">
              Section Header
            </span>
          </h5>
          <div class="mb-2">
          </div>
          <div class="d-grid col-8 col-md-4 mx-auto">
            <LinkTo
              class="btn btn-primary fw-semibold"
              @route="mktg-components.section-header"
            >
              Go
            </LinkTo>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-0">
      <div class="card bg-secondary-subtle text-center">
        <div class="card-body">
          <h5 class="card-title">
            <span class="align-middle">
              Service Pricing
            </span>
          </h5>
          <div class="mb-2">
          </div>
          <div class="d-grid col-8 col-md-4 mx-auto">
            <LinkTo
              class="btn btn-primary fw-semibold"
              @route="mktg-components.service-pricing"
            >
              Go
            </LinkTo>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
