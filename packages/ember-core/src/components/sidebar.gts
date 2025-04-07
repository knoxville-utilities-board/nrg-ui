import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { LinkTo } from '@ember/routing';
import Component from '@glimmer/component';

import { classes } from '../helpers/classes.ts';

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike, WithBoundArgs } from '@glint/template';

export interface ItemSignature {
  Element: HTMLAnchorElement | HTMLDivElement;
  Args: {
    active?: boolean;
    disabled?: boolean;
    header?: boolean;
    route?: string;
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
        @route={{@route}}
        {{on "click" this.onClick}}
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
        {{on "click" this.onClick}}
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
  Args: {
    active?: boolean;
    disabled?: boolean;
    route?: string;
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
          @disabled={{@disabled}}
          @route={{@route}}
          {{on "click" this.onClick}}
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
          {{on "click" this.onClick}}
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
