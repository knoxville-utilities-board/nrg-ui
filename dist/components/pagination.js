import { buildTask } from 'ember-concurrency/async-arrow-runtime';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { macroCondition, isTesting } from '@embroider/macros';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { timeout } from 'ember-concurrency';
import { formatNumber, t } from 'ember-intl';
import { TrackedArray } from 'tracked-built-ins';
import { bind } from '../helpers/bind.js';
import { classes } from '../helpers/classes.js';
import NumberInput from './form/number-input.js';
import Select from './form/select.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i } from 'decorator-transforms/runtime';

const defaultPageSize = 25;
const defaultPageJumpDebounce = 600;
class Pagination extends Component {
  static {
    g(this.prototype, "currentPageNumber", [tracked], function () {
      return this.currentPage;
    });
  }
  #currentPageNumber = (i(this, "currentPageNumber"), void 0);
  get meta() {
    const meta = this.args.meta ?? {};
    const start = parseInt(meta.start);
    const count = parseInt(meta.count);
    const total = parseInt(meta.total);
    return {
      start,
      count,
      total
    };
  }
  get defaultPageSize() {
    return this.args.defaultPageSize ?? this.args.pageSizes?.[0] ?? defaultPageSize;
  }
  get selectedPageSize() {
    return this.meta.count;
  }
  set selectedPageSize(pageSize) {
    if (pageSize == this.meta.count) {
      return;
    }
    this.currentPageNumber = 1;
    this.args.onChangePageSize?.(pageSize);
  }
  get firstPage() {
    return {
      number: 1,
      current: 1 === this.currentPage
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
    return 1 < this.pageItems[0].number;
  }
  get showLastPage() {
    return this.pageItems?.every(page => page?.number !== this.totalPages);
  }
  get pageItems() {
    const pageList = new TrackedArray();
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
          current: pageNum === this.currentPage
        });
      } else {
        pageList.push({
          current: false,
          blank: true
        });
      }
    }
    return pageList;
  }
  get pageSizes() {
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
  getPageNumberFromStart(start) {
    return start / this.selectedPageSize + 1;
  }
  getStartFromPageNumber(page) {
    return (page - 1) * this.selectedPageSize;
  }
  changePage = (page, evt) => {
    evt?.preventDefault();
    evt?.stopPropagation();
    if (!page.current && !page.blank) {
      this.args.onChangePage?.(this.getStartFromPageNumber(page.number));
      this.currentPageNumber = page.number;
    }
  };
  jumpToPage = page => {
    page = Math.round(page);
    this.currentPageNumber = page;
    if (page != this.currentPage && page > 0) {
      if (page > this.totalPages) {
        page = this.totalPages;
        this.currentPageNumber = page;
      }
      this.goToPage.perform(page);
    }
  };
  jumpToLastPage = evt => {
    evt.preventDefault();
    evt.stopPropagation();
    this.jumpToPage(this.totalPages);
  };
  goToPage = buildTask(() => ({
    context: this,
    generator: function* (page) {
      yield timeout(this.jumpToDebounce);
      this.args.onChangePage?.(this.getStartFromPageNumber(page));
    }
  }), null, "goToPage", "restartable");
  stepForward = evt => {
    evt.preventDefault();
    evt.stopPropagation();
    if (this.canStepForward) {
      this.changePage({
        number: this.currentPage + 1
      });
    }
  };
  stepBackward = evt => {
    evt.preventDefault();
    evt.stopPropagation();
    if (this.canStepBackward) {
      this.changePage({
        number: this.currentPage - 1
      });
    }
  };
  static {
    setComponentTemplate(precompileTemplate("<ul class=\"pagination\" role=\"navigation\" ...attributes>\n  {{#if @showDetailedMeta}}\n    <li class=\"page-item disabled\" data-test-meta>\n      <span class=\"page-link\">\n        {{t \"nrg.pagination.detailedMeta\" start=this.currentPageStart end=this.currentPageEnd total=this.meta.total}}\n      </span>\n    </li>\n  {{/if}}\n  <li class={{classes \"page-item page-previous\" (unless this.canStepBackward \"disabled\")}} role={{if this.canStepBackward \"button\"}} {{!-- template-lint-disable --}} {{!-- When the user can move to the previous page, the appropriate --}} {{!-- role is added. The lint rule does not account for that. --}} {{on \"click\" this.stepBackward}} data-test-previous>\n    <span class=\"page-link\">\n      {{t \"nrg.base.previous\"}}\n    </span>\n  </li>\n  {{#each this.pageItems as |page|}}\n    <li aria-current={{if page.current \"page\"}} class={{classes \"page-item\" (if page.current \"active\")}} role={{unless page.blank \"button\"}} {{!-- template-lint-disable --}} {{!-- When the user can move a specific page, the appropriate --}} {{!-- role is added. The lint rule does not account for that. --}} {{on \"click\" (fn this.changePage page)}} data-test-page={{page.number}}>\n      {{#if page.blank}}\n        {{!-- template-lint-disable no-whitespace-for-layout --}}\n        <span aria-hidden=\"true\" class=\"page-link disabled\">\n          &nbsp;&nbsp;\n        </span>\n      {{else}}\n        <span class=\"page-link\">\n          {{formatNumber page.number}}\n        </span>\n      {{/if}}\n    </li>\n  {{/each}}\n  <li class={{classes \"page-item page-next\" (unless this.canStepForward \"disabled\")}} role={{if this.canStepForward \"button\"}} {{!-- template-lint-disable --}} {{!-- When the user can move to the next page, the appropriate --}} {{!-- role is added. The lint rule does not account for that. --}} {{on \"click\" this.stepForward}} data-test-next>\n    <span class=\"page-link\">\n      {{t \"nrg.base.next\"}}\n    </span>\n  </li>\n  {{#if @pageSizes}}\n    <li class=\"page-item\" data-test-page-sizes>\n      <Select @binding={{bind this \"selectedPageSize\"}} @options={{this.pageSizes}} @useDefaultValue={{true}} @defaultValue={{this.defaultPageSize}}>\n        <:option as |value|>\n          {{t \"nrg.pagination.pageSize\" value=value}}\n        </:option>\n      </Select>\n    </li>\n  {{/if}}\n  {{#if @enablePageJump}}\n    <li class=\"page-item\" data-test-jump-to>\n      <span class=\"input-group-text\">\n        {{t \"nrg.pagination.jumpToPage.start\"}}\n        <NumberInput class=\"py-0 text-end me-1\" max={{this.totalPages}} @basic={{true}} @binding={{bind this \"currentPageNumber\"}} @onChange={{this.jumpToPage}} />\n        {{t \"nrg.pagination.jumpToPage.end\" total=this.totalPages}}\n      </span>\n    </li>\n  {{/if}}\n</ul>", {
      strictMode: true,
      scope: () => ({
        t,
        classes,
        on,
        fn,
        formatNumber,
        Select,
        bind,
        NumberInput
      })
    }), this);
  }
}

export { Pagination as default };
//# sourceMappingURL=pagination.js.map
