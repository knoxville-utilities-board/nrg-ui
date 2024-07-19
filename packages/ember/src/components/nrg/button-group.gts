import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import { action } from '@ember/object';

import NrgButton from './button.gts';
import type { ComponentLike } from '@glint/template';

declare interface ButtonGroupSignature {
  Element: HTMLDivElement;
  Args: {
    disabled?: boolean;
    label?: string;
    parent?: ButtonGroupComponent;
    toolbar?: boolean;
    vertical?: boolean;
    // eslint-disable-next-line no-unused-vars
    onClick?: (evt: MouseEvent) => unknown;
  };
  Blocks: {
    default: [
      {
        Button: ComponentLike<NrgButton>;
        SubGroup: ComponentLike<ButtonGroupComponent>;
      },
    ];
  };
}

export default class ButtonGroupComponent extends Component<ButtonGroupSignature> {
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

    let { parent } = this;

    while (parent) {
      parent.onClick?.(evt);
      parent = parent.parent;
    }
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
          Button=(component
            NrgButton group=this disabled=this.disabled onClick=this.onClick
          )
          SubGroup=(component
            ButtonGroupComponent
            parent=this
            disabled=this.disabled
            onClick=this.onClick
          )
        )
      }}
    </div>
  </template>
}
