import { service } from '@ember/service';
import Component from '@glimmer/component';

import Button from './button.gts';

import type IntlService from 'ember-intl/services/intl';

export interface NotFoundSignature {
  Element: HTMLDivElement;
  Args: {
    url: string;
  };
}

export default class NotFound extends Component<NotFoundSignature> {
  @service
  declare intl: IntlService;

  get title() {
    return this.intl.t('nrg.not-found.title', {});
  }

  get message() {
    return this.intl.t('nrg.not-found.message', {});
  }

  <template>
    <div class="p-5 d-flex flex-column bg-white" ...attributes>
      <p class="fw-bold fs-1 m-0">
        {{this.title}}
      </p>
      <hr class="w-100" />
      <p class="fw-semibold fs-5 m-0 mb-3">
        {{this.message}}
      </p>
      <a href={{@url}}>
        <Button class="btn-primary" @text="Back to Home" />
      </a>
    </div>
  </template>
}
