import { assert } from '@ember/debug';
import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { LinkTo } from '@ember/routing';
import Component from '@glimmer/component';
import { classes } from '../helpers/classes.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

class Item extends Component {
  constructor(owner, args) {
    super(owner, args);
    assert('You cannot provide both the `@model` and `@models` arguments to the <Item> component.', !args.models && args.model || args.models && !args.model || !args.model && !args.models);
  }
  get classes() {
    const hasRoute = Boolean(this.args.route);
    const hasUrl = Boolean(this.args.url);
    const hasClickListener = Boolean(this.args.onClick) && !this.args.disabled;
    const canBeClicked = hasRoute || hasUrl || hasClickListener;
    return classes('item list-group-item d-flex justify-content-between align-items-center', this.args.active ? 'active' : '', this.args.disabled ? 'disabled' : '', this.args.header ? 'header' : '', canBeClicked ? 'list-group-item-action' : '');
  }
  get models() {
    if (this.args.model) {
      return [this.args.model];
    } else if (this.args.models) {
      return this.args.models;
    }
    return [];
  }
  get query() {
    return this.args.query ?? {};
  }
  onClick = evt => {
    if (this.args.active || this.args.disabled) {
      return;
    }
    this.args.onClick?.(evt);
    this.args.onClickInternal?.(evt);
  };
  static {
    setComponentTemplate(precompileTemplate("{{#if @route}}\n  <LinkTo class={{this.classes}} @activeClass={{@activeClass}} @current-when={{@current-when}} @disabled={{@disabled}} @models={{this.models}} @query={{this.query}} @replace={{@replace}} @route={{@route}} ...attributes>\n    <span>\n      {{yield}}\n    </span>\n    <span class=\"d-flex\">\n      {{#if (has-block \"badge\")}}\n        <span class=\"badge rounded-pill\">\n          {{yield to=\"badge\"}}\n        </span>\n      {{/if}}\n    </span>\n  </LinkTo>\n{{else if @url}}\n  <a class={{this.classes}} href={{@url}} ...attributes>\n    <span>\n      {{yield}}\n    </span>\n    <span class=\"d-flex\">\n      <i class=\"bi bi-box-arrow-up-right text-body external-icon\"></i>\n      {{#if (has-block \"badge\")}}\n        <span class=\"badge rounded-pill\">\n          {{yield to=\"badge\"}}\n        </span>\n      {{/if}}\n    </span>\n  </a>\n{{else}}\n  <div class={{this.classes}} {{!-- @glint-expect-error - Known Glint issue - #661 --}} {{(if @onClick (modifier on \"click\" this.onClick))}} ...attributes>\n    <span>\n      {{yield}}\n    </span>\n    <span class=\"d-flex\">\n      {{#if (has-block \"badge\")}}\n        <span class=\"badge rounded-pill\">\n          {{yield to=\"badge\"}}\n        </span>\n      {{/if}}\n    </span>\n  </div>\n{{/if}}", {
      strictMode: true,
      scope: () => ({
        LinkTo,
        on
      })
    }), this);
  }
}
class Group extends Component {
  constructor(owner, args) {
    super(owner, args);
    assert('You cannot provide both the `@model` and `@models` arguments to the <Group> component.', !args.models && args.model || args.models && !args.model || !args.model && !args.models);
  }
  get classes() {
    const hasRoute = Boolean(this.args.route);
    const hasUrl = Boolean(this.args.url);
    const hasClickListener = Boolean(this.args.onClick) && !this.args.disabled;
    const canBeClicked = hasRoute || hasUrl || hasClickListener;
    return classes('item list-group-item header d-flex justify-content-between align-items-center', this.args.active ? 'active' : '', this.args.disabled ? 'disabled' : '', canBeClicked ? 'list-group-item-action' : '');
  }
  get models() {
    if (this.args.model) {
      return [this.args.model];
    } else if (this.args.models) {
      return this.args.models;
    }
    return [];
  }
  get query() {
    return this.args.query ?? {};
  }
  onClick = evt => {
    if (this.args.active || this.args.disabled) {
      return;
    }
    this.args.onClick?.(evt);
    this.args.onClickInternal?.(evt);
  };
  static {
    setComponentTemplate(precompileTemplate("{{#if (has-block \"header\")}}\n  {{#if @route}}\n    <LinkTo class={{this.classes}} @activeClass={{@activeClass}} @current-when={{@current-when}} @disabled={{@disabled}} @models={{this.models}} @query={{this.query}} @replace={{@replace}} @route={{@route}} ...attributes>\n      <span>\n        {{yield to=\"header\"}}\n      </span>\n      {{#if (has-block \"badge\")}}\n        <span class=\"badge rounded-pill\">\n          {{yield to=\"badge\"}}\n        </span>\n      {{/if}}\n    </LinkTo>\n  {{else if @url}}\n    <a class={{this.classes}} href={{@url}} ...attributes>\n      <span>\n        {{yield to=\"header\"}}\n      </span>\n      <span class=\"d-flex\">\n        <i class=\"bi bi-box-arrow-up-right text-body external-icon\"></i>\n        {{#if (has-block \"badge\")}}\n          <span class=\"badge rounded-pill\">\n            {{yield to=\"badge\"}}\n          </span>\n        {{/if}}\n      </span>\n    </a>\n  {{else}}\n    <div class={{this.classes}} {{!-- @glint-expect-error - Known Glint issue - #661 --}} {{(if @onClick (modifier on \"click\" this.onClick))}} ...attributes>\n      <span>\n        {{yield to=\"header\"}}\n      </span>\n      <span class=\"d-flex\">\n        {{#if (has-block \"badge\")}}\n          <span class=\"badge rounded-pill\">\n            {{yield to=\"badge\"}}\n          </span>\n        {{/if}}\n      </span>\n    </div>\n  {{/if}}\n{{/if}}\n{{#if (has-block \"items\")}}\n  {{yield (component Item onClickInternal=@onClickInternal) to=\"items\"}}\n{{/if}}", {
      strictMode: true,
      scope: () => ({
        LinkTo,
        on,
        Item
      })
    }), this);
  }
}
const Sidebar = setComponentTemplate(precompileTemplate("<div class=\"sidebar card justify-content-between overflow-auto\" ...attributes>\n  <div class=\"list-group d-flex flex-column\">\n    {{yield (hash Group=(component Group onClickInternal=@onClickInternal) Item=(component Item header=true onClickInternal=@onClickInternal))}}\n  </div>\n  {{#if (has-block \"footer\")}}\n    <div class=\"list-group d-flex flex-column footer\">\n      {{yield (component Item onClickInternal=@onClickInternal) to=\"footer\"}}\n    </div>\n  {{/if}}\n</div>", {
  strictMode: true,
  scope: () => ({
    hash,
    Group,
    Item
  })
}), templateOnly());

export { Group, Item, Sidebar as default };
//# sourceMappingURL=sidebar.js.map
