import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export const typeBorder = 'border';
export const typeGrowing = 'growing';

interface LoadingIndicatorSignature {
  Element: HTMLDivElement;
  Args: {
    label?: string;
    showLabel?: boolean;
    type?: typeof typeBorder | typeof typeGrowing;
  };
}

export default class LoadingIndicatorComponent extends Component<LoadingIndicatorSignature> {
  get typeClass() {
    const { type } = this.args;
    assert(
      'type must be either `border` or `growing`',
      type === undefined || type === typeBorder || type === typeGrowing,
    );

    if (type === typeGrowing) {
      return 'spinner-growing';
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
