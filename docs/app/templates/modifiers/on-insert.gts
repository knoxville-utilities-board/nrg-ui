import pageTitle from 'ember-page-title/helpers/page-title';

import OnInsertDemo from '#app/components/f/modifiers/on-insert.gts';

<template>
  {{pageTitle "on-insert"}}

  <div class="container mx-auto">
    <OnInsertDemo />
  </div>
</template>
