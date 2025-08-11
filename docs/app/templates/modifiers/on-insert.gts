import pageTitle from 'ember-page-title/helpers/page-title';

import OnInsert from '../../components/f/modifiers/on-insert';

<template>
  {{pageTitle "on-insert"}}

  <div class="container mx-auto">
    <OnInsert />
  </div>
</template>
