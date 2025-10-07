import StackedPane from '@nrg-ui/core/components/stacked-pane';

import type { TOC } from '@ember/component/template-only';
import type { ContentValue } from '@glint/template';

const StackedPaneSelectedSubitem2Demo: TOC<{
  Args: { model: ContentValue };
}> = <template>
  <StackedPane
    @ratio="full"
    @previousRoute="stacked-pane.selected-item.selected-subitem"
  >
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{@model}}</h5>
      </div>
      <hr />
      <div class="card-body">
        <strong>Reading 1</strong>
        <span class="card-text">1234</span>
        <br />
        <strong>Reading 2</strong>
        <span class="card-text">2345</span>
        <br />
        <strong>Reading 3</strong>
        <span class="card-text">3456</span>
        <br />
        <strong>Reading 4</strong>
        <span class="card-text">4567</span>
      </div>
    </div>
  </StackedPane>
</template>;

export default StackedPaneSelectedSubitem2Demo;
