import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { LinkTo } from '@ember/routing';
import Component from '@glimmer/component';
import { or } from 'ember-truth-helpers';

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';

export interface SidebarSignature {
  Element: HTMLDivElement;
  Args: {
    appReloadLocation?: string;
    onClickInternal?: (evt: MouseEvent) => void;
  };
  Blocks: {
    default: [
      {
        Item: ComponentLike<SidebarItemSignature>;
        Group: ComponentLike<SidebarGroupSignature>;
      },
    ];
    footer: [
      {
        Item: ComponentLike<SidebarItemSignature>;
        Group: ComponentLike<SidebarGroupSignature>;
      },
    ];
  };
}

const Sidebar: TOC<SidebarSignature> = <template>
  <div class="sidebar" ...attributes>
    {{#if (has-block "logo")}}
      {{yield to="logo"}}
    {{/if}}

    <ul class="list-unstyled">
      {{yield
        (hash
          Item=(component SidebarItem onClickInternal=@onClickInternal)
          Group=(component SidebarGroup onClickInternal=@onClickInternal)
        )
      }}
    </ul>

    {{#if (has-block "footer")}}
      <ul class="list-unstyled">
        {{yield
          (hash
            Item=(component SidebarItem onClickInternal=@onClickInternal)
            Group=(component SidebarGroup onClickInternal=@onClickInternal)
          )
          to="footer"
        }}
      </ul>
    {{/if}}
  </div>
</template>;
export default Sidebar;

interface SidebarGroupSignature {
  Element: HTMLLIElement;
  Args: {
    url?: string;
    route?: string;
    header: string;
    onClick?: (evt: MouseEvent) => void;
    onClickInternal?: (evt: MouseEvent) => void;
  };
  Blocks: {
    default: [];
    group: [ComponentLike<SidebarItemSignature>];
  };
}

const SidebarGroup: TOC<SidebarGroupSignature> = <template>
  <li class="sidebar-group" ...attributes>
    <strong>
      {{#if (or @url @route)}}
        <NavItem
          @url={{@url}}
          @route={{@route}}
          @onClick={{@onClick}}
          @onClickInternal={{@onClickInternal}}
        >
          {{@header}}
        </NavItem>
      {{else}}
        <span>{{@header}}</span>
      {{/if}}
    </strong>

    <ul class="list-unstyled">
      {{yield
        (component SidebarItem onClickInternal=@onClickInternal)
        to="group"
      }}
    </ul>
  </li>
</template>;

interface SidebarItemSignature {
  Element: HTMLAnchorElement;
  Args: {
    url?: string;
    route?: string;
    onClick?: (evt: MouseEvent) => void;
    onClickInternal?: (evt: MouseEvent) => void;
  };
  Blocks: {
    default?: [];
  };
}

const SidebarItem: TOC<SidebarItemSignature> = <template>
  <li class="sidebar-item">
    <NavItem
      @url={{@url}}
      @route={{@route}}
      @onClick={{@onClick}}
      @onClickInternal={{@onClickInternal}}
      ...attributes
    >
      {{yield}}
    </NavItem>
  </li>
</template>;

interface NavItemSignature {
  Element: HTMLAnchorElement;
  Args: {
    url?: string;
    route?: string;
    onClick?: (evt: MouseEvent) => void;
    onClickInternal?: (evt: MouseEvent) => void;
  };
  Blocks: {
    default?: [];
  };
}

class NavItem extends Component<NavItemSignature> {
  get url() {
    return this.args.url ?? '';
  }

  @action
  onClick(evt: MouseEvent) {
    if (!this.args.url && !this.args.route) {
      evt.preventDefault();
      evt.stopPropagation();
    }
    this.args.onClick?.(evt);
    this.args.onClickInternal?.(evt);
  }

  <template>
    {{#if @route}}
      <LinkTo
        class="rounded"
        @route={{@route}}
        {{on "click" this.onClick}}
        ...attributes
      >
        {{yield}}
      </LinkTo>
    {{else}}
      <a
        class="rounded"
        href={{this.url}}
        target="_blank"
        rel="noopener noreferrer"
        {{on "click" this.onClick}}
        ...attributes
      >
        {{yield}}
        {{#if this.url}}
          <i class="right icon external default-external-icon"></i>
        {{/if}}
      </a>
    {{/if}}
  </template>
}
