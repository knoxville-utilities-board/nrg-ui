import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { isTesting, macroCondition } from '@embroider/macros';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { restartableTask, timeout } from 'ember-concurrency';
import { formatNumber, t } from 'ember-intl';
import { TrackedArray } from 'tracked-built-ins';

import { bind } from '../helpers/bind.ts';
import { classes } from '../helpers/classes.ts';
import NumberInput from './form/number-input.gts';
import Select from './form/select.gts';

import type { Optional } from '../index.ts';

export interface Meta {
  start: string | number;
  count: string | number;
  total: string | number;
}

export interface PaginationSignature {
  Element: HTMLUListElement;
  Args: {
    compact?: boolean;
    defaultPageSize?: number;
    enablePageJump?: boolean;
    meta?: Meta;
    pageJumpDebounce?: number;
    pageSizes?: number[];
    showDetailedMeta?: boolean;

    onChangePage?: (start: number) => void;
    onChangePageSize?: (pageSize: number) => void;
  };
  Blocks: {
    default: [];
  };
}

interface Page {
  number?: number;
  current?: boolean;
  blank?: boolean;
}

const defaultPageSize = 25;
const defaultPageJumpDebounce = 600;

export default class Pagination extends Component<PaginationSignature> {
  @tracked
  currentPageNumber = this.currentPage;

  get meta() {
    const meta = this.args.meta ?? ({} as Meta);
    const start = parseInt(meta.start as string);
    const count = parseInt(meta.count as string);
    const total = parseInt(meta.total as string);

    return {
      start,
      count,
      total,
    };
  }

  get defaultPageSize() {
    return (
      this.args.defaultPageSize ?? this.args.pageSizes?.[0] ?? defaultPageSize
    );
  }

  get selectedPageSize() {
    return this.meta.count;
  }

  set selectedPageSize(pageSize: number) {
    if (pageSize == this.meta.count) {
      return;
    }
    this.currentPageNumber = 1;
    this.args.onChangePageSize?.(pageSize);
  }

  get firstPage() {
    return {
      number: 1,
      current: 1 === this.currentPage,
    };
  }

  get currentPage() {
    return this.meta.start / this.selectedPageSize + 1;
  }

  get totalPages() {
    return Math.ceil(this.meta.total / this.selectedPageSize);
  }

  get canStepForward() {
    return this.currentPage < this.totalPages;
  }

  get canStepBackward() {
    return this.currentPage > 1;
  }

  get currentPageStart() {
    return this.meta.start + 1;
  }

  get currentPageEnd() {
    const pageEnd = this.meta.start + this.meta.count;
    const total = this.meta.total;
    return pageEnd > total ? total : pageEnd;
  }

  get showFirstPage() {
    return 1 < this.pageItems[0]!.number!;
  }

  get showLastPage() {
    return this.pageItems?.every((page) => page?.number !== this.totalPages);
  }

  get pageItems(): Page[] {
    const pageList = new TrackedArray<Page>();
    const totalPages = this.totalPages;
    const displayedPages = !this.args.compact && totalPages >= 5 ? 5 : 3;
    const pageRange = (displayedPages - 1) / 2;
    const first = this.currentPage - pageRange;
    const last = this.currentPage + pageRange;
    for (let pageNum = first; pageNum <= last; pageNum++) {
      if (pageNum > 0 && pageNum <= totalPages) {
        // Valid page number
        pageList.push({
          number: pageNum,
          current: pageNum === this.currentPage,
        });
      } else {
        pageList.push({
          current: false,
          blank: true,
        });
      }
    }
    return pageList;
  }

  get pageSizes(): number[] {
    const pageSizes = new Set(this.args.pageSizes);

    pageSizes.add(this.meta.count);

    return Array.from(pageSizes).sort((a, b) => a - b);
  }

  get jumpToDebounce() {
    if (macroCondition(isTesting())) {
      return 0;
    }
    return this.args.pageJumpDebounce ?? defaultPageJumpDebounce;
  }

  getPageNumberFromStart(start: number) {
    return start / this.selectedPageSize + 1;
  }

  getStartFromPageNumber(page: number) {
    return (page - 1) * this.selectedPageSize;
  }

  changePage = (page: Page, evt?: Event) => {
    evt?.preventDefault();
    evt?.stopPropagation();

    if (!page.current && !page.blank) {
      this.args.onChangePage?.(this.getStartFromPageNumber(page.number!));
      this.currentPageNumber = page.number!;
    }
  };

  jumpToPage = (page: Optional<number>) => {
    page = Math.round(page!);
    this.currentPageNumber = page;
    if (page != this.currentPage && page > 0) {
      if (page > this.totalPages) {
        page = this.totalPages;
        this.currentPageNumber = page;
      }
      this.goToPage.perform(page);
    }
  };

  jumpToLastPage = (evt: Event) => {
    evt.preventDefault();
    evt.stopPropagation();

    this.jumpToPage(this.totalPages);
  };

  goToPage = restartableTask(async (page) => {
    await timeout(this.jumpToDebounce);

    this.args.onChangePage?.(this.getStartFromPageNumber(page));
  });

  stepForward = (evt: Event) => {
    evt.preventDefault();
    evt.stopPropagation();

    if (this.canStepForward) {
      this.changePage({
        number: this.currentPage + 1,
      });
    }
  };

  stepBackward = (evt: Event) => {
    evt.preventDefault();
    evt.stopPropagation();

    if (this.canStepBackward) {
      this.changePage({
        number: this.currentPage - 1,
      });
    }
  };

  <template>
    <ul class="pagination" role="navigation" ...attributes>
      {{#if @showDetailedMeta}}
        <li class="page-item disabled" data-test-meta>
          <span class="page-link">
            {{t
              "nrg.pagination.detailedMeta"
              start=this.currentPageStart
              end=this.currentPageEnd
              total=this.meta.total
            }}
          </span>
        </li>
      {{/if}}
      <li
        class={{classes
          "page-item page-previous"
          (unless this.canStepBackward "disabled")
        }}
        role={{if this.canStepBackward "button"}}
        {{! template-lint-disable }}
        {{! When the user can move to the previous page, the appropriate }}
        {{! role is added. The lint rule does not account for that. }}
        {{on "click" this.stepBackward}}
        data-test-previous
      >
        <span class="page-link">
          {{t "nrg.base.previous"}}
        </span>
      </li>
      {{#each this.pageItems as |page|}}
        <li
          aria-current={{if page.current "page"}}
          class={{classes "page-item" (if page.current "active")}}
          role={{unless page.blank "button"}}
          {{! template-lint-disable }}
          {{! When the user can move a specific page, the appropriate }}
          {{! role is added. The lint rule does not account for that. }}
          {{on "click" (fn this.changePage page)}}
          data-test-page={{page.number}}
        >
          {{#if page.blank}}
            {{! template-lint-disable no-whitespace-for-layout }}
            <span aria-hidden="true" class="page-link disabled">
              &nbsp;&nbsp;
            </span>
          {{else}}
            <span class="page-link">
              {{formatNumber page.number}}
            </span>
          {{/if}}
        </li>
      {{/each}}
      <li
        class={{classes
          "page-item page-next"
          (unless this.canStepForward "disabled")
        }}
        role={{if this.canStepForward "button"}}
        {{! template-lint-disable }}
        {{! When the user can move to the next page, the appropriate }}
        {{! role is added. The lint rule does not account for that. }}
        {{on "click" this.stepForward}}
        data-test-next
      >
        <span class="page-link">
          {{t "nrg.base.next"}}
        </span>
      </li>
      {{#if @pageSizes}}
        <li class="page-item" data-test-page-sizes>
          <Select
            {{! @glint-expect-error - Binding types are currently not supported }}
            @binding={{bind this "selectedPageSize"}}
            @options={{this.pageSizes}}
            @useDefaultValue={{true}}
            @defaultValue={{this.defaultPageSize}}
          >
            <:option as |value|>
              {{t "nrg.pagination.pageSize" value=value}}
            </:option>
          </Select>
        </li>
      {{/if}}
      {{#if @enablePageJump}}
        <li class="page-item" data-test-jump-to>
          <span class="input-group-text">
            {{t "nrg.pagination.jumpToPage.start"}}
            <NumberInput
              class="py-0 text-end me-1"
              max={{this.totalPages}}
              @basic={{true}}
              {{! @glint-expect-error - Binding types are currently not supported }}
              @binding={{bind this "currentPageNumber"}}
              @onChange={{this.jumpToPage}}
            />
            {{t "nrg.pagination.jumpToPage.end" total=this.totalPages}}
          </span>
        </li>
      {{/if}}
    </ul>
  </template>
}
