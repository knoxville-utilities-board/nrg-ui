import { hash } from '@ember/helper';
import { LinkTo } from '@ember/routing';

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
  };
  Blocks: {
    default: [];
  };
}

const Item: TOC<ItemSignature> = <template>
  {{#if @route}}
    <LinkTo
      class={{classes
        "item list-group-item list-group-item-action"
        (if @active "active")
        (if @disabled "disabled")
        (if @header "header")
      }}
      @route={{@route}}
      ...attributes
    >
      <span>
        {{yield}}
      </span>
    </LinkTo>
  {{else if @url}}
    <a
      class={{classes
        "item list-group-item list-group-item-action"
        (if @active "active")
        (if @disabled "disabled")
        (if @header "header")
      }}
      href={{@url}}
      ...attributes
    >
      <span>
        {{yield}}
      </span>
    </a>
  {{else}}
    <div
      class={{classes
        "item list-group-item"
        (if @active "active")
        (if @disabled "disabled")
        (if @header "header")
      }}
      ...attributes
    >
      <span>
        {{yield}}
      </span>
    </div>
  {{/if}}
</template>;

interface GroupSignature {
  Element: HTMLAnchorElement | HTMLDivElement;
  Args: {
    disabled?: boolean;
    route?: string;
    url?: string;
  };
  Blocks: {
    header: [];
    items: [ComponentLike<ItemSignature>];
  };
}

const Group: TOC<GroupSignature> = <template>
  {{#if (has-block "header")}}
    {{#if @route}}
      <LinkTo
        class="item header list-group-item list-group-item-action"
        @disabled={{@disabled}}
        @route={{@route}}
        ...attributes
      >
        <span>
          {{yield to="header"}}
        </span>
      </LinkTo>
    {{else}}
      <div class="item header list-group-item" ...attributes>
        <span>
          {{yield to="header"}}
        </span>
      </div>
    {{/if}}
  {{/if}}
  {{#if (has-block "items")}}
    {{yield Item to="items"}}
  {{/if}}
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
