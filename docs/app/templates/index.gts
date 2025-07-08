import { LinkTo } from '@ember/routing';
import version from '@nrg-ui/core/helpers/version';
import pageTitle from 'ember-page-title/helpers/page-title';

<template>
  {{pageTitle "Home (" (version) ")"}}

  <div class="row row-cols-1 row-cols-md-3 g-3 m-3 mt-4">
    <div class="mb-0">
      <div class="card bg-secondary-subtle text-center">
        <div class="card-body">
          <h5 class="card-title">
            <span class="align-middle">
              Components
            </span>
          </h5>
          <div class="mb-2">
          </div>
          <div class="d-grid col-8 col-md-4 mx-auto">
            <LinkTo class="btn btn-primary fw-semibold" @route="components">
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
              Marketing Components
            </span>
          </h5>
          <div class="mb-2">
          </div>
          <div class="d-grid col-8 col-md-4 mx-auto">
            <LinkTo
              class="btn btn-primary fw-semibold"
              @route="mktg-components"
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
              Helpers
            </span>
          </h5>
          <div class="mb-2">
          </div>
          <div class="d-grid col-8 col-md-4 mx-auto">
            <LinkTo class="btn btn-primary fw-semibold" @route="helpers">
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
              Modifiers
            </span>
          </h5>
          <div class="mb-2">
          </div>
          <div class="d-grid col-8 col-md-4 mx-auto">
            <LinkTo class="btn btn-primary fw-semibold" @route="modifiers">
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
              Services
            </span>
          </h5>
          <div class="mb-2">
          </div>
          <div class="d-grid col-8 col-md-4 mx-auto">
            <LinkTo class="btn btn-primary fw-semibold" @route="modifiers">
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
              Theme
            </span>
          </h5>
          <div class="mb-2">
          </div>
          <div class="d-grid col-8 col-md-4 mx-auto">
            <LinkTo class="btn btn-primary fw-semibold" @route="theme">
              Go
            </LinkTo>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
