import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';

export interface AccordionSignature {
  Element: HTMLDivElement;
  Args: {
    isOpen: boolean;
    title?: string;
    onToggle?: (isOpen: boolean) => void;
    onOpen?: () => Promise<void>;
    onClose?: () => Promise<void>;
  };
  Blocks: {
    content: [];
    title: [];
  };
}

export default class Accordion extends Component<AccordionSignature> {
  @action
  async toggleMenu() {
    const isOpening = !this.args.isOpen;

    if (isOpening) {
      await this.args.onOpen?.();
    } else {
      await this.args.onClose?.();
    }

    this.args.onToggle?.(isOpening);
  }

  get classList() {
    const classes = ['collapse'];
    if (this.args.isOpen) {
      classes.push('show');
    }
    return classes.join(' ');
  }

  get menuIcon() {
    return this.args.isOpen ? 'bi-caret-down-fill' : 'bi-caret-left-fill';
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
