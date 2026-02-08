import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const columnMap = {
  1: 'g-col-lg-12',
  2: 'g-col-lg-6',
  3: 'g-col-lg-4',
  4: 'g-col-lg-3',
  6: 'g-col-lg-2',
  12: 'g-col-lg-1'
};
const MktgFeature = setComponentTemplate(precompileTemplate("<p class=\"align-items-baseline {{@class}}\" ...attributes>\n  <span class=\"me-2 fw-bold bi {{@icon}}\">{{@meta}}</span>{{@text}}\n</p>", {
  strictMode: true
}), templateOnly());
class MktgFeatureList extends Component {
  get classList() {
    const {
      columns
    } = this.args;
    if (columns === 1) {
      return 'g-col-12';
    } else {
      return `g-col-12 g-col-md-6 ${columnMap[columns]}`;
    }
  }
  static {
    setComponentTemplate(precompileTemplate("{{yield to=\"label\"}}\n<div class=\"grid mt-4 mb-2\">\n  {{yield (component MktgFeature class=this.classList) to=\"features\"}}\n</div>", {
      strictMode: true,
      scope: () => ({
        MktgFeature
      })
    }), this);
  }
}

export { MktgFeatureList as default };
//# sourceMappingURL=feature-list.js.map
