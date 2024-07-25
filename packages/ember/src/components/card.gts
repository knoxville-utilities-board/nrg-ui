import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { action } from '@ember/object';

interface CardSignature {
  Element: HTMLDivElement;
  Args: {
    // eslint-disable-next-line no-unused-vars
    onClick?: (evt: MouseEvent) => unknown;
  };
  Blocks: {
    'card-header': [];
    'card-body': [];
  };
}

export default class Card extends Component<CardSignature> {
  @action
  onClick(evt: MouseEvent) {
    evt?.preventDefault();
    evt?.stopPropagation();

    this.args.onClick?.(evt);
  }

  <template>
    <div class="card p-4 shadow-sm" {{on "click" this.onClick}} ...attributes>
      {{#if (has-block "card-header")}}
        <div class="card-header bg-white">
          {{yield to="card-header"}}
        </div>
      {{/if}}
      {{#if (has-block "card-body")}}
        <div class="card-body">
          {{yield to="card-body"}}
        </div>
      {{/if}}
    </div>
  </template>
}
