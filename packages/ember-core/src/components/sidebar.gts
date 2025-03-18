import { hash } from '@ember/helper';
import { LinkTo } from '@ember/routing';
import Component from '@glimmer/component';

import classes from '../helpers/classes.ts';

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';

interface SidebarGroupItemSignature {
  Element: HTMLAnchorElement;
  Args: {
    route: string;
  };
  Blocks: {
    default: [];
    group: [
      {
        Group: ComponentLike<SidebarGroupSignature>;
      },
    ];
  };
}

const GroupItem: TOC<SidebarGroupItemSignature> = <template>
  {{#if (has-block "group")}}
    {{yield (hash Group=(component Group)) to="group"}}
  {{else}}
    <LinkTo @route={{@route}} class="list-group-item list-group-item-action">
      {{yield}}
    </LinkTo>
  {{/if}}
</template>;

interface SidebarGroupSignature {
  Element: HTMLDivElement;
  Blocks: {
    header: [];
    group: [ComponentLike<SidebarGroupItemSignature>];
  };
}

const Group: TOC<SidebarGroupSignature> = <template>
  <div class="sidebar-item">
    {{#if (has-block "header")}}
      <div class="card-header">
        {{yield to="header"}}
      </div>
    {{/if}}
    {{#if (has-block "group")}}
      <div class="list-group list-group-flush">
        {{yield (component GroupItem) to="group"}}
      </div>
    {{/if}}
  </div>
</template>;

export interface SidebarSignature {
  Element: HTMLDivElement;
  Args: {
    header?: string;
    sticky?: boolean;
  };
  Blocks: {
    default: [
      {
        Item: ComponentLike<SidebarGroupItemSignature>;
        Group: ComponentLike<SidebarGroupSignature>;
      },
    ];
  };
}

export default class Sidebar extends Component<SidebarSignature> {
  get sticky() {
    return this.args.sticky ?? true;
  }

  <template>
    <div
      class={{classes "sidebar card" (if this.sticky "sticky-top")}}
      ...attributes
    >
      <div class="d-flex flex-column align-items-stretch">
        {{yield (hash Item=(component GroupItem) Group=(component Group))}}
      </div>
    </div>
  </template>
}
