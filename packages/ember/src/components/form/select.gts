import { action } from '@ember/object';

// @ts-expect-error Glimmer doesn't currently ship a type for the `cached` decorator
// https://github.com/glimmerjs/glimmer.js/issues/408
import { tracked, cached } from '@glimmer/tracking';

import { on } from '@ember/modifier';
import BoundValue from './bound-value.ts';
import { fn } from '@ember/helper';
import { eq } from 'ember-truth-helpers';
import { get } from '@ember/object';

import type { Optional } from '../../types.d.ts';

declare type SelectOption<T> = {
  label: string;
  value: string | T;
  raw: T;
};

export interface SelectSignature<T> {
  Args: {
    disabled?: boolean;
    loading?: boolean;
    defaultText?: string;
    options: T[];
    displayPath?: string;
    serializationPath?: string | null;
  };
  Blocks: {
    display?: [T | undefined];
    option?: [T | undefined];
    empty?: [];
  };
  Element: HTMLInputElement;
}

const baseDefaultText = 'Select an Option'; // TODO i18n

export default class Select<T> extends BoundValue<
  SelectSignature<T>,
  string | T
> {
  get classList() {
    let classes = ['form-control'];

    if (!this.args.loading) {
      classes.push('form-select');
    }

    return classes.join(' ');
  }

  get defaultText() {
    return this.args.defaultText ?? baseDefaultText;
  }

  @tracked
  isOpen = false;

  @action
  toggleSelect(evt: MouseEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  @action
  onSelectInternal(option: SelectOption<T>) {
    this.isOpen = false;
    this.selected = option;
  }

  get selected(): Optional<SelectOption<T>> {
    const found = this.internalOptions.find(
      (option) => option.value === this.value,
    );
    return found || null;
  }

  set selected(option: SelectOption<T>) {
    this.onChange(option.value);
  }

  get hasSelected() {
    return !!this.selected;
  }

  @cached
  get internalOptions(): SelectOption<T>[] {
    if (!this.args.options) {
      return [];
    }
    return this.args.options.map((option) => {
      if (typeof option !== 'object') {
        return {
          raw: option,
          label: option as string,
          value: option as string,
        };
      }

      const label = get(option, this.args.displayPath ?? 'label') as string;
      let value: string | T = option;
      // null valuePath results in value being the raw option
      if (this.args.serializationPath !== null) {
        value = get(option, this.args.serializationPath ?? 'value') as string;
      }
      return {
        raw: option,
        label,
        value,
      };
    });
  }

  @action
  onBlur() {
    this.isOpen = false;
  }

  get stringValue() {
    return this.value;
  }

  get disabled() {
    return this.args.disabled || this.args.loading;
  }

  <template>
    <div class="dropdown">
      <div class="input-group">
        {{#if @loading}}
          <span class="input-group-text">
            <span
              class="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </span>
        {{/if}}

        <div
          class={{this.classList}}
          {{on "click" this.toggleSelect}}
          role="button"
        >
          {{#if this.hasSelected}}
            {{#if (has-block "display")}}
              {{yield this.selected.raw to="display"}}
            {{else if (has-block "option")}}
              {{yield this.selected.raw to="option"}}
            {{else}}
              {{this.selected.label}}
            {{/if}}
          {{else}}
            {{#if (has-block "empty")}}
              {{yield to="empty"}}
            {{else}}
              {{this.defaultText}}
            {{/if}}
          {{/if}}
        </div>
      </div>
      <ul class="dropdown-menu {{if this.isOpen 'show'}}">
        {{#each this.internalOptions as |option|}}
          <li
            class="dropdown-item {{if (eq option.value this.value) 'active'}}"
            {{on "click" (fn this.onSelectInternal option)}}
            role="button"
          >
            {{#if (has-block "option")}}
              {{yield option.raw to="option"}}
            {{else}}
              {{option.label}}
            {{/if}}
          </li>
        {{/each}}
      </ul>
    </div>
  </template>
}
