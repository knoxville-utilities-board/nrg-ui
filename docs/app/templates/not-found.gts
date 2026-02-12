import PageNotFound from '@nrg-ui/core/components/page-not-found';
import { pageTitle } from 'ember-page-title';

<template>
  {{pageTitle "NotFound"}}
  <PageNotFound @url="/" />
</template>
