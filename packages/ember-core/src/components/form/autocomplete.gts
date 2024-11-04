import Component from '@glimmer/component';
import { eq } from 'ember-truth-helpers';

export interface AutocompleteSignature {
  Args: {
    loading?: boolean;
    searchIconPosition?: 'left' | 'right';
  };
  Blocks: {
    default: [];
  };
  Element: null;
}

export default class FormAutocomplete extends Component<AutocompleteSignature> {
  get classList() {
    const classes = ['input-group', 'd-flex', 'align-items-center'];

    return classes.join(' ');
  }

  get searchIconPosition() {
    return this.args.searchIconPosition;
  }

  <template>
    <div class={{this.classList}}>
      {{#if (eq this.searchIconPosition 'left')}}
        <span class="input-group-text bg-transparent border-end-0">
          {{#if @loading}}
            <span class="spinner-border spinner-border-sm m-1" />
          {{else}}
            <i class="bi bi-search m-1" />
          {{/if}}
        </span>
      {{/if}}
      <input type="text" class="form-control
        {{if (eq this.searchIconPosition 'left') 'border-start-0'}}
        {{if (eq this.searchIconPosition 'right') 'border-end-0'}}
      " >
      {{#if (eq this.searchIconPosition 'right')}}
        <span class="input-group-text bg-transparent border-start-0">
          {{#if @loading}}
            <span class="spinner-border spinner-border-sm m-1" />
          {{else}}
            <i class="bi bi-search m-1" />
          {{/if}}
        </span>
      {{/if}}
    </div>
  </template>
}
