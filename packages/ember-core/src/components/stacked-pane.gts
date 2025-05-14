import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { classes } from '@nrg-ui/core';
import { t } from 'ember-intl';
import { eq } from 'ember-truth-helpers';

import Button from './button.gts';

import type { TOC } from '@ember/component/template-only';
import type RouterService from '@ember/routing/router-service';

export interface ContainerSignature {
  Element: HTMLElement;
  Blocks: {
    default?: [];
  };
}

const Container: TOC<ContainerSignature> = <template>
  <div class="stacked-pane-container container flex-nowrap" ...attributes>
    {{yield}}
  </div>
</template>;

export interface PaneSignature {
  Element: HTMLElement;
  Blocks: {
    default?: [];
  };
  Args: {
    placeholder?: boolean;
    previousRoute?: string;
    ratio?: 'focused' | 'half' | 'full';
  };
}

class Pane extends Component<PaneSignature> {
  @service
  declare router: RouterService;

  get showBackButton() {
    return !!this.args.previousRoute;
  }

  @action
  onBackButtonClick() {
    if (!this.args.previousRoute) {
      return;
    }
    this.router.transitionTo(this.args.previousRoute);
  }

  get ratio() {
    return this.args.ratio || 'focused';
  }

  <template>
    <div
      class={{classes
        "stacked-pane p-2"
        (if (eq this.ratio "focused") "focused")
        (if (eq this.ratio "half") "half")
        (if (eq this.ratio "full") "full")
        (if @placeholder "d-none d-md-block")
      }}
      ...attributes
    >
      {{#if this.showBackButton}}
        <div class="d-block d-md-none">
          <Button
            @icon="bi-arrow-left"
            @iconPosition="left"
            @onClick={{this.onBackButtonClick}}
          >
            {{t "nrg.stacked-pane.navigate-back"}}
          </Button>
        </div>
      {{/if}}
      {{yield}}
    </div>
  </template>
}

export default Pane;
export { Container, Pane };
