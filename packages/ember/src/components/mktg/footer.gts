import Component from '@glimmer/component';
import { or } from 'ember-truth-helpers';
import type { TOC } from '@ember/component/template-only';

interface FooterSectionSignature {
  Element: HTMLDivElement;
  Args: {
    isCollapsible?: boolean;
  };
  Blocks: {
    default?: [];
  };
}

interface MarketingFooterSignature {
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

class FooterSection extends Component<FooterSectionSignature> {
  get isCollapsible() {
    return this.args.isCollapsible ?? true;
  }

  <template>
    <div
      class="col row
        {{if this.isCollapsible 'row-cols-1 row-cols-md-auto' 'row-cols-auto'}}
        align-items-center gy-4 my-0"
    >
      {{yield}}
    </div>
  </template>
}

const MarketingFooterComponent: TOC<MarketingFooterSignature> = <template>
  <footer class="bg-primary text-light mt-auto p-2" ...attributes>
    <div class="container pt-0 mb-4">
      <div
        class="row row-cols-1 row-cols-md-auto justify-content-between align-items-center"
      >
        {{#if (has-block "nav")}}
          <FooterSection>
            {{yield to="nav"}}
          </FooterSection>
        {{/if}}
        {{#if (has-block "social-media")}}
          <FooterSection @isCollapsible={{false}}>
            {{yield to="social-media"}}
          </FooterSection>
        {{/if}}
      </div>
      {{#if @hasDivider}}
        <hr class="mb-0 mt-4" />
      {{/if}}
      {{#if (or (has-block "brand") (has-block "legal"))}}
        <div
          class="row row-cols-1 row-cols-md-auto justify-content-between align-items-center"
        >
          {{#if (has-block "brand")}}
            <FooterSection>
              {{yield to="brand"}}
            </FooterSection>
          {{/if}}
          {{#if (has-block "legal")}}
            <FooterSection>
              {{yield to="legal"}}
            </FooterSection>
          {{/if}}
        </div>
      {{/if}}
    </div>
  </footer>
</template>;

export default MarketingFooterComponent;
