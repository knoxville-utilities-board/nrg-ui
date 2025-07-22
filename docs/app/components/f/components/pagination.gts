// @ts-nocheck - TODO

import { A } from '@ember/array';
import { fn } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Pagination } from '@nrg-ui/core';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

export default class PaginationDemo extends Component {
  @tracked
  start = 0;

  @tracked
  count = 25;

  @tracked
  total = 249;

  @tracked
  enablePageJump = true;

  @tracked
  showDetailedMeta = false;

  @tracked
  compact = false;

  pageSizes: number[] = A([25, 50, 100]);

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
              @defaultValue={{false}}
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
              @compact={{this.compact}}
              @meta={{this.meta}}
              @pageSizes={{this.pageSizes}}
              @showDetailedMeta={{this.showDetailedMeta}}
              @onChangePage={{fn this.update "start"}}
              @onChangePageSize={{this.changePageSize}}
            />
          </:example>
          <:api as |Args|>
            <Args.Bool
              @defaultValue={{false}}
              @description="Shorten the number of pages displayed"
              @name="compact"
              @value={{this.compact}}
              @onInput={{fn this.update "compact"}}
            />
            <Args.Number
              @description="Number of items per page"
              @name="meta.count"
              @value={{this.count}}
              @onInput={{fn this.update "count"}}
            />
            <Args.Number
              @description="Index of the first item"
              @name="meta.start"
              @value={{this.start}}
              @onInput={{fn this.update "start"}}
            />
            <Args.Number
              @description="Total number of items"
              @name="meta.total"
              @value={{this.total}}
              @onInput={{fn this.update "total"}}
            />
            <Args.Array
              @description="List of available page sizes"
              @name="pageSizes"
              @items={{this.pageSizes}}
              @type="Number"
            />
            <Args.Bool
              @defaultValue={{false}}
              @description="Show detailed meta information"
              @name="showDetailedMeta"
              @value={{this.showDetailedMeta}}
              @onInput={{fn this.update "showDetailedMeta"}}
            />
          </:api>
        </FreestyleUsage>
      </Section.subsection>
      <Section.subsection @name="Jump to Page">
        <FreestyleUsage>
          <:example>
            <Pagination
              @meta={{this.meta}}
              @enablePageJump={{this.enablePageJump}}
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
            <Args.Bool
              @defaultValue={{false}}
              @description="Enable jumping to page"
              @name="enablePageJump"
              @value={{this.enablePageJump}}
              @onInput={{fn this.update "enablePageJump"}}
            />
            <Args.Array
              @description="List of available page sizes"
              @name="pageSizes"
              @items={{this.pageSizes}}
              @type="Number"
            />
            <Args.Bool
              @defaultValue={{false}}
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

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'F::Components::Pagination': typeof PaginationDemo;
  }
}
