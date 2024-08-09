import Component from '@glimmer/component';

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';

const columnMap = {
  1: 'g-col-12',
  2: 'g-col-6',
  3: 'g-col-4',
  4: 'g-col-3',
  6: 'g-col-2',
  12: 'g-col-1',
};

interface FeatureSignature {
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
    features: [ComponentLike<typeof Feature>];
    label: [];
    default?: [];
  };
  Args: {
    columns: keyof typeof columnMap;
  };
}

const Feature: TOC<FeatureSignature> = <template>
  <p class={{@class}} ...attributes>
    <span class="me-2 fw-bold bi {{@icon}}">{{@meta}}</span>{{@text}}
  </p>
</template>;

export default class MktgFeatureList extends Component<MktgFeatureListSignature> {
  get classList() {
    const { columns } = this.args;
    return columnMap[columns] || 'g-col-6';
  }
  <template>
    {{yield to="label"}}
    <div class="grid">
      {{yield (component Feature class=this.classList) to="features"}}
    </div>
  </template>
}
