import { LinkTo } from '@ember/routing';
import version from '@nrg-ui/core/helpers/version';
import pageTitle from 'ember-page-title/helpers/page-title';

<template>
  {{pageTitle "Components (" (version) ")"}}

  <div class="row row-cols-1 row-cols-md-3 g-3 m-3 mt-4">
    <div class="mb-0">
      <div class="card bg-secondary-subtle text-center">
        <div class="card-body">
          <h5 class="card-title">
            <span class="align-middle">
              Accordion
            </span>
          </h5>
          <div class="mb-2">
          </div>
          <div class="d-grid col-8 col-md-4 mx-auto">
            <LinkTo
              class="btn btn-primary fw-semibold"
              @route="components.accordion"
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
              Button
            </span>
          </h5>
          <div class="mb-2">
          </div>
          <div class="d-grid col-8 col-md-4 mx-auto">
            <LinkTo
              class="btn btn-primary fw-semibold"
              @route="components.button"
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
              @route="components.card"
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
              Context Menu
            </span>
          </h5>
          <div class="mb-2">
          </div>
          <div class="d-grid col-8 col-md-4 mx-auto">
            <LinkTo
              class="btn btn-primary fw-semibold"
              @route="components.context-menu"
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
              Dropdown
            </span>
          </h5>
          <div class="mb-2">
          </div>
          <div class="d-grid col-8 col-md-4 mx-auto">
            <LinkTo
              class="btn btn-primary fw-semibold"
              @route="components.dropdown"
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
              @route="components.footer"
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
              @route="components.header"
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
              Icon
            </span>
          </h5>
          <div class="mb-2">
          </div>
          <div class="d-grid col-8 col-md-4 mx-auto">
            <LinkTo
              class="btn btn-primary fw-semibold"
              @route="components.icon"
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
              Loading Indicator
            </span>
          </h5>
          <div class="mb-2">
          </div>
          <div class="d-grid col-8 col-md-4 mx-auto">
            <LinkTo
              class="btn btn-primary fw-semibold"
              @route="components.loading-indicator"
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
              Modal
            </span>
          </h5>
          <div class="mb-2">
          </div>
          <div class="d-grid col-8 col-md-4 mx-auto">
            <LinkTo
              class="btn btn-primary fw-semibold"
              @route="components.modal"
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
              Pagination
            </span>
          </h5>
          <div class="mb-2">
          </div>
          <div class="d-grid col-8 col-md-4 mx-auto">
            <LinkTo
              class="btn btn-primary fw-semibold"
              @route="components.pagination"
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
              Popover
            </span>
          </h5>
          <div class="mb-2">
          </div>
          <div class="d-grid col-8 col-md-4 mx-auto">
            <LinkTo
              class="btn btn-primary fw-semibold"
              @route="components.popover"
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
              Toaster
            </span>
          </h5>
          <div class="mb-2">
          </div>
          <div class="d-grid col-8 col-md-4 mx-auto">
            <LinkTo
              class="btn btn-primary fw-semibold"
              @route="components.toaster"
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
              Tooltip
            </span>
          </h5>
          <div class="mb-2">
          </div>
          <div class="d-grid col-8 col-md-4 mx-auto">
            <LinkTo
              class="btn btn-primary fw-semibold"
              @route="components.tooltip"
            >
              Go
            </LinkTo>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
