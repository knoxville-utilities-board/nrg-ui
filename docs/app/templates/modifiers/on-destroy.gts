import pageTitle from 'ember-page-title/helpers/page-title';

import OnDestroyDemo from '../../components/f/modifiers/on-destroy.ts';

<template>
  {{pageTitle "on-destroy"}}

  <div class="container mx-auto">
    <OnDestroyDemo />
  </div>
</template>
