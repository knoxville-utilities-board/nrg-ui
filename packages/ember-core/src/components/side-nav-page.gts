import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import Header from './header.gts';
import ThemeSwitcher from './theme-switcher.gts';

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';

interface ItemSignature {
  Element:HTMLDivElement;
  Args: {
    route: string;
    display: string;
  };
}

const Item: TOC<ItemSignature> = <template>
     <li class="list-group-item list-group-item-action px-0">
      <a class="nav-link" aria-current="page" href="{{@route}}">
        {{@display}}
      </a>
    </li>
</template>;

 interface GroupItemSignature {
   Element: HTMLDivElement;
   Args: {
     route: string;
     display: string;
   };
 }

 const GroupItem: TOC<GroupItemSignature> = <template>
  <a
    class="nav-link list-group-item-child-route"
    aria-current="page"
    href="{{@route}}"
  >
      {{@display}}
  </a>
</template>;

interface GroupSignature {
  Element: HTMLDivElement;
  Args: {
    route?: string;
    display: string;
  };
  Blocks: {
    default: [
      {
        Item: ComponentLike<GroupItemSignature>;
      }
    ]
  };
}

const Group: TOC<GroupSignature> = <template>
<div class="list-group-item px-0">
  {{#if @route}}
    <a
      href="{{@route}}"
      class="nav-link list-group-item-subheading"
    >
      {{@display}}
    </a>
  {{else}}
    <div class="nav-link list-group-item-subheading">
      {{@display}}
    </div>
  {{/if}}
  {{yield (hash Item=(component GroupItem)) to="default"}}
  </div>
</template>;


export interface SideNavPageSignature {
  Args: {
    themeSwitcher?: boolean;
  };
  Blocks: {
    default: [];
    brand: [];
    right: [];
    main: [];
    nav: [
      {
        Item: ComponentLike<ItemSignature>;
        Group: ComponentLike<GroupSignature>;
      }
    ]
  };
  Element: HTMLElement;
}

export default class SideNavPage extends Component<SideNavPageSignature> {
  @tracked
  collapsed = false;

  @action
  toggleSideNav() {
    this.collapsed = !this.collapsed;
  }

  <template>
    <main class="vh-100 d-flex flex-column overflow-hidden">
      <Header
        class="navbar border-bottom border-1 sticky top"
      >
        <:left>
          <button class="btn p-0" type="button" {{on "click" this.toggleSideNav}}>
            <i class="fs-3 bi bi-list"></i>
          </button>
          <div class="navbar-brand flex-fill mx-2 my-0">
            {{yield to="brand"}}
          </div>
        </:left>
        <:right>
          {{#if @themeSwitcher}}
            <div class="position-absolute end-0">
              <ThemeSwitcher />
            </div>
          {{/if}}
          {{yield to="right"}}
        </:right>
      </Header>
      <div class="container-fluid d-flex flex-fill">
        <div class="row d-flex flex-fill">
          <nav
            class="collapsible-side-nav col-2 border-end border-1 overflow-y-auto h-100 {{if this.collapsed 'collapse'}}"
          >
            <ul class="list-group list-group-flush flex-column">
              {{yield
                (hash Item=(component Item) Group=(component Group))
                to="nav"
              }}
            </ul>
          </nav>
          <div class="col overflow-y-auto h-100">
            {{yield to="main"}}
          </div>
        </div>
      </div>
    </main>
  </template>
}
