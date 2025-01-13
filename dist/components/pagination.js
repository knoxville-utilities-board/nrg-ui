import { buildTask } from 'ember-concurrency/async-arrow-runtime';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { macroCondition, isTesting } from '@embroider/macros';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { timeout } from 'ember-concurrency';
import { t, formatNumber } from 'ember-intl';
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
  #currentPageNumber = (i(this, "currentPageNumber"), undefined);
  get meta() {
    const meta1 = this.args.meta ?? {};
    const start1 = parseInt(meta1.start);
    const count1 = parseInt(meta1.count);
    const total1 = parseInt(meta1.total);
    return {
      start: start1,
      count: count1,
      total: total1
    };
  }
  get defaultPageSize() {
    return this.args.defaultPageSize ?? this.args.pageSizes?.[0] ?? defaultPageSize;
  }
  get selectedPageSize() {
    return this.meta.count;
  }
  set selectedPageSize(pageSize1) {
    if (pageSize1 == this.meta.count) {
      return;
    }
    this.currentPageNumber = 1;
    this.args.onChangePageSize?.(pageSize1);
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
    const pageEnd1 = this.meta.start + this.meta.count;
    const total1 = this.meta.total;
    return pageEnd1 > total1 ? total1 : pageEnd1;
  }
  get showFirstPage() {
    return 1 < this.pageItems[0].number;
  }
  get showLastPage() {
    return this.pageItems?.every(page1 => page1?.number !== this.totalPages);
  }
  get pageItems() {
    const pageList1 = new TrackedArray();
    const totalPages1 = this.totalPages;
    const displayedPages1 = totalPages1 >= 5 ? 5 : 3;
    const pageRange1 = (displayedPages1 - 1) / 2;
    const first1 = this.currentPage - pageRange1;
    const last1 = this.currentPage + pageRange1;
    for (let pageNum1 = first1; pageNum1 <= last1; pageNum1++) {
      if (pageNum1 > 0 && pageNum1 <= totalPages1) {
        // Valid page number
        pageList1.push({
          number: pageNum1,
          current: pageNum1 === this.currentPage
        });
      } else {
        pageList1.push({
          current: false,
          blank: true
        });
      }
    }
    return pageList1;
  }
  get pageSizes() {
    const pageSizes1 = new Set(this.args.pageSizes);
    pageSizes1.add(this.meta.count);
    return Array.from(pageSizes1).sort((a1, b1) => a1 - b1);
  }
  get jumpToDebounce() {
    if (macroCondition(isTesting())) {
      return 0;
    }
    return this.args.pageJumpDebounce ?? defaultPageJumpDebounce;
  }
  getPageNumberFromStart(start1) {
    return start1 / this.selectedPageSize + 1;
  }
  getStartFromPageNumber(page1) {
    return (page1 - 1) * this.selectedPageSize;
  }
  changePage = (page1, evt1) => {
    evt1?.preventDefault();
    evt1?.stopPropagation();
    if (!page1.current && !page1.blank) {
      this.args.onChangePage?.(this.getStartFromPageNumber(page1.number));
      this.currentPageNumber = page1.number;
    }
  };
  jumpToPage = page1 => {
    page1 = Math.round(page1);
    this.currentPageNumber = page1;
    if (page1 != this.currentPage && page1 > 0) {
      if (page1 > this.totalPages) {
        page1 = this.totalPages;
        this.currentPageNumber = page1;
      }
      this.goToPage.perform(page1);
    }
  };
  jumpToLastPage = evt1 => {
    evt1.preventDefault();
    evt1.stopPropagation();
    this.jumpToPage(this.totalPages);
  };
  goToPage = buildTask(() => ({
    context: this,
    generator: function* (page1) {
      yield timeout(this.jumpToDebounce);
      this.args.onChangePage?.(this.getStartFromPageNumber(page1));
    }
  }), null, "goToPage", "restartable");
  stepForward = evt1 => {
    evt1.preventDefault();
    evt1.stopPropagation();
    if (this.canStepForward) {
      this.changePage({
        number: this.currentPage + 1
      });
    }
  };
  stepBackward = evt1 => {
    evt1.preventDefault();
    evt1.stopPropagation();
    if (this.canStepBackward) {
      this.changePage({
        number: this.currentPage - 1
      });
    }
  };
  static {
    setComponentTemplate(precompileTemplate("\n    <ul class=\"pagination\" role=\"navigation\" ...attributes>\n      {{#if @showDetailedMeta}}\n        <li class=\"page-item disabled\" data-test-meta>\n          <span class=\"page-link\">\n            {{t \"nrg.pagination.detailedMeta\" start=this.currentPageStart end=this.currentPageEnd total=this.meta.total}}\n          </span>\n        </li>\n      {{/if}}\n      <li class={{classes \"page-item\" (unless this.canStepBackward \"disabled\")}} role={{if this.canStepBackward \"button\"}} {{!-- @glint-expect-error - Known Glint issue - #661 --}} {{(if this.canStepBackward (modifier on \"click\" this.stepBackward))}} data-test-previous>\n        <span class=\"page-link\">\n          {{t \"nrg.base.previous\"}}\n        </span>\n      </li>\n      {{#each this.pageItems as |page|}}\n        <li aria-current={{if page.current \"page\"}} class={{classes \"page-item\" (if page.current \"active\")}} role={{unless page.blank \"button\"}} {{!-- @glint-expect-error - Known Glint issue - #661 --}} {{(unless page.blank (modifier on \"click\" (fn this.changePage page)))}} data-test-page={{page.number}}>\n          {{#if page.blank}}\n            <span aria-hidden=\"true\" class=\"page-link disabled\">\n              &nbsp;\n            </span>\n          {{else}}\n            <span class=\"page-link\">\n              {{formatNumber page.number}}\n            </span>\n          {{/if}}\n        </li>\n      {{/each}}\n      <li class={{classes \"page-item\" (unless this.canStepForward \"disabled\")}} role={{if this.canStepForward \"button\"}} {{!-- @glint-expect-error - Known Glint issue - #661 --}} {{(if this.canStepForward (modifier on \"click\" this.stepForward))}} data-test-next>\n        <span class=\"page-link\">\n          {{t \"nrg.base.next\"}}\n        </span>\n      </li>\n      {{#if @pageSizes}}\n        <li class=\"page-item\" data-test-page-sizes>\n          <Select {{!-- @glint-expect-error - Binding types are currently not supported --}} @binding={{bind this \"selectedPageSize\"}} @options={{this.pageSizes}} @useDefaultValue={{true}} @defaultValue={{this.defaultPageSize}}>\n            <:option as |value|>\n              {{t \"nrg.pagination.pageSize\" value=value}}\n            </:option>\n          </Select>\n        </li>\n      {{/if}}\n      {{#if @enablePageJump}}\n        <li class=\"page-item\" data-test-jump-to>\n          <span class=\"input-group-text\">\n            {{t \"nrg.pagination.jumpToPage.start\"}}\n            <NumberInput class=\"py-0 text-end me-1\" max={{this.totalPages}} @basic={{true}} {{!-- @glint-expect-error - Binding types are currently not supported --}} @binding={{bind this \"currentPageNumber\"}} @onChange={{this.jumpToPage}} />\n            {{t \"nrg.pagination.jumpToPage.end\" total=this.totalPages}}\n          </span>\n        </li>\n      {{/if}}\n    </ul>\n  ", {
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
