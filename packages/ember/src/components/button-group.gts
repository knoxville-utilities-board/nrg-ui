import { hash } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';

import Button from './button.gts';

import type { ButtonSignature } from './button.gts';
import type { ComponentLike } from '@glint/template';

export interface ButtonGroupSignature {
  Element: HTMLDivElement;
  Args: {
    disabled?: boolean;
    label?: string;
    parent?: ButtonGroupType;
    toolbar?: boolean;
    vertical?: boolean;
    onClick?: (evt: MouseEvent) => unknown;
  };
  Blocks: {
    default: [
      {
        Button: ComponentLike<ButtonSignature>;
        SubGroup: ComponentLike<ButtonGroupSignature>;
      },
    ];
  };
}

export interface ButtonGroupType {
  onClick: (evt: MouseEvent) => unknown;
}

export default class ButtonGroupComponent
  extends Component<ButtonGroupSignature>
  implements ButtonGroupType
{
  get classList() {
    let classes = ['btn-group'];

    if (this.args.disabled) {
      classes.push('disabled');
    }

    if (this.args.vertical) {
      classes.push('btn-group-vertical');
    }

    return classes.join(' ');
  }

  get disabled() {
    return this.args.disabled || undefined;
  }

  get role() {
    if (this.args.toolbar) {
      return 'toolbar';
    }
    return 'group';
  }

  get parent() {
    return this.args.parent;
  }

  @action
  onClick(evt: MouseEvent) {
    this.args.onClick?.(evt);

    this.parent?.onClick?.(evt);
  }

  <template>
    <div
      class={{this.classList}}
      role={{this.role}}
      aria-disabled={{if this.disabled "true"}}
      aria-label={{@label}}
      ...attributes
    >
      {{yield
        (hash
          Button=(component Button group=this disabled=this.disabled)
          SubGroup=(component
            ButtonGroupComponent parent=this disabled=this.disabled
          )
        )
      }}
    </div>
  </template>
}
