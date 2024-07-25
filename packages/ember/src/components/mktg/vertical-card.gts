import Component from '@glimmer/component';
import Card from '../card.gts';

interface VerticalCardSignature {
  Element: HTMLDivElement;
  Args: {
    title?: string;
    subtitle?: string;
    price?: string;
  };
  Blocks: {
    default: [];
  };
}

export default class VerticalCard extends Component<VerticalCardSignature> {
  get title() {
    return this.args.title;
  }

  get subtitle() {
    return this.args.subtitle;
  }

  get price() {
    return this.args.price;
  }

  <template>
    <Card ...attributes>
      <:card-header>
        <div
          class="d-flex flex-column justify-content-start align-items-center bg-white mb-2"
        >
          <div class="d-flex flex-row justify-content-between w-100 m-0">
            <p class="fw-bold fs-4 mt-2">{{this.title}}</p>
            {{#if this.price}}
              <p
                class="d-flex align-self-start align-self-md-center fs-1 fw-bold m-0"
              >&dollar;{{this.price}}<span
                  class="fs-5 align-self-end mb-1"
                >/mo</span></p>
            {{/if}}
          </div>
          <div class="align-self-start">
            <p class="mb-2 text-body-secondary">{{this.subtitle}}</p>
          </div>
        </div>
      </:card-header>
      <:card-body>
        {{yield}}
      </:card-body>
    </Card>
  </template>
}
