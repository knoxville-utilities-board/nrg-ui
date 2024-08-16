import { service } from '@ember/service';
import Component from '@glimmer/component';

import ResponsiveService from '../../services/responsive.ts';

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
  <p class="g-col-12 {{@class}}" ...attributes>
    <span class="me-2 fw-bold bi {{@icon}}">{{@meta}}</span>{{@text}}
  </p>
</template>;

export default class MktgFeatureList extends Component<MktgFeatureListSignature> {
  @service
  declare responsive: ResponsiveService;

  get classList() {
    const { columns } = this.args;
    if (this.responsive.isMobileDevice) {
      return 'g-col-12';
    } else if (this.responsive.isTabletScreen && columns !== 1) {
      return 'g-col-6';
    } else if (columns > 2) {
      return `g-col-md-6 ${columnMap[columns]}` || 'g-col-md-6';
    }
    return columnMap[columns] || 'g-col-md-6';
  }

  <template>
    {{yield to="label"}}
    <div class="grid mt-4 mb-2">
      {{yield (component Feature class=this.classList) to="features"}}
    </div>
  </template>
}
