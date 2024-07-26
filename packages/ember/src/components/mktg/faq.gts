import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { on } from '@ember/modifier';

interface FaqSignature {
  Element: HTMLDivElement;
  Args: {
    question?: string;
    answer?: string;
    open?: boolean;
  };
}

export default class FaqComponent extends Component<FaqSignature> {
  @tracked
  isMenuOpen = this.args.open || false;

  @action
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  get question() {
    return this.args.question;
  }

  get answer() {
    return this.args.answer;
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
    <div class="d-flex flex-column p-2 m-2 bg-white rounded" ...attributes>
      <div
        role="button"
        class="d-flex justify-content-between align-items-center"
        {{on "click" this.toggleMenu}}
      >
        <p class="fw-bold m-2">{{this.question}}</p>
        <i class="text-dark h2 {{this.menuIcon}}" />
      </div>
      <div class="{{this.classList}}">
        <p class="m-2">{{this.answer}}</p>
      </div>
    </div>
  </template>
}
