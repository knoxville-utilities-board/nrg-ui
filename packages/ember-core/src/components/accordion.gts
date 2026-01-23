import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export interface AccordionSignature {
  Element: HTMLDivElement;
  Args: {
    title?: string;
    defaultOpen?: boolean;
  };
  Blocks: {
    content: [];
    title: [];
  };
}

export default class Accordion extends Component<AccordionSignature> {
  @tracked
  isMenuOpen = this.args.defaultOpen || false;

  @action
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  get classList() {
    const classes = ['collapse'];
    if (this.isMenuOpen) {
      classes.push('show');
    }
    return classes.join(' ');
  }

  get menuIcon() {
    return this.isMenuOpen ? 'bi-caret-down-fill' : 'bi-caret-left-fill';
  }

  <template>
    <div class="d-flex flex-column p-2 m-2 rounded" ...attributes>
      <button
        class="d-flex justify-content-between align-items-center p-0 border-0 bg-transparent"
        type="button"
        {{on "click" this.toggleMenu}}
      >
        {{#if (has-block "title")}}
          {{yield to="title"}}
        {{else}}
          <p class="fw-bold m-2">{{@title}}</p>
        {{/if}}
        <i class="p {{this.menuIcon}}" />
      </button>
      <div class="mx-2 mb-0 mt-2 {{this.classList}}">
        {{yield to="content"}}
      </div>
    </div>
  </template>
}
