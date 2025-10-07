import { LinkTo } from '@ember/routing';
import StackedPane from '@nrg-ui/core/components/stacked-pane';

import type { TOC } from '@ember/component/template-only';
import type { ContentValue } from '@glint/template';

const StackedPaneSelectedSubitemDemo: TOC<{
  Args: { model: ContentValue };
}> = <template>
  <StackedPane @previousRoute="stacked-pane.selected-item">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Address {{@model}}</h5>
        <div class="card-text">City, State Zip</div>
      </div>
      <hr />
      <div class="card-body">
        <strong>Address</strong>
        <span class="card-text">Street</span>
        <br />
        <strong>City</strong>
        <span class="card-text">City</span>
        <br />
        <strong>State</strong>
        <span class="card-text">State</span>
        <br />
        <strong>Zip</strong>
        <span class="card-text">Zip</span>
        <br />
        <strong>Country</strong>
        <span class="card-text">Country</span>
      </div>
      <hr />
      <div class="card-body">
        <h5 class="card-title">Services</h5>
        <ul class="list-group">
          <LinkTo
            class="list-group-item"
            @route="stacked-pane.selected-item.selected-subitem.selected-subitem-2"
            @model="Electric"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Electric</h5>
            </div>
          </LinkTo>
          <LinkTo
            class="list-group-item"
            @route="stacked-pane.selected-item.selected-subitem.selected-subitem-2"
            @model="Water"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Water</h5>
            </div>
          </LinkTo>
          <LinkTo
            class="list-group-item"
            @route="stacked-pane.selected-item.selected-subitem.selected-subitem-2"
            @model="Gas"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Gas</h5>
            </div>
          </LinkTo>
        </ul>
      </div>
    </div>
  </StackedPane>

  {{outlet}}
</template>;

export default StackedPaneSelectedSubitemDemo;
