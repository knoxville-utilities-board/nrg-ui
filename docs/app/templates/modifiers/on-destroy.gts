import pageTitle from 'ember-page-title/helpers/page-title';

import OnDestroy from '../../components/f/modifiers/on-destroy';

<template>
  {{pageTitle "on-destroy"}}

  <div class="container mx-auto">
    <OnDestroy />
  </div>
</template>
