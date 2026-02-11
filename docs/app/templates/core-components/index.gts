import { LinkTo } from '@ember/routing';
import version from '@nrg-ui/core/helpers/version';
import pageTitle from 'ember-page-title/helpers/page-title';

const componentFiles = import.meta.glob('./*.gts');

const componentMap = Object.keys(componentFiles)
  .map((path) => path.replace('./', '').replace('.gts', ''))
  .filter((routeName) => routeName !== 'index')
  .map((routeName) => ({
    route: `core-components.${routeName}`,
    label: routeName
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' '),
  }));

<template>
  {{pageTitle "Components (" (version) ")"}}

  <div class="row row-cols-1 row-cols-md-3 g-3 m-3 mt-4">
    {{#each componentMap as |nrgComponent|}}
      <div class="mb-0">
        <div class="card bg-secondary-subtle text-center">
          <div class="card-body">
            <h5 class="card-title">
              <span class="align-middle">
                {{nrgComponent.label}}
              </span>
            </h5>
            <div class="mb-2">
            </div>
            <div class="d-grid col-8 col-md-4 mx-auto">
              <LinkTo class="btn btn-primary fw-semibold" @route={{nrgComponent.route}}>
                Go
              </LinkTo>
            </div>
          </div>
        </div>
      </div>
    {{/each}}
  </div>
</template>
