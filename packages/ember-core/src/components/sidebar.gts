import { hash } from '@ember/helper';
import { LinkTo } from '@ember/routing';

import { classes } from '../helpers/classes.ts';

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';

interface ItemSignature {
  Element: HTMLAnchorElement | HTMLDivElement;
  Args: (
    | {
        route: string;
        url?: never;
      }
    | {
        route?: never;
        url: string;
      }
  ) & {
    active?: boolean;
    disabled?: boolean;
  };
  Blocks: {
    default: [];
    group: [
      {
        Group: ComponentLike<GroupSignature>;
      },
    ];
  };
}

const Item: TOC<ItemSignature> = <template>
  {{#if @route}}
    <LinkTo
      class="list-group-item list-group-item-action"
      @route={{@route}}
      ...attributes
    >
      {{yield}}
    </LinkTo>
  {{else if @url}}
    <a
      class={{classes
        "list-group-item list-group-item-action"
        (if @active "active")
        (if @disabled "disabled")
      }}
      href={{@url}}
      ...attributes
    >
      {{yield}}
    </a>
  {{else}}
    <div class="list-group-item list-group-item-action" ...attributes>
      {{yield}}
    </div>
  {{/if}}
  {{#if (has-block "group")}}
    {{yield (hash Group=(component Group)) to="group"}}
  {{/if}}
</template>;

interface GroupSignature {
  Element: HTMLAnchorElement;
  Args: {
    route?: string;
  };
  Blocks: {
    header: [];
    group: [ComponentLike<ItemSignature>];
  };
}

const Group: TOC<GroupSignature> = <template>
  <div class="item">
    {{#if (has-block "header")}}
      {{#if @route}}
        <LinkTo
          class="header list-group-item list-group-item-action"
          @route={{@route}}
          ...attributes
        >
          {{yield to="header"}}
        </LinkTo>
      {{else}}
        <div class="header">
          {{yield to="header"}}
        </div>
      {{/if}}
    {{/if}}
    {{#if (has-block "group")}}
      {{yield (component Item) to="group"}}
    {{/if}}
  </div>
</template>;

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
  };
}

const Sidebar: TOC<SidebarSignature> = <template>
  <div class="sidebar card" ...attributes>
    <div class="list-group d-flex flex-column overflow-auto">
      {{yield (hash Group=(component Group) Item=(component Item))}}
    </div>
  </div>
</template>;

export default Sidebar;
