import Component from '@glimmer/component';

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';

const columnMap = {
  1: 'g-col-lg-12',
  2: 'g-col-lg-6',
  3: 'g-col-lg-4',
  4: 'g-col-lg-3',
  6: 'g-col-lg-2',
  12: 'g-col-lg-1',
};

export interface MktgFeatureSignature {
  Args: {
    icon?: string;
    text?: string;
    meta?: string;
    class: string;
  };
  Element: HTMLParagraphElement;
}

export interface MktgFeatureListSignature {
  Element: HTMLDivElement;
  Blocks: {
    features: [ComponentLike<MktgFeatureSignature>];
    label: [];
    default?: [];
  };
  Args: {
    columns: keyof typeof columnMap;
  };
}

const Feature: TOC<MktgFeatureSignature> = <template>
  {{#if @alphaNumeric}}
    <p class="{{@class}}" ...attributes>
      <span class="me-2 fw-bold bi {{@icon}}">{{@meta}}</span>{{@text}}
    </p>
  {{else}}
    <p class="{{@class}}" ...attributes>
      <span class="me-2 mt-1 fw-bold bi {{@icon}}">{{@meta}}</span>{{@text}}
    </p>
  {{/if}}
</template>;

export default class MktgFeatureList extends Component<MktgFeatureListSignature> {
  get classList() {
    const { columns } = this.args;
    if (columns === 1) {
      return 'g-col-12';
    } else {
      return `g-col-12 g-col-md-6 ${columnMap[columns]}`;
    }
  }

  <template>
    {{yield to="label"}}
    <div class="grid mt-4 mb-2">
      {{yield (component Feature class=this.classList) to="features"}}
    </div>
  </template>
}
