import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { LinkTo } from '@ember/routing';
import Component from '@glimmer/component';

import { classes } from '../helpers/classes.ts';

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';

interface ItemSignature {
  Element: HTMLAnchorElement | HTMLDivElement;
  Args: {
    active?: boolean;
    disabled?: boolean;
    header?: boolean;
    route?: string;
    url?: string;

    onClick?: (evt: MouseEvent) => unknown;
  };
  Blocks: {
    default: [];
  };
}

class Item extends Component<ItemSignature> {
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
  };

  <template>
    {{#if @route}}
      <LinkTo class={{this.classes}} @route={{@route}} ...attributes>
        <span>
          {{yield}}
        </span>
      </LinkTo>
    {{else if @url}}
      <a class={{this.classes}} href={{@url}} ...attributes>
        <span>
          {{yield}}
        </span>
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
      </div>
    {{/if}}
  </template>
}

interface GroupSignature {
  Element: HTMLAnchorElement | HTMLDivElement;
  Args: {
    active?: boolean;
    disabled?: boolean;
    route?: string;
    url?: string;

    onClick?: (evt: MouseEvent) => unknown;
  };
  Blocks: {
    header: [];
    items: [ComponentLike<ItemSignature>];
  };
}

class Group extends Component<GroupSignature> {
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
  };

  <template>
    {{#if (has-block "header")}}
      {{#if @route}}
        <LinkTo
          class={{this.classes}}
          @disabled={{@disabled}}
          @route={{@route}}
          ...attributes
        >
          <span>
            {{yield to="header"}}
          </span>
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
        </div>
      {{/if}}
    {{/if}}
    {{#if (has-block "items")}}
      {{yield Item to="items"}}
    {{/if}}
  </template>
}

export interface SidebarSignature {
  Element: HTMLDivElement;
  Args: {
    sticky?: boolean;
  };
  Blocks: {
    default: [
      {
        Group: ComponentLike<GroupSignature>;
        Item: ComponentLike<ItemSignature>;
      },
    ];
    footer: [ComponentLike<ItemSignature>];
  };
}

const Sidebar: TOC<SidebarSignature> = <template>
  <div class="sidebar card justify-content-between overflow-auto" ...attributes>
    <div class="list-group d-flex flex-column">
      {{yield (hash Group=Group Item=(component Item header=true))}}
    </div>
    {{#if (has-block "footer")}}
      <div class="list-group d-flex flex-column footer">
        {{yield Item to="footer"}}
      </div>
    {{/if}}
  </div>
</template>;

export default Sidebar;
