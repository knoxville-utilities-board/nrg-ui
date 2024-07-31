import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Button from '../button.gts';

export interface NavbarSignature {
  Element: HTMLElement;
  Args: {
    logoUrl: string;
    logoPath: string;
    logoAlt: string;
  };
  Blocks: {
    default: [];
    brand: [];
    'desktop-action-button': [ComponentLike<Button>];
    'mobile-action-button': [ComponentLike<Button>];
  };
}

export default class NavbarComponent extends Component<NavbarSignature> {
  @tracked
  isMenuOpen = false;

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
    <nav class="navbar navbar-expand-lg navbar-light bg-primary">
      {{yield to="brand"}}
      {{yield (component Button) to="mobile-action-button"}}
      <button
        class="navbar-toggler mx-5"
        type="button"
        aria-expanded={{this.menuOpen}}
        aria-label="Toggle context menu"
        {{on "click" this.toggleMenu}}
      >
        <span class={{this.menuIcon}} />
      </button>
      <div class={{this.classList}}>
        <ul class="navbar-nav text-center">
          {{yield}}
        </ul>
      </div>
      {{yield (component Button) to="desktop-action-button"}}
    </nav>
  </template>
}
