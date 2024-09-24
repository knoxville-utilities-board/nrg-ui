import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

interface FaqSignature {
  Element: HTMLDivElement;
  Args: {
    question: string;
    defaultOpen?: boolean;
  };
  Blocks: {
    answer: [];
  };
}

export default class FaqComponent extends Component<FaqSignature> {
  @tracked
  isMenuOpen = this.args.defaultOpen || false;

  @action
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  get question() {
    return this.args.question;
  }

  get classList() {
    let classes = ['collapse'];
    if (this.isMenuOpen) {
      classes.push('show');
    }
    return classes.join(' ');
  }

  get menuIcon() {
    return this.isMenuOpen ? 'bi-dash' : 'bi-plus';
  }

  <template>
    <div class="d-flex flex-column p-2 m-2 rounded" ...attributes>
      <div class="d-flex justify-content-between align-items-center">
        <p class="fw-bold m-2">{{this.question}}</p>
        <button type="button" class="btn" {{on "click" this.toggleMenu}}><i
            class="h2 {{this.menuIcon}}"
          /></button>
      </div>
      <div class="mx-2 mb-0 mt-2 {{this.classList}}">
        {{yield to="answer"}}
      </div>
    </div>
  </template>
}
