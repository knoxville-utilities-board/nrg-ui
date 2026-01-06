import Component from '@glimmer/component';
import { or } from 'ember-truth-helpers';

import type { TOC } from '@ember/component/template-only';

interface MktgFooterSectionSignature {
  Element: HTMLDivElement;
  Args: {
    isCollapsible?: boolean;
  };
  Blocks: {
    default?: [];
  };
}

export interface MktgFooterSignature {
  Element: HTMLElement;
  Args: {
    hasDivider?: boolean;
  };
  Blocks: {
    nav: [];
    'social-media': [];
    brand: [];
    legal: [];
  };
}

class MktgFooterSection extends Component<MktgFooterSectionSignature> {
  get isCollapsible() {
    return this.args.isCollapsible ?? true;
  }

  <template>
    <div
      class="col row
        {{if this.isCollapsible 'row-cols-1 row-cols-md-auto' 'row-cols-auto'}}
        align-items-center gy-4 my-0"
      ...attributes
    >
      {{yield}}
    </div>
  </template>
}

const MktgFooter: TOC<MktgFooterSignature> = <template>
  <footer class="mt-auto p-2" ...attributes>
    <div class="container pt-0 mb-4">
      <div class="row row-cols-1 row-cols-md-auto justify-content-between align-items-center">
        {{#if (has-block "nav")}}
          <MktgFooterSection>
            {{yield to="nav"}}
          </MktgFooterSection>
        {{/if}}
        {{#if (has-block "social-media")}}
          <MktgFooterSection
            @isCollapsible={{false}}
            class={{unless (has-block "nav") "ms-md-auto"}}
          >
            {{yield to="social-media"}}
          </MktgFooterSection>
        {{/if}}
      </div>
      {{#if @hasDivider}}
        <hr class="mb-0 mt-4" />
      {{/if}}
      {{#if (or (has-block "brand") (has-block "legal"))}}
        <div class="row row-cols-1 row-cols-md-auto justify-content-between align-items-center">
          {{#if (has-block "brand")}}
            <MktgFooterSection>
              {{yield to="brand"}}
            </MktgFooterSection>
          {{/if}}
          {{#if (has-block "legal")}}
            <MktgFooterSection class={{unless (has-block "nav") "ms-md-auto"}}>
              {{yield to="legal"}}
            </MktgFooterSection>
          {{/if}}
        </div>
      {{/if}}
    </div>
  </footer>
</template>;

export default MktgFooter;
