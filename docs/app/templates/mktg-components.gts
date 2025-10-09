import pageTitle from 'ember-page-title/helpers/page-title';

<template>
  {{pageTitle "Marketing Components"}}
  <div class="row">
    <div class="col py-3">
      {{outlet}}
    </div>
  </div>
</template>
