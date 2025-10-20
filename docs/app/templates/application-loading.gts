import LoadingIndicator from '@nrg-ui/core/components/loading-indicator';
import Scaffold from '@nrg-ui/core/components/scaffold';
import pageTitle from 'ember-page-title/helpers/page-title';

<template>
  {{pageTitle "@nrg-ui/core"}}

  <Scaffold>
    <:app-bar-left as |AppBar|>
      <p class="d-none d-md-block m-0 ps-3 fs-5">
        Docs | @nrg-ui/core
      </p>
      <AppBar.Environment />
    </:app-bar-left>
    <:default>
      <div
        class="d-flex flex-column align-items-center justify-content-center mt-5"
      >
        <LoadingIndicator class="spinner-lg" />
        <h4 class="mt-3" role="status">Loading docs...</h4>
      </div>
    </:default>
  </Scaffold>
</template>
