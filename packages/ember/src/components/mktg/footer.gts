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
            'row-cols-1 row-cols-lg-auto'
            'row-cols-auto'
          }}
          align-items-center"
      >
        {{yield}}
      </div>
    </div>
  </template>
}

export default class MarketingFooterComponent extends Component<MarketingFooterSignature> {
  get classList() {
    let classes = ['container', 'p-5'];

    return classes.join(' ');
  }

  get hasHorizontalLine() {
    return this.args.hasHorizontalLine ?? false;
  }

  <template>
    <footer class="bg-primary text-light">
      <div class={{this.classList}}>
        <div
          class="row row-cols-1 row-cols-lg-auto justify-content-between align-items-center"
        >
          {{yield (component FooterSection) to="topLeftSection"}}
          {{yield (component FooterSection) to="topRightSection"}}
        </div>
        {{#if this.hasHorizontalLine}}
          <hr />
        {{/if}}
        <div
          class="row row-cols-1 row-cols-lg-auto justify-content-between align-items-center"
        >
          {{yield (component FooterSection) to="bottomLeftSection"}}
          {{yield (component FooterSection) to="bottomRightSection"}}
        </div>
      </div>
    </footer>
  </template>
}
