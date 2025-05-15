import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { LinkTo } from '@ember/routing';
import Component from '@glimmer/component';
import { classes } from '../helpers/classes.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

class Item extends Component {
  get classes() {
    const hasRoute = Boolean(this.args.route);
    const hasUrl = Boolean(this.args.url);
    const hasClickListener = Boolean(this.args.onClick) && !this.args.disabled;
    const canBeClicked = hasRoute || hasUrl || hasClickListener;
    return classes('item list-group-item d-flex justify-content-between align-items-center', this.args.active ? 'active' : '', this.args.disabled ? 'disabled' : '', this.args.header ? 'header' : '', canBeClicked ? 'list-group-item-action' : '');
  }
  onClick = evt => {
    if (this.args.active || this.args.disabled) {
      return;
    }
    this.args.onClick?.(evt);
    this.args.onClickInternal?.(evt);
  };
  static {
    setComponentTemplate(precompileTemplate("\n    {{#if @route}}\n      <LinkTo class={{this.classes}} @route={{@route}} ...attributes>\n        <span>\n          {{yield}}\n        </span>\n        {{#if (has-block \"badge\")}}\n          <span class=\"badge rounded-pill\">\n            {{yield to=\"badge\"}}\n          </span>\n        {{/if}}\n      </LinkTo>\n    {{else if @url}}\n      <a class={{this.classes}} href={{@url}} ...attributes>\n        <span>\n          {{yield}}\n        </span>\n        {{#if (has-block \"badge\")}}\n          <span class=\"badge rounded-pill\">\n            {{yield to=\"badge\"}}\n          </span>\n        {{/if}}\n      </a>\n    {{else}}\n      <div class={{this.classes}} {{!-- @glint-expect-error - Known Glint issue - #661 --}} {{(if @onClick (modifier on \"click\" this.onClick))}} ...attributes>\n        <span>\n          {{yield}}\n        </span>\n        {{#if (has-block \"badge\")}}\n          <span class=\"badge rounded-pill\">\n            {{yield to=\"badge\"}}\n          </span>\n        {{/if}}\n      </div>\n    {{/if}}\n  ", {
      strictMode: true,
      scope: () => ({
        LinkTo,
        on
      })
    }), this);
  }
}
class Group extends Component {
  get classes() {
    const hasRoute = Boolean(this.args.route);
    const hasUrl = Boolean(this.args.url);
    const hasClickListener = Boolean(this.args.onClick) && !this.args.disabled;
    const canBeClicked = hasRoute || hasUrl || hasClickListener;
    return classes('item list-group-item header d-flex justify-content-between align-items-center', this.args.active ? 'active' : '', this.args.disabled ? 'disabled' : '', canBeClicked ? 'list-group-item-action' : '');
  }
  onClick = evt => {
    if (this.args.active || this.args.disabled) {
      return;
    }
    this.args.onClick?.(evt);
    this.args.onClickInternal?.(evt);
  };
  static {
    setComponentTemplate(precompileTemplate("\n    {{#if (has-block \"header\")}}\n      {{#if @route}}\n        <LinkTo class={{this.classes}} @disabled={{@disabled}} @route={{@route}} ...attributes>\n          <span>\n            {{yield to=\"header\"}}\n          </span>\n          {{#if (has-block \"badge\")}}\n            <span class=\"badge rounded-pill\">\n              {{yield to=\"badge\"}}\n            </span>\n          {{/if}}\n        </LinkTo>\n      {{else if @url}}\n        <a class={{this.classes}} href={{@url}} disabled={{@disabled}} ...attributes>\n          <span>\n            {{yield to=\"header\"}}\n          </span>\n          {{#if (has-block \"badge\")}}\n            <span class=\"badge rounded-pill\">\n              {{yield to=\"badge\"}}\n            </span>\n          {{/if}}\n        </a>\n      {{else}}\n        <div class={{this.classes}} {{!-- @glint-expect-error - Known Glint issue - #661 --}} {{(if @onClick (modifier on \"click\" this.onClick))}} ...attributes>\n          <span>\n            {{yield to=\"header\"}}\n          </span>\n          {{#if (has-block \"badge\")}}\n            <span class=\"badge rounded-pill\">\n              {{yield to=\"badge\"}}\n            </span>\n          {{/if}}\n        </div>\n      {{/if}}\n    {{/if}}\n    {{#if (has-block \"items\")}}\n      {{yield (component Item onClickInternal=@onClickInternal) to=\"items\"}}\n    {{/if}}\n  ", {
      strictMode: true,
      scope: () => ({
        LinkTo,
        on,
        Item
      })
    }), this);
  }
}
const Sidebar = setComponentTemplate(precompileTemplate("\n  <div class=\"sidebar card justify-content-between overflow-auto\" ...attributes>\n    <div class=\"list-group d-flex flex-column\">\n      {{yield (hash Group=(component Group onClickInternal=@onClickInternal) Item=(component Item header=true onClickInternal=@onClickInternal))}}\n    </div>\n    {{#if (has-block \"footer\")}}\n      <div class=\"list-group d-flex flex-column footer\">\n        {{yield (component Item onClickInternal=@onClickInternal) to=\"footer\"}}\n      </div>\n    {{/if}}\n  </div>\n", {
  strictMode: true,
  scope: () => ({
    hash,
    Group,
    Item
  })
}), templateOnly());

export { Group, Item, Sidebar as default };
//# sourceMappingURL=sidebar.js.map
