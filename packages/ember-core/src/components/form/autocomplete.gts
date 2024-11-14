import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { restartableTask, timeout } from 'ember-concurrency';
import onKey from 'ember-keyboard/modifiers/on-key';

import InputField from './-private/input-field.ts';
import onClickOutside from '../../modifiers/on-click-outside.ts';


import type { Optional } from '../../';

interface AutocompleteItemSignature {
  Args: {
    currentValue: string;
    index: number;
    activeIndex?: number;
  };
  Element: HTMLLIElement;
}

class AutocompleteItem extends Component<AutocompleteItemSignature> {
  @tracked
  active = true;

  get isActiveIndex() {
    return this.args.activeIndex === this.args.index;
  }

  <template>
    <li class="dropdown-item {{if this.isActiveIndex "active"}}" role="option" ...attributes>{{this.args.currentValue}}</li>
  </template>
}

export interface AutocompleteSignature {
  Args: {
    format?: ((value: Optional<string>) => string) | false;
    loading?: boolean;
    items: string[];
  };
  Element: HTMLInputElement;
}

export default class Autocomplete extends InputField<AutocompleteSignature> {
  @tracked
  activeIndex = -1;

  @tracked
  isFocused = false;

  @tracked
  searchString = '';

  @tracked
  showSuggestions = false;

  @tracked
  searchRunning = false;

  get loading() {
    return this.args.loading || this.searchRunning;
  }

  get disabled() {
    return this.args.disabled;
  }

  toggleFocus(focus: boolean) {
    this.isFocused = focus;
  }

  @action
  selectItem(index: number, evt?: Event) {
    evt?.preventDefault();
    evt?.stopPropagation();

    this.value = this.args.items[index] ?? '';
    this.searchString = this.value;

    this.activeIndex = index;

    this.onBlur();
  }

  @action
  onFocus() {
    this.isFocused = true;
  }

  @action
  onBlur() {
    this.isFocused = false;
    this.showSuggestions = false;
  }

  @action
  async search(evt: Event) {
    this.onFocus();

    this.showSuggestions = false;

    this.searchString = (evt.target as HTMLInputElement).value;
    this.value = '';

    if (this.searchString.length === 0) {
      this.activeIndex = -1;
      return;
    }

    this.searchRunning = true;

    await timeout(500);

    await this.onQuery.perform();

    this.showSuggestions = true;
    this.searchRunning = false;
  }

  @action
  moveUp(evt: KeyboardEvent) {
    evt.preventDefault();
    evt.stopPropagation();

    if (!this.showSuggestions) {
      return;
    }

    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
}

  @action
  moveDown(evt: KeyboardEvent) {
    evt.preventDefault();
    evt.stopPropagation();

    if (!this.showSuggestions) {
      return;
    }

    if (this.activeIndex < this.args.items.length - 1) {
      this.activeIndex++;
    }
  }

  @action
  enterKeyHandler(evt?: KeyboardEvent) {
    evt?.preventDefault();
    evt?.stopPropagation();

    if (!this.showSuggestions) {
      return;
    }

    if (this.activeIndex == -1) {
      return;
    }

    this.selectItem(this.activeIndex);

    this.onBlur();
  }

  @action
  exitKeyHandler(evt?: KeyboardEvent) {
    evt?.preventDefault();
    evt?.stopPropagation();

    if (!this.showSuggestions) {
      return;
    }

    this.onBlur();
  }

  onQuery = restartableTask(async () => {
    await timeout(1500);
  });

  <template>
    <div
      {{onClickOutside this.onBlur}}
      {{onKey "ArrowUp" this.moveUp onlyWhenFocused=true}}
      {{onKey "ArrowDown" this.moveDown onlyWhenFocused=true}}
      {{onKey "Enter" this.enterKeyHandler onlyWhenFocused=true}}
      {{onKey "Space" this.enterKeyHandler onlyWhenFocused=true}}
      {{onKey "NumpadEnter" this.enterKeyHandler onlyWhenFocused=true}}
      {{onKey "Tab" this.exitKeyHandler onlyWhenFocused=true}}
      {{onKey "Escape" this.exitKeyHandler onlyWhenFocused=true}}
    >
      <div class="input-group">
        {{#unless @basic}}
          <span class="input-group-text">
            {{#if this.loading}}
              <span class="spinner-border spinner-border-sm"/>
            {{else}}
              <i class="bi bi-search"/>
            {{/if}}
          </span>
        {{/unless}}
        <input
          aria-describedby={{@describedBy}}
          id={{@id}}
          class={{this.classList}}
          disabled={{this.disabled}}
          readonly={{@readonly}}
          type="text"
          value={{this.searchString}}
          {{on "input" this.search}}
          {{on "focus" this.onFocus}}
          ...attributes
        />
      </div>
      <div class="dropdown">
        <ul
          class="dropdown-menu mt-1 w-100 {{if this.showSuggestions 'show'}}"
          role="listbox"
        >
          {{#each @items as |item index|}}
            <AutocompleteItem
              @currentValue={{item}}
              @index={{index}}
              @activeIndex={{this.activeIndex}}
              {{on "click" (fn this.selectItem index)}}
            />
          {{/each}}
        </ul>
      </div>
    </div>
  </template>
}
