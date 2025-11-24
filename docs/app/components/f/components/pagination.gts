import { A } from '@ember/array';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Pagination from '@nrg-ui/core/components/pagination';
import Section from '@nrg-ui/showcase/components/section';

export default class PaginationDemo extends Component {
  @tracked
  start = 0;

  @tracked
  count = 25;

  @tracked
  total = 500;

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
  changePage(start: number) {
    this.start = start;
  }

  @action
  changePageSize(pageSize: number) {
    this.start = 0;
    this.count = pageSize;
  }

  <template>
    <Section @name="Pagination" as |Section|>
      <Section.Subsection @name="Basics" @model={{this}} @elementTag="ul">
        <:example as |model|>
          <Pagination
            @meta={{model.meta}}
            @showDetailedMeta={{model.showDetailedMeta}}
            @onChangePage={{model.changePage}}
          />
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.Number
              @description="Index of the first item"
              @name="meta.start"
            />
            <Args.Number
              @description="Number of items per page"
              @name="meta.count"
            />
            <Args.Number
              @description="Total number of items"
              @name="meta.total"
            />
            <Args.Boolean
              @defaultValue={{false}}
              @description="Show detailed meta information"
              @name="showDetailedMeta"
            />
          </Api.Arguments>
        </:api>
      </Section.Subsection>
      <Section.Subsection @name="Advanced" @model={{this}} @elementTag="ul">
        <:example as |model|>
          <Pagination
            @compact={{model.compact}}
            @meta={{model.meta}}
            @pageSizes={{model.pageSizes}}
            @showDetailedMeta={{model.showDetailedMeta}}
            @onChangePage={{model.changePage}}
            @onChangePageSize={{model.changePageSize}}
          />
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.Boolean
              @defaultValue={{false}}
              @description="Shorten the number of pages displayed"
              @name="compact"
            />
            <Args.Number
              @description="Number of items per page"
              @name="meta.count"
            />
            <Args.Number
              @description="Index of the first item"
              @name="meta.start"
            />
            <Args.Number
              @description="Total number of items"
              @name="meta.total"
            />
            {{! TODO }}
            {{!-- <Args.Array
              @description="List of available page sizes"
              @name="pageSizes"
              @items={{this.pageSizes}}
              @type="Number"
            /> --}}
            <Args.Boolean
              @defaultValue={{false}}
              @description="Show detailed meta information"
              @name="showDetailedMeta"
            />
          </Api.Arguments>
        </:api>
      </Section.Subsection>
      <Section.Subsection @name="Jump to Page" @model={{this}} @elementTag="ul">
        <:example as |model|>
          <Pagination
            @meta={{model.meta}}
            @enablePageJump={{model.enablePageJump}}
            @pageSizes={{model.pageSizes}}
            @showDetailedMeta={{model.showDetailedMeta}}
            @onChangePage={{model.changePage}}
            @onChangePageSize={{model.changePageSize}}
          />
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.Number
              @description="Index of the first item"
              @name="meta.start"
            />
            <Args.Number
              @description="Number of items per page"
              @name="meta.count"
            />
            <Args.Number
              @description="Total number of items"
              @name="meta.total"
            />
            <Args.Boolean
              @defaultValue={{false}}
              @description="Enable jumping to page"
              @name="enablePageJump"
            />
            {{! TODO }}
            {{!-- <Args.Array
              @description="List of available page sizes"
              @name="pageSizes"
              @items={{this.pageSizes}}
              @type="Number"
            /> --}}
            <Args.Boolean
              @defaultValue={{false}}
              @description="Show detailed meta information"
              @name="showDetailedMeta"
            />
          </Api.Arguments>
        </:api>
      </Section.Subsection>
    </Section>
  </template>
}
