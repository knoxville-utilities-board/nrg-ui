import Component from '@glimmer/component';

export interface AutocompleteSignature {
  Args: {
    loading?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: null;
}

export default class FormAutocomplete extends Component<AutocompleteSignature> {
  get classList() {
    const classes = ['form-control', 'd-flex', 'align-items-center'];

    return classes.join(' ');
  }

  <template>
    <div class={{this.classList}}>
      {{#if @loading}}
        <span
          class="spinner-border spinner-border-sm float-end m-1"
          aria-hidden="true"
        ></span>
      {{else}}
        <i class="bi bi-search fs-5 m-1" />
      {{/if}}
      <input
        type="text"
        class="form-control-plaintext"
      />
    </div>
  </template>
}
