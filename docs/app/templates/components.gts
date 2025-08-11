import pageTitle from 'ember-page-title/helpers/page-title';

<template>
  {{pageTitle "Components"}}

  <div class="row g-0">
    <div class="col px-md-0 py-3">
      {{outlet}}
    </div>
  </div>
</template>
