import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';

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
  Element: HTMLDivElement;
  Args: {
    hasHorizontalLine?: boolean;
  };
  Blocks: {
    topLeftSection: [ComponentLike<FooterSection>];
    topRightSection: [ComponentLike<FooterSection>];
    bottomLeftSection: [ComponentLike<FooterSection>];
    bottomRightSection: [ComponentLike<FooterSection>];
    default?: [];
  };
}

class FooterSection extends Component<FooterSectionSignature> {
  get isCollapsible() {
    return this.args.isCollapsible ?? false;
  }

  <template>
    <div class="col">
      <div
        class="row
          {{if
            this.isCollapsible
            'row-cols-1 row-cols-md-auto'
            'row-cols-auto'
          }}
          align-items-center gx-3 gy-4 gx-md-4"
      >
        {{yield}}
      </div>
    </div>
  </template>
}

export default class MarketingFooterComponent extends Component<MarketingFooterSignature> {
  get classList() {
    let classes = ['bg-primary', 'text-light'];

    return classes.join(' ');
  }

  get hasHorizontalLine() {
    return this.args.hasHorizontalLine ?? false;
  }

  <template>
    <footer class={{this.classList}}>
      <div class="container p-5">
        <div
          class="row row-cols-1 row-cols-md-auto justify-content-between align-items-center gx-3 gy-4 gx-md-4 gy-md-4"
        >
          {{yield (component FooterSection) to="topLeftSection"}}
          {{yield (component FooterSection) to="topRightSection"}}
        </div>
        {{#if this.hasHorizontalLine}}
          <hr class="mb-0 mt-3" />
        {{/if}}
        {{#if (has-block "bottomLeftSection")}}
          <div
            class="row row-cols-1 row-cols-md-auto justify-content-between align-items-center gx-3 gy-4 gx-md-4 gy-md-4 mt-0"
          >
            {{yield (component FooterSection) to="bottomLeftSection"}}
            {{yield (component FooterSection) to="bottomRightSection"}}
          </div>
        {{/if}}
      </div>
    </footer>
  </template>
}
