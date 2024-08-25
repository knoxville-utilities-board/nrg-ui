import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { t } from 'ember-intl';

import ResponsiveService from '../../services/responsive.ts';

export interface NavbarSignature {
  Element: HTMLElement;
  Blocks: {
    default: [];
    brand: [];
    actions: [];
  };
}

export default class NavbarComponent extends Component<NavbarSignature> {
  @tracked
  isMenuOpen = false;

  @service
  declare responsive: ResponsiveService;

  @action
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  get classList() {
    const classes = ['collapse', 'navbar-collapse'];
    if (this.isMenuOpen) {
      classes.push('show');
    }
    return classes.join(' ');
  }

  get menuOpen() {
    return this.isMenuOpen;
  }

  get menuIcon() {
    return this.menuOpen ? 'bi-x' : 'bi-list';
  }

  // TODO: --bs-navbar-toggler-focus-width: 0;

  <template>
    <nav class="navbar navbar-expand-lg navbar-light bg-primary" ...attributes>
      {{yield to="brand"}}
      {{#if this.responsive.isMobileDevice}}
        {{yield to="actions"}}
      {{/if}}
      <button
        class="navbar-toggler mx-5"
        type="button"
        aria-expanded={{this.menuOpen}}
        aria-label={{t "nrg.navbar.toggleContextMenu"}}
        {{on "click" this.toggleMenu}}
      >
        <span class={{this.menuIcon}} />
      </button>
      <div class={{this.classList}}>
        <ul class="navbar-nav text-center">
          {{yield}}
        </ul>
      </div>
      {{#unless this.responsive.isMobileDevice}}
        {{yield to="actions"}}
      {{/unless}}
    </nav>
  </template>
}
