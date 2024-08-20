import { hash } from '@ember/helper';
import { LinkTo } from '@ember/routing';

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';

interface SidebarGroupItemSignature {
  Element: HTMLAnchorElement;
  Args: {
    name: string;
    route: string;
  };
}

const GroupItem: TOC<SidebarGroupItemSignature> = <template>
  <LinkTo @route={{@route}} class="list-group-item list-group-item-action">
    {{@name}}
  </LinkTo>
</template>;

interface SidebarGroupSignature {
  Element: HTMLDivElement;
  Args: {
    header?: string;
  };
  Blocks: {
    Group: [ComponentLike<SidebarGroupItemSignature>];
  };
}

const Group: TOC<SidebarGroupSignature> = <template>
  <div class="card">
    {{#if @header}}
      <div class="card-header">
        {{@header}}
      </div>
    {{/if}}
    {{#if (has-block "group")}}
      <div class="list-group list-group-flush">
        {{yield (component GroupItem) to="group"}}
      </div>
    {{/if}}
  </div>
</template>;

interface SidebarSignature {
  Element: HTMLDivElement;
  Args: {
    header?: string;
  };
  Blocks: {
    default: [
      {
        Group: ComponentLike<SidebarGroupSignature>;
      },
    ];
  };
}

const Sidebar: TOC<SidebarSignature> = <template>
  <div class="col-12 col-md-2">
    <div class="p-3 sticky-top">
      <div class="d-flex flex-column align-items-stretch gap-2 gap-md-4">
        {{yield (hash Group=(component Group))}}
      </div>
    </div>
  </div>
</template>;

export default Sidebar;
