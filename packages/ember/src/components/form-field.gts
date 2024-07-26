import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { hash } from '@ember/helper';
import BadSelect from './bad-select.gjs'
import TextField from './text-field.gts'

import type { ComponentLike } from '@glint/template';


declare interface FormFieldSignature {
  Element: HTMLDivElement;
  Args: {
    label?: string;
    required?: boolean;
    form?: any;
    valuePath?: string;
  };
  Blocks: {
    default: [
      {
        "text-field": ComponentLike<TextField>;
        "bad-select": ComponentLike<BadSelect>;
      },
    ];
  };

}

export default class NrgFormFieldComponent extends Component<FormFieldSignature> {
  @tracked
  fieldId = 'field-' + guidFor(this);

  @tracked
  model: any;

  <template>
    <div class="g-col-12" ...attributes >
      <label for={{this.fieldId}} class="form-label">
        {{@label}}
        {{#if @required}}<i
            class="bi bi-sm bi-asterisk"
            style="color: var(--bs-danger); font-size: 0.6rem;"
            role="img"
            aria-label="Required"
          ></i>{{/if}}
      </label>

      {{yield
        (hash
          text-field=(component
            TextField
            model=this.model
            valuePath=@valuePath
            focusId=this.fieldId
            required=@required
          )
          bad-select=(component
            BadSelect
            model=this.model
            valuePath=@valuePath
            focusId=this.fieldId
            required=@required
          )
        )
      }}
    </div>
  </template>
}
