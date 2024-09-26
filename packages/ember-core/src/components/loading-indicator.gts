import { assert } from '@ember/debug';
import Component from '@glimmer/component';

export const typeBorder = 'border';
export const typeGrow = 'grow';

export interface LoadingIndicatorSignature {
  Element: HTMLDivElement;
  Args: {
    label?: string;
    showLabel?: boolean;
    type?: typeof typeBorder | typeof typeGrow;
  };
}

export default class LoadingIndicatorComponent extends Component<LoadingIndicatorSignature> {
  get typeClass() {
    const { type } = this.args;
    assert(
      'type must be either `border` or `grow`',
      type === undefined || type === typeBorder || type === typeGrow,
    );

    if (type === typeGrow) {
      return 'spinner-grow';
    }
    return 'spinner-border';
  }

  get label() {
    return this.args.label ?? 'Loading...';
  }

  <template>
    {{#if @showLabel}}
      <strong role="status">{{this.label}}</strong>
    {{/if}}
    <div
      class={{this.typeClass}}
      role={{unless @showLabel "status"}}
      aria-hidden={{if @showLabel "true"}}
      ...attributes
    >
      {{#unless @showLabel}}
        <span class="visually-hidden">{{this.label}}</span>
      {{/unless}}
    </div>
  </template>
}
