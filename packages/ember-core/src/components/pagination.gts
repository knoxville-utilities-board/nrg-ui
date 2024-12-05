import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { restartableTask, timeout } from 'ember-concurrency';
import { formatNumber, t } from 'ember-intl';
import { TrackedArray } from 'tracked-built-ins';

import { bind } from '../helpers/bind.ts';
import classes from '../modifiers/classes.ts';
import NumberInput from './form/number-input.gts';
import Select from './form/select.gts';

import type { Optional } from '../index.ts';

export interface Meta {
  start: string;
  count: string;
  total: string;
}

export interface PaginationSignature {
  Element: HTMLUListElement;
  Args: {
    defaultPageSize?: number;
    meta?: Meta;
    numericPageJump?: boolean;
    pageSizes?: number[];
    showDetailedMeta?: boolean;

    onChangePage?: (page: number) => void;
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

export default class Pagination extends Component<PaginationSignature> {
  @tracked
  currentPageNumber = this.currentPage;

  get meta() {
    const meta = this.args.meta ?? ({} as Meta);
    const start = parseInt(meta.start);
    const count = parseInt(meta.count);
    const total = parseInt(meta.total);

    return {
      start,
      count,
      total,
    };
  }

  get defaultPageSize() {
    return (
      this.args.pageSizes?.[0] ?? this.args.defaultPageSize ?? defaultPageSize
    );
  }

  get selectedPageSize() {
    return this.meta.count;
  }

  set selectedPageSize(pageSize: number) {
    if (pageSize == this.meta.count) {
      return;
    }
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

  get pageItems(): Array<Page> {
    const pageList = new TrackedArray<Page>();
    const totalPages = this.totalPages;
    const displayedPages = totalPages >= 5 ? 5 : 3;
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

  getPageNumberFromStart(start: number) {
    return start / this.selectedPageSize + 1;
  }

  getStartFromPageNumber(page: number) {
    return (page - 1) * this.selectedPageSize;
  }

  @action
  onChangePageSize(pageSize: Optional<number>) {
    this.currentPageNumber = 1;
    this.args.onChangePageSize?.(pageSize!);
  }

  @action
  changePage(page: Page, evt?: Event) {
    evt?.preventDefault();
    evt?.stopPropagation();

    if (!page.current && !page.blank) {
      this.args.onChangePage?.(this.getStartFromPageNumber(page.number!));
      this.currentPageNumber = page.number!;
    }
  }

  @action
  jumpToPage(page: Optional<number>) {
    page = Math.round(page!);
    this.currentPageNumber = page;
    if (page != this.currentPage && page > 0) {
      if (page > this.totalPages) {
        page = this.totalPages;
        this.currentPageNumber = page;
      }
      this.goToPage.perform(page);
    }
  }

  @action
  jumpToLastPage(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();

    this.jumpToPage(this.totalPages);
  }

  goToPage = restartableTask(async (page) => {
    await timeout(600);
    this.args.onChangePage?.(this.getStartFromPageNumber(page));
  });

  @action
  stepForward(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();

    if (this.canStepForward) {
      this.changePage({
        number: this.currentPage + 1,
      });
    }
  }

  @action
  stepBackward(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();

    if (this.canStepBackward) {
      this.changePage({
        number: this.currentPage - 1,
      });
    }
  }

  <template>
    <ul class="pagination" role="navigation" ...attributes>
      {{#if @showDetailedMeta}}
        <li class="page-item disabled">
          <a class="page-link" href="">
            {{t
              "nrg.pagination.detailedMeta"
              start=this.currentPageStart
              end=this.currentPageEnd
              total=this.meta.total
            }}
          </a>
        </li>
      {{/if}}
      <li {{classes "page-item" (unless this.canStepBackward "disabled")}}>
        <a
          class="page-link"
          href=""
          role="button"
          {{on "click" this.stepBackward}}
        >
          {{t "nrg.base.previous"}}
        </a>
      </li>
      {{#each this.pageItems as |page|}}
        <li {{classes "page-item" (if page.current "active")}}>
          {{#if page.blank}}
            <a aria-hidden="true" class="page-link disabled" href="">
              &nbsp;
            </a>
          {{else}}
            <a
              aria-current={{if page.current "page"}}
              class="page-link"
              data-test-page-number={{page.number}}
              href=""
              role="button"
              {{on "click" (fn this.changePage page)}}
            >
              {{formatNumber page.number}}
            </a>
          {{/if}}
        </li>
      {{/each}}
      <li {{classes "page-item" (unless this.canStepForward "disabled")}}>
        <a
          class="page-link"
          href=""
          role="button"
          {{on "click" this.stepForward}}
        >
          {{t "nrg.base.next"}}
        </a>
      </li>
      {{!-- {{log this.pageSizes}} --}}
      {{#if this.pageSizes}}
        <li class="page-item">
          <Select
            {{! @glint-expect-error - Binding types are currently not supported }}
            @binding={{bind this "selectedPageSize"}}
            @onChange={{this.onChangePageSize}}
            @options={{this.pageSizes}}
            @useDefaultValue={{true}}
            @defaultValue={{this.defaultPageSize}}
          />
        </li>
      {{/if}}
    </ul>
    {{#if @numericPageJump}}
      <div class="ui pagination no-shadow no-border mini menu">
        <div class="item">
          Page
          <NumberInput
            class="go-to-page"
            max={{this.totalPages}}
            {{! @glint-expect-error - Binding types are currently not supported }}
            @binding={{bind this "currentPageNumber"}}
            @onChange={{this.jumpToPage}}
          />
          of
          {{this.totalPages}}
        </div>
      </div>
    {{/if}}
  </template>
}
