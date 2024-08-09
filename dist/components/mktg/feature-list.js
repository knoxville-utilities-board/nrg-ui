import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const columnMap = {
  1: 'g-col-12',
  2: 'g-col-6',
  3: 'g-col-4',
  4: 'g-col-3',
  6: 'g-col-2',
  12: 'g-col-1'
};
const Feature = setComponentTemplate(precompileTemplate("\n  <p class={{@class}} ...attributes>\n    <span class=\"me-2 fw-bold bi {{@icon}}\">{{@meta}}</span>{{@text}}\n  </p>\n", {
  strictMode: true
}), templateOnly());
class MktgFeatureList extends Component {
  get classList() {
    const {
      columns: columns1
    } = this.args;
    return columnMap[columns1] || 'g-col-6';
  }
  static {
    setComponentTemplate(precompileTemplate("\n    {{yield to=\"label\"}}\n    <div class=\"grid\">\n      {{yield (component Feature class=this.classList) to=\"features\"}}\n    </div>\n  ", {
      strictMode: true,
      scope: () => ({
        Feature
      })
    }), this);
  }
}

export { MktgFeatureList as default };
//# sourceMappingURL=feature-list.js.map
