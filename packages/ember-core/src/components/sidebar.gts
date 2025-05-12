import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { LinkTo } from '@ember/routing';
import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { classes } from '../helpers/classes.ts';

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike, WithBoundArgs } from '@glint/template';

export interface DivItemSignature {
  Element: HTMLDivElement;
  Args: {
    classes?: string;
    onClick?: (evt: MouseEvent) => unknown;
  };
  Blocks: {
    default: [];
  };
}

class DivItem extends Component<DivItemSignature> {
  onClick = (evt: MouseEvent) => {
    if (this.args.onClick) {
      this.args.onClick(evt);
    }
  };

  <template>
    <div
      class={{@classes}}
      {{! @glint-expect-error - Known Glint issue - #661 }}
      {{(if @onClick (modifier on "click" this.onClick))}}
      ...attributes
    >
      {{yield}}
    </div>
  </template>
}

export interface RouteItemSignature {
  Element: HTMLAnchorElement;
  Args: {
    collapsible?: boolean;
    classes?: string;
    route: string;
    onClick?: (evt: MouseEvent) => unknown;
  };
  Blocks: {
    default: [];
  };
}

class RouteItem extends Component<RouteItemSignature> {
  @tracked
  isCollapsed = false;

  onClick = (evt: MouseEvent) => {
    if (this.args.onClick) {
      this.args.onClick(evt);
    }
  };

  toggleCollapse = () => {
    this.isCollapsed = !this.isCollapsed;
    this.args.onClick?.(new MouseEvent('click'));
  }

  <template>
    <div class="d-flex justify-content-between align-items-center">
      <LinkTo
        class={{@classes}}
        @route={{@route}}
        {{on "click" this.onClick}}
        ...attributes
      >
        {{yield}}
      </LinkTo>
      {{#if @collapsible}}
        <div role="button" {{on "click" this.toggleCollapse}}>
          <span class={{classes "bg-body accordion-button p-0 border-bottom-0" (if this.isCollapsed "collapsed")}}>
          </span>
        </div>
      {{/if}}
    </div>
  </template>
}

export interface UrlItemSignature {
  Element: HTMLAnchorElement;
  Args: {
    classes?: string;
    url: string;
    onClick?: (evt: MouseEvent) => unknown;
  };
  Blocks: {
    default: [];
  };
}

class UrlItem extends Component<UrlItemSignature> {
  onClick = (evt: MouseEvent) => {
    if (this.args.onClick) {
      this.args.onClick(evt);
    }
  };

  <template>
    <a
      class={{@classes}}
      href={{@url}}
      {{on "click" this.onClick}}
      ...attributes
    >
      {{yield}}
    </a>
  </template>
}

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
      <RouteItem @classes={{this.classes}} @route={{@route}} @onClick={{this.onClick}} ...attributes>
        <span>
          {{yield}}
        </span>
        {{#if (has-block "badge")}}
          <span class="badge rounded-pill">
            {{yield to="badge"}}
          </span>
        {{/if}}
      </RouteItem>
    {{else if @url}}
      <UrlItem @classes={{this.classes}} @url={{@url}} @onClick={{this.onClick}} ...attributes>
        <span>
          {{yield}}
        </span>
        {{#if (has-block "badge")}}
          <span class="badge rounded-pill">
            {{yield to="badge"}}
          </span>
        {{/if}}
      </UrlItem>
    {{else}}
      <DivItem @classes={{this.classes}} @onClick={{this.onClick}} ...attributes>
        <span>
          {{yield}}
        </span>
        {{#if (has-block "badge")}}
          <span class="badge rounded-pill">
            {{yield to="badge"}}
          </span>
        {{/if}}
      </DivItem>
    {{/if}}
  </template>
}

export interface CollapsibleGroupSignature {
  Element: HTMLDivElement;
  Args: {
    active?: boolean;
    collapsible?: boolean;
    isCollapsed?: boolean;
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

// class CollapsibleGroup extends Component<CollapsibleGroupSignature> {
//   get classes() {
//     const hasRoute = Boolean(this.args.route);
//     const hasUrl = Boolean(this.args.url);
//     const hasClickListener = Boolean(this.args.onClick) && !this.args.disabled;
//     const canBeClicked = hasRoute || hasUrl || hasClickListener;

//     return classes(
//       'item list-group-item header d-flex justify-content-between align-items-center',
//       this.args.active ? 'active' : '',
//       this.args.disabled ? 'disabled' : '',
//       canBeClicked ? 'list-group-item-action' : '',
//     );
//   }

//   onClick = (evt: MouseEvent) => {
//     if (this.args.active || this.args.disabled) {
//       return;
//     }

//     this.args.onClick?.(evt);
//     this.args.onClickInternal?.(evt);
//   };

//   <template>
//     <div class={{classes (if @collapsible "accordion accordion-item")}}>
//       {{#if (has-block "header")}}
//         <div
//           role="button"
//           class={{classes "ember-view item list-group-item header d-flex justify-content-between align-items-center list-group-item-action bg-body" (if @collapsible "accordion-button") (if @isCollapsed "collapsed")}}
//           {{on "click" this.onClick}}
//         >
//           {{yield to="header"}}
//         </div>
//       {{/if}}
//       {{#if (has-block "items")}}
//         <div class={{classes (if @collapsible "accordion-collapse") (if @isCollapsed "collapse")}}>
//         {{yield (component Item onClickInternal=@onClickInternal) to="items"}}
//         </div>
//       {{/if}}
//     </div>
//   </template>
// }

export interface GroupSignature {
  Element: HTMLAnchorElement | HTMLDivElement;
  Args: {
    active?: boolean;
    collapsible?: boolean;
    isCollapsed?: boolean;
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
      // this.args.collapsible ? 'bg-body accordion-button' : '',
      // this.args.collapsible && this.args.isCollapsed ? 'collapsed' : '',
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
    <div style={{if @collapsible (htmlSafe "--bs-accordion-border-width: 0px")}} class={{classes (if @collapsible "accordion accordion-item")}}>
      {{#if (has-block "header")}}
        {{#if @route}}
          <RouteItem @classes={{this.classes}} @route={{@route}} @onClick={{this.onClick}} @collapsible={{@collapsible}} ...attributes>
            <span>
              {{yield to="header"}}
            </span>
            {{#if (has-block "badge")}}
              <span class="badge rounded-pill">
                {{yield to="badge"}}
              </span>
            {{/if}}
          </RouteItem>
        {{else if @url}}
          <UrlItem @classes={{this.classes}} @url={{@url}} @onClick={{this.onClick}} ...attributes>
            <span>
              {{yield to="header"}}
            </span>
            {{#if (has-block "badge")}}
              <span class="badge rounded-pill">
                {{yield to="badge"}}
              </span>
            {{/if}}
          </UrlItem>
        {{else}}
         <DivItem @classes={{this.classes}} @onClick={{this.onClick}} ...attributes>
          <span>
            {{yield to="header"}}
          </span>
          {{#if (has-block "badge")}}
            <span class="badge rounded-pill">
              {{yield to="badge"}}
            </span>
          {{/if}}
        </DivItem>
        {{/if}}
      {{/if}}
      {{#if (has-block "items")}}
        <div class={{classes (if @collapsible "accordion-collapse") (if @isCollapsed "collapse")}}>
          {{yield (component Item onClickInternal=@onClickInternal) to="items"}}
        </div>
      {{/if}}
    </div>
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
