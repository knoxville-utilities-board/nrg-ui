import pageTitle from 'ember-page-title/helpers/page-title';

import OnDestroyDemo from '#app/components/f/modifiers/on-destroy.gts';

<template>
  {{pageTitle "on-destroy"}}

  <div class="container mx-auto">
    <OnDestroyDemo />
  </div>
</template>
