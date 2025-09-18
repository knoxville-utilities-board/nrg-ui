import { hash } from '@ember/helper';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import { runTask } from 'ember-lifeline';
import { TrackedSet } from 'tracked-built-ins';

import Checkbox from './checkbox.gts';
import { bind } from '../../helpers/bind.ts';

import type { CheckboxSignature } from './checkbox';
import type { FieldOptions } from './field.gts';
import type { Binding } from '../../';
import type Owner from '@ember/owner';
import type { ComponentLike } from '@glint/template';

export interface CheckboxGroupSignature {
  Element: HTMLDivElement;
  Args: {
    basic?: boolean;
    inline?: boolean;
    reverse?: boolean;
    type?: 'checkbox' | 'switch';

    fieldOptions?: FieldOptions;

    onInitBinding?: (binding: Binding<object>) => void;
  };
  Blocks: {
    default: [ComponentLike<CheckboxSignature>];
  };
}

export default class CheckboxGroup extends Component<CheckboxGroupSignature> {
  boxes = new TrackedSet<Checkbox>();

  constructor(owner: Owner, args: CheckboxGroupSignature['Args']) {
    super(owner, args);

    runTask(this, () => {
      args.onInitBinding?.(bind(this, 'value'));
    });
  }

  get value() {
    return Array.from(this.boxes)
      .filter((c) => c.value)
      .map((c) => c.args.binding!.valuePath);
  }

  get classList() {
    const classList = ['form-control', 'form-check-group'];

    if (this.args.basic) {
      classList[0] += '-plaintext';
    }

    if (this.args.fieldOptions?.isInvalid) {
      classList.push('is-invalid');
    } else if (this.args.fieldOptions?.isWarning) {
      classList.push('is-warning');
    }

    return classList.join(' ');
  }

  @action
  registerCheckbox(checkbox: Checkbox) {
    this.boxes.add(checkbox);
  }

  @action
  unregisterCheckbox(checkbox: Checkbox) {
    this.boxes.delete(checkbox);
  }

  <template>
    <div
      class={{this.classList}}
      style={{if @reverse (htmlSafe "padding-right: 0.75em !important")}}
      ...attributes
    >
      {{yield
        (component
          Checkbox
          fieldOptions=(hash
            describedBy=@fieldOptions.describedBy
            disabled=@fieldOptions.disabled
            isInvalid=@fieldOptions.isInvalid
            isWarning=@fieldOptions.isWarning
            required=@fieldOptions.required
          )
          inline=@inline
          reverse=@reverse
          type=@type
          onDestroy=this.unregisterCheckbox
          onInit=this.registerCheckbox
        )
      }}
    </div>
  </template>
}
