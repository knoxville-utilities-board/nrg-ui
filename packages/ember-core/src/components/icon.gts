import Component from '@glimmer/component';

import type { IconType } from '../';

export type SubtleColorType =
  | 'primary-subtle'
  | 'secondary-subtle'
  | 'success-subtle'
  | 'danger-subtle'
  | 'warning-subtle'
  | 'info-subtle'
  | 'light-subtle'
  | 'dark-subtle';

export type ColorType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

export type SizeType = '1' | '2' | '3' | '4' | '5' | '6';

export interface IconSignature {
  Element: HTMLDivElement;
  Args: {
    type: IconType;
    backgroundColor?: SubtleColorType | ColorType;
    size?: SizeType;
    color?: ColorType;
    circular?: boolean;
  };
}

export default class Icon extends Component<IconSignature> {
  get color() {
    return this.args.color || 'reset';
  }

  get backgroundColor() {
    if (this.args.backgroundColor) {
      return this.args.backgroundColor;
    }
    if (!this.args.color) {
      return 'transparent';
    }
    return `${this.args.color}-subtle`;
  }

  get fontSizeClass() {
    return `fs-${this.args.size ?? '2'}`;
  }

  get classList() {
    const classes = ['d-flex', 'justify-content-center', this.fontSizeClass];
    if (this.args.circular) {
      classes.push('rounded-circle', 'p-3', `bg-${this.backgroundColor}`);
    }
    return classes.join(' ');
  }

  <template>
    <div class="d-flex" ...attributes>
      <div class={{this.classList}}>
        <i class="bi {{@type}} text-{{this.color}}" />
      </div>
    </div>
  </template>
}
