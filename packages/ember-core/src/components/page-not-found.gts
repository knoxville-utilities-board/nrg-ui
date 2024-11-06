import { t } from 'ember-intl';

import Button from './button.gts';

import type { TOC } from '@ember/component/template-only';

export interface PageNotFoundSignature {
  Element: HTMLDivElement;
  Args: {
    url: string;
  };
}

const PageNotFound: TOC<PageNotFoundSignature> = <template>
  <div class="p-5 d-flex flex-column bg-body" ...attributes>
    <p class="fw-bold fs-1 m-0">
      {{t "nrg.page-not-found.title"}}
    </p>
    <hr class="w-100" />
    <p class="fw-semibold fs-5 m-0 mb-3">
      {{t "nrg.page-not-found.message"}}
    </p>
    {{#if @url}}
      <a href={{@url}}>
        <Button class="btn-primary" @text="Back to Home" />
      </a>
    {{/if}}
  </div>
</template>;

export default PageNotFound;
