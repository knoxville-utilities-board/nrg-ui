import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { action } from '@ember/object';

interface PromoSignature {
  Element: HTMLDivElement;
  Args: {
    productName?: string;
    headerText?: string;
    // eslint-disable-next-line no-unused-vars
    onClick?: (evt: MouseEvent) => unknown;
    imageSrc?: string;
    imageAltText?: string;
  };
  Blocks: {
    header: [];
    description: [];
  };
}

export default class PromoComponent extends Component<PromoSignature> {
  @action
  onClick(evt: MouseEvent) {
    evt?.preventDefault();
    evt?.stopPropagation();

    this.args.onClick?.(evt);
  }
  <template>
    <div class="row bg-primary text-white" ...attributes>
      <div class="col-12 col-md-6 d-flex flex-column justify-content-center">
        <div class="p-3 p-md-5">
          <p class="text-uppercase p-0 my-2 fw-semibold">{{@productName}}</p>
          <div class="mb-3 fs-1 fw-semibold lh-sm">{{yield to="header"}}</div>
          {{yield to="description"}}
        </div>
      </div>
      <div class="col-12 col-md-6 p-0">
        <img
          {{! template-lint-disable "no-inline-styles" }}
          style="width: 100%; height: 100%;"
          src={{@imageSrc}}
          alt={{@imageAltText}}
        />
      </div>
    </div>
  </template>
}
