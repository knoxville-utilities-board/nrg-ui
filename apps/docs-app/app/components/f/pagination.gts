import { fn } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Pagination } from '@nrg-ui/core';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';
import { TrackedArray } from 'tracked-built-ins';

export default class extends Component {
  @tracked
  start = 0;

  @tracked
  count = 25;

  @tracked
  total = 249;

  @tracked
  showDetailedMeta = false;

  pageSizes = new TrackedArray([25, 50, 100]);

  get meta() {
    return {
      start: this.start,
      count: this.count,
      total: this.total,
    };
  }

  @action
  update(key: string, value: unknown) {
    this[key] = value;
  }

  @action
  changePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.start = 0;
    this.count = pageSize;
  }

  <template>
    <FreestyleSection @name="Pagination" as |Section|>
      <Section.subsection @name="Basics">
        <FreestyleUsage>
          <:example>
            <Pagination
              @meta={{this.meta}}
              @showDetailedMeta={{this.showDetailedMeta}}
              @onChangePage={{fn this.update "start"}}
            />
          </:example>
          <:api as |Args|>
            <Args.Number
              @description="Index of the first item"
              @name="meta.start"
              @value={{this.start}}
              @onInput={{fn this.update "start"}}
            />
            <Args.Number
              @description="Number of items per page"
              @name="meta.count"
              @value={{this.count}}
              @onInput={{fn this.update "count"}}
            />
            <Args.Number
              @description="Total number of items"
              @name="meta.total"
              @value={{this.total}}
              @onInput={{fn this.update "total"}}
            />
            <Args.Bool
              @description="Show detailed meta information"
              @name="showDetailedMeta"
              @value={{this.showDetailedMeta}}
              @onInput={{fn this.update "showDetailedMeta"}}
            />
          </:api>
        </FreestyleUsage>
      </Section.subsection>
      <Section.subsection @name="Advanced">
        <FreestyleUsage>
          <:example>
            <Pagination
              @meta={{this.meta}}
              @pageSizes={{this.pageSizes}}
              @showDetailedMeta={{this.showDetailedMeta}}
              @onChangePage={{fn this.update "start"}}
              @onChangePageSize={{this.changePageSize}}
            />
          </:example>
          <:api as |Args|>
            <Args.Number
              @description="Index of the first item"
              @name="meta.start"
              @value={{this.start}}
              @onInput={{fn this.update "start"}}
            />
            <Args.Number
              @description="Number of items per page"
              @name="meta.count"
              @value={{this.count}}
              @onInput={{fn this.update "count"}}
            />
            <Args.Number
              @description="Total number of items"
              @name="meta.total"
              @value={{this.total}}
              @onInput={{fn this.update "total"}}
            />
            <Args.Array
              @description="Show detailed meta information"
              @name="pageSizes"
              @items={{this.pageSizes}}
              @type="Number"
              @onInput={{fn this.update "pageSizes"}}
            />
            <Args.Bool
              @description="Show detailed meta information"
              @name="showDetailedMeta"
              @value={{this.showDetailedMeta}}
              @onInput={{fn this.update "showDetailedMeta"}}
            />
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}
