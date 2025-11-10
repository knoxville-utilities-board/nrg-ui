import pageTitle from 'ember-page-title/helpers/page-title';

import OnClickOutsideDemo from '#app/components/f/modifiers/on-click-outside.gts';

<template>
  {{pageTitle "on-click-outside"}}

  <div class="container mx-auto">
    <OnClickOutsideDemo />
  </div>
</template>
