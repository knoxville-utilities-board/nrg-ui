import { LinkTo } from '@ember/routing';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { Pagination } from '@nrg-ui/core';
import { t } from 'ember-intl';
import { eq } from 'ember-truth-helpers';

import { classes } from '../helpers/classes.ts';

import type { Meta } from './pagination.gts';
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
    enablePagination?: boolean;
    meta?: Meta;
    onChangePage?: (start: number) => void;
    showDetailedMeta?: boolean;
  };
}

class Pane extends Component<PaneSignature> {
  @service
  declare router: RouterService;

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
      {{#if @previousRoute}}
        <div class="d-block d-md-none">
          <LinkTo
            @route={{@previousRoute}}
            class="icon-link icon-link-hover p-1"
          >
            <i class="bi bi-arrow-left"></i>
            {{t "nrg.stacked-pane.navigate-back"}}
          </LinkTo>
        </div>
      {{/if}}
      {{#if @enablePagination}}
       <div class="pagination-container mt-4">
            <Pagination
              @meta={{@meta}}
              @onChangePage={{@onChangePage}}
              @showDetailedMeta={{@showDetailedMeta}}
              @mobile={{true}}
            />
          </div>
      {{/if}}
      {{yield}}
      {{#if @enablePagination}}
       <div class="pagination-container mt-4">
            <Pagination
              @meta={{@meta}}
              @onChangePage={{@onChangePage}}
              @showDetailedMeta={{@showDetailedMeta}}
              @mobile={{true}}
            />
          </div>
      {{/if}}
    </div>
  </template>
}

export default Pane;
export { Container, Pane };
