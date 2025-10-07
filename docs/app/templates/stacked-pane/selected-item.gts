import { LinkTo } from '@ember/routing';
import StackedPane from '@nrg-ui/core/components/stacked-pane';

import type { TOC } from '@ember/component/template-only';
import type { ContentValue } from '@glint/template';

const StackedPaneSelectedItemDemo: TOC<{
  Args: { model: ContentValue };
}> = <template>
  <StackedPane @previousRoute="stacked-pane">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Account {{@model}}</h5>
        <div class="card-text">Person Name</div>
      </div>
      <hr />
      <div class="card-body">
        <strong>Email</strong>
        <span class="card-text">person@example.mail</span>
        <br />
        <strong>Phone</strong>
        <span class="card-text">987-654-3210</span>
        <br />
        <strong>Person Id</strong>
        <span class="card-text">1123581321</span>
        <br />
        <strong>Billing Cycle</strong>
        <span class="card-text">01</span>
        <br />
        <strong>Country</strong>
        <span class="card-text">Country</span>
      </div>
      <hr />
      <div class="card-body">

        <ul class="list-group">
          <LinkTo
            class="list-group-item"
            @route="stacked-pane.selected-item.selected-subitem"
            @model={{6}}
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Address 6</h5>
            </div>
            <p class="mb-1">City, State Zip</p>
          </LinkTo>
          <LinkTo
            class="list-group-item"
            @route="stacked-pane.selected-item.selected-subitem"
            @model={{7}}
          >

            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Address 7</h5>
            </div>
            <p class="mb-1">City, State Zip</p></LinkTo>
          <LinkTo
            class="list-group-item"
            @route="stacked-pane.selected-item.selected-subitem"
            @model={{8}}
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Address 8</h5>
            </div>
            <p class="mb-1">City, State Zip</p></LinkTo>
          <LinkTo
            class="list-group-item"
            @route="stacked-pane.selected-item.selected-subitem"
            @model={{9}}
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Address 9</h5>
            </div>
            <p class="mb-1">City, State Zip</p></LinkTo>
          <LinkTo
            class="list-group-item"
            @route="stacked-pane.selected-item.selected-subitem"
            @model={{10}}
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Address 10</h5>
            </div>
            <p class="mb-1">City, State Zip</p></LinkTo>
        </ul>
      </div>
    </div>
  </StackedPane>
  {{outlet}}
</template>;

export default StackedPaneSelectedItemDemo;
