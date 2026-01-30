import { LinkTo } from '@ember/routing';
import version from '@nrg-ui/core/helpers/version';
import pageTitle from 'ember-page-title/helpers/page-title';

const componentMap = [
  {
    name: 'Accordion',
    route: 'core-components.accordion',
  },
  {
    name: 'Alert',
    route: 'core-components.alert',
  },
  {
    name: 'Button',
    route: 'core-components.button',
  },
  {
    name: 'Card',
    route: 'core-components.card',
  },
  {
    name: 'Context Menu',
    route: 'core-components.context-menu',
  },
  {
    name: 'Dropdown',
    route: 'core-components.dropdown',
  },
  {
    name: 'Footer',
    route: 'core-components.footer',
  },
  {
    name: 'Header',
    route: 'core-components.header',
  },
  {
    name: 'Icon',
    route: 'core-components.icon',
  },
  {
    name: 'Loading Indicator',
    route: 'core-components.loading-indicator',
  },
  {
    name: 'Modal',
    route: 'core-components.modal',
  },
  {
    name: 'Pagination',
    route: 'core-components.pagination',
  },
  {
    name: 'Popover',
    route: 'core-components.popover',
  },
  {
    name: 'Progress',
    route: 'core-components.progress',
  },
  {
    name: 'Toaster',
    route: 'core-components.toaster',
  },
  {
    name: 'Tooltip',
    route: 'core-components.tooltip',
  },
];

<template>
  {{pageTitle "Components (" (version) ")"}}

  <div class="row row-cols-1 row-cols-md-3 g-3 m-3 mt-4">

    {{#each componentMap as |component|}}
      <div class="mb-0">
        <div class="card bg-secondary-subtle text-center">
          <div class="card-body">
            <h5 class="card-title">
              <span class="align-middle">
                {{component.name}}
              </span>
            </h5>
            <div class="mb-2">
            </div>
            <div class="d-grid col-8 col-md-4 mx-auto">
              <LinkTo class="btn btn-primary fw-semibold" @route={{component.route}}>
                Go
              </LinkTo>
            </div>
          </div>
        </div>
      </div>
    {{/each}}
  </div>
</template>
