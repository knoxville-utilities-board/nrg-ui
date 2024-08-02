import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { action } from '@ember/object';

interface CardSignature {
  Element: HTMLDivElement;
  Args: {
    isClickable?: boolean;
    // eslint-disable-next-line no-unused-vars
    onClick?: (evt: MouseEvent) => unknown;
    hasBorder?: boolean;
  };
  Blocks: {
    header: [];
    body: [];
  };
}

export default class Card extends Component<CardSignature> {
  get hasBorder() {
    return this.args.hasBorder == undefined ? true : this.args.hasBorder;
  }

  get borderClass() {
    return this.hasBorder ? '' : 'border-0';
  }

  @action
  onClick(evt: MouseEvent) {
    evt?.preventDefault();
    evt?.stopPropagation();

    this.args.onClick?.(evt);
  }

  <template>
    <div
      class="card p-4 shadow-sm {{this.borderClass}}"
      role={{if @isClickable "button"}}
      {{! waiting for this issue to be resolved https://github.com/typed-ember/glint/issues/661 }}
      {{! @glint-expect-error }}
      {{(if @isClickable (modifier on "click" this.onClick))}}
      ...attributes
    >
      {{#if (has-block "header")}}
        <div class="card-header bg-white">
          {{yield to="header"}}
        </div>
      {{/if}}
      {{#if (has-block "body")}}
        <div class="card-body">
          {{yield to="body"}}
        </div>
      {{/if}}
    </div>
  </template>
}
