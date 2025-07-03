import { assert } from '@ember/debug';
import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { LinkTo } from '@ember/routing';
import Component from '@glimmer/component';

import { classes } from '../helpers/classes.ts';

import type { TOC } from '@ember/component/template-only';
import type Owner from '@ember/owner';
import type { ComponentLike, WithBoundArgs } from '@glint/template';

interface LinkToArgs {
  active?: boolean;
  activeClass?: string;
  'current-when'?: string | boolean;
  disabled?: boolean;
  model?: unknown;
  models?: unknown[];
  query?: Record<string, unknown>;
  replace?: boolean;
  route?: string;
}

export interface ItemSignature {
  Element: HTMLAnchorElement | HTMLDivElement;
  Args: LinkToArgs & {
    header?: boolean;
    url?: string;

    onClick?: (evt: MouseEvent) => unknown;
    onClickInternal?: (evt: MouseEvent) => unknown;
  };
  Blocks: {
    badge: [];
    default: [];
  };
}

export class Item extends Component<ItemSignature> {
  constructor(owner: Owner, args: ItemSignature['Args']) {
    super(owner, args);
    assert(
      'You cannot provide both the `@model` and `@models` arguments to the <Item> component.',
      (!args.models && args.model) || (args.models && !args.model) || (!args.model && !args.models),
    );
  }

  get classes() {
    const hasRoute = Boolean(this.args.route);
    const hasUrl = Boolean(this.args.url);
    const hasClickListener = Boolean(this.args.onClick) && !this.args.disabled;
    const canBeClicked = hasRoute || hasUrl || hasClickListener;

    return classes(
      'item list-group-item d-flex justify-content-between align-items-center',
      this.args.active ? 'active' : '',
      this.args.disabled ? 'disabled' : '',
      this.args.header ? 'header' : '',
      canBeClicked ? 'list-group-item-action' : '',
    );
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

  onClick = (evt: MouseEvent) => {
    if (this.args.active || this.args.disabled) {
      return;
    }

    this.args.onClick?.(evt);
    this.args.onClickInternal?.(evt);
  };

  <template>
    {{#if @route}}
      <LinkTo
        class={{this.classes}}
        @activeClass={{@activeClass}}
        @current-when={{@current-when}}
        @disabled={{@disabled}}
        @models={{this.models}}
        @query={{this.query}}
        @replace={{@replace}}
        @route={{@route}}
        ...attributes
      >
        <span>
          {{yield}}
        </span>
        {{#if (has-block "badge")}}
          <span class="badge rounded-pill">
            {{yield to="badge"}}
          </span>
        {{/if}}
      </LinkTo>
    {{else if @url}}
      <a
        class={{this.classes}}
        href={{@url}}
        ...attributes
      >
        <span>
          {{yield}}
        </span>
        {{#if (has-block "badge")}}
          <span class="badge rounded-pill">
            {{yield to="badge"}}
          </span>
        {{/if}}
      </a>
    {{else}}
      <div
        class={{this.classes}}
        {{! @glint-expect-error - Known Glint issue - #661 }}
        {{(if @onClick (modifier on "click" this.onClick))}}
        ...attributes
      >
        <span>
          {{yield}}
        </span>
        {{#if (has-block "badge")}}
          <span class="badge rounded-pill">
            {{yield to="badge"}}
          </span>
        {{/if}}
      </div>
    {{/if}}
  </template>
}

export interface GroupSignature {
  Element: HTMLAnchorElement | HTMLDivElement;
  Args: LinkToArgs & {
    url?: string;

    onClick?: (evt: MouseEvent) => unknown;
    onClickInternal?: (evt: MouseEvent) => unknown;
  };
  Blocks: {
    badge: [];
    header: [];
    items: [ComponentLike<ItemSignature>];
  };
}

export class Group extends Component<GroupSignature> {
  constructor(owner: Owner, args: GroupSignature['Args']) {
    super(owner, args);
    assert(
      'You cannot provide both the `@model` and `@models` arguments to the <Group> component.',
      (!args.models && args.model) || (args.models && !args.model) || (!args.model && !args.models),
    );
  }

  get classes() {
    const hasRoute = Boolean(this.args.route);
    const hasUrl = Boolean(this.args.url);
    const hasClickListener = Boolean(this.args.onClick) && !this.args.disabled;
    const canBeClicked = hasRoute || hasUrl || hasClickListener;

    return classes(
      'item list-group-item header d-flex justify-content-between align-items-center',
      this.args.active ? 'active' : '',
      this.args.disabled ? 'disabled' : '',
      canBeClicked ? 'list-group-item-action' : '',
    );
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

  onClick = (evt: MouseEvent) => {
    if (this.args.active || this.args.disabled) {
      return;
    }

    this.args.onClick?.(evt);
    this.args.onClickInternal?.(evt);
  };

  <template>
    {{#if (has-block "header")}}
      {{#if @route}}
        <LinkTo
          class={{this.classes}}
          @activeClass={{@activeClass}}
          @current-when={{@current-when}}
          @disabled={{@disabled}}
          @models={{this.models}}
          @query={{this.query}}
          @replace={{@replace}}
          @route={{@route}}
          ...attributes
        >
          <span>
            {{yield to="header"}}
          </span>
          {{#if (has-block "badge")}}
            <span class="badge rounded-pill">
              {{yield to="badge"}}
            </span>
          {{/if}}
        </LinkTo>
      {{else if @url}}
        <a
          class={{this.classes}}
          href={{@url}}
          disabled={{@disabled}}
          ...attributes
        >
          <span>
            {{yield to="header"}}
          </span>
          {{#if (has-block "badge")}}
            <span class="badge rounded-pill">
              {{yield to="badge"}}
            </span>
          {{/if}}
        </a>
      {{else}}
        <div
          class={{this.classes}}
          {{! @glint-expect-error - Known Glint issue - #661 }}
          {{(if @onClick (modifier on "click" this.onClick))}}
          ...attributes
        >
          <span>
            {{yield to="header"}}
          </span>
          {{#if (has-block "badge")}}
            <span class="badge rounded-pill">
              {{yield to="badge"}}
            </span>
          {{/if}}
        </div>
      {{/if}}
    {{/if}}
    {{#if (has-block "items")}}
      {{yield (component Item onClickInternal=@onClickInternal) to="items"}}
    {{/if}}
  </template>
}

export interface SidebarSignature {
  Element: HTMLDivElement;
  Args: {
    sticky?: boolean;

    onClickInternal?: (evt: MouseEvent) => unknown;
  };
  Blocks: {
    default: [
      {
        Group: WithBoundArgs<typeof Group, 'onClickInternal'>;
        Item: WithBoundArgs<typeof Item, 'header' | 'onClickInternal'>;
      },
    ];
    footer: [WithBoundArgs<typeof Item, 'onClickInternal'>];
  };
}

const Sidebar: TOC<SidebarSignature> = <template>
  <div class="sidebar card justify-content-between overflow-auto" ...attributes>
    <div class="list-group d-flex flex-column">
      {{yield
        (hash
          Group=(component Group onClickInternal=@onClickInternal)
          Item=(component Item header=true onClickInternal=@onClickInternal)
        )
      }}
    </div>
    {{#if (has-block "footer")}}
      <div class="list-group d-flex flex-column footer">
        {{yield (component Item onClickInternal=@onClickInternal) to="footer"}}
      </div>
    {{/if}}
  </div>
</template>;

export default Sidebar;
