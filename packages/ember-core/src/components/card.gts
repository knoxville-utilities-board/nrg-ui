import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';

export interface CardSignature {
  Element: HTMLDivElement;
  Args: {
    isClickable?: boolean;
    onClick?: (evt: MouseEvent) => unknown;
    hasBorder?: boolean;
    hasHorizontalDivider?: boolean;
  };
  Blocks: {
    header: [];
    body: [];
  };
}

export default class Card extends Component<CardSignature> {
  get hasBorder() {
    return this.args.hasBorder ?? true;
  }
  get hasHorizontalDivider() {
    return this.args.hasHorizontalDivider ?? true;
  }

  @action
  onClick(evt: MouseEvent) {
    evt?.preventDefault();
    evt?.stopPropagation();

    this.args.onClick?.(evt);
  }

  <template>
    <div
      class="card p-2 p-md-4 shadow-sm {{unless this.hasBorder 'border-0'}}"
      role={{if @isClickable "button"}}
      {{! waiting for this issue to be resolved https://github.com/typed-ember/glint/issues/661 }}
      {{! @glint-expect-error }}
      {{(if @isClickable (modifier on "click" this.onClick))}}
      ...attributes
    >
      {{#if (has-block "header")}}
        {{#if this.hasHorizontalDivider}}
          <div class="card-header bg-body">
            {{yield to="header"}}
          </div>
        {{else}}
          <div class="card-body">
            {{yield to="header"}}
          </div>
        {{/if}}
      {{/if}}
      {{#if (has-block "body")}}
        <div class="card-body">
          {{yield to="body"}}
        </div>
      {{/if}}
    </div>
  </template>
}
