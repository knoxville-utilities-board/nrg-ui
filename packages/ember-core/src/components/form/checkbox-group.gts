import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import { TrackedSet } from 'tracked-built-ins';

import Checkbox from './checkbox.gts';
import { bind } from '../../helpers/bind.ts';

import type { CheckboxSignature } from './checkbox';
import type { Binding } from '../../';
import type { ComponentLike } from '@glint/template';

export interface CheckboxGroupSignature {
  Element: HTMLDivElement;
  Args: {
    basic?: boolean;
    describedBy?: string;
    disabled?: boolean;
    id?: string;
    inline?: boolean;
    isInvalid?: boolean;
    isWarning?: boolean;
    reverse?: boolean;
    type?: 'checkbox' | 'switch';

    onInitBinding?: (binding: Binding<object>) => void;
  };
  Blocks: {
    default: [ComponentLike<CheckboxSignature>];
  };
}

export default class CheckboxGroup extends Component<CheckboxGroupSignature> {
  boxes = new TrackedSet<Checkbox>();

  constructor(owner: unknown, args: CheckboxGroupSignature['Args']) {
    super(owner, args);

    args.onInitBinding?.(bind(this, 'value'));
  }

  get value() {
    return Array.from(this.boxes)
      .filter((c) => c.value)
      .map((c) => c.args.binding!.valuePath);
  }

  get classList() {
    const classList = ['form-control'];

    if (this.args.basic) {
      classList[0] += '-plaintext';
    }

    if (this.args.isInvalid) {
      classList.push('is-invalid');
    } else if (this.args.isWarning) {
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
          disabled=@disabled
          inline=@inline
          isInvalid=@isInvalid
          isWarning=@isWarning
          reverse=@reverse
          type=@type
          onDestroy=this.unregisterCheckbox
          onInit=this.registerCheckbox
        )
      }}
    </div>
  </template>
}
