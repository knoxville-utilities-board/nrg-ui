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
        align-items-center gx-3 gy-4 gx-md-4 my-0"
    >
      {{yield}}
    </div>
  </template>
}

const MarketingFooterComponent: TOC<MarketingFooterSignature> = <template>
  <footer class="bg-primary text-light mt-auto" ...attributes>
    <div class="container p-5">
      <div
        class="row row-cols-1 row-cols-md-auto justify-content-between align-items-center"
      >
        <FooterSection>
          {{yield to="nav"}}
        </FooterSection>
        <FooterSection @isCollapsible={{false}}>
          {{yield to="social-media"}}
        </FooterSection>
      </div>
      {{#if @hasDivider}}
        <hr class="mb-0 mt-3" />
      {{/if}}
      {{#if (or (has-block "brand") (has-block "legal"))}}
        <div
          class="row row-cols-1 row-cols-md-auto justify-content-between align-items-center mt-0"
        >
          <FooterSection>
            {{yield to="brand"}}
          </FooterSection>
          <FooterSection>
            {{yield to="legal"}}
          </FooterSection>
        </div>
      {{/if}}
    </div>
  </footer>
</template>

export default MarketingFooterComponent
