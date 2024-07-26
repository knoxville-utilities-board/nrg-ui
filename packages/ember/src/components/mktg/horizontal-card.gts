import Component from '@glimmer/component';
import Card from '../card.gts';

interface HorizontalCardSignature {
  Element: HTMLDivElement;
  Args: {
    title?: string;
    price?: string;
  };
  Blocks: {
    left: [];
    right: [];
  };
}

export default class HorizontalCard extends Component<HorizontalCardSignature> {
  get title() {
    return this.args.title;
  }
  get price() {
    return this.args.price;
  }

  <template>
    <Card ...attributes>
      <:card-body>
        <div class="row-md d-flex flex-column flex-md-row p-md-3">
          <div class="col-md d-flex flex-column justify-content-start pb-2">
            <div class="d-flex flex-column justify-content-between w-100 m-0">
              {{#if this.title}}
                <p class="fw-bold fs-5 m-0">{{this.title}}</p>
              {{/if}}
              {{#if this.price}}
                <p
                  class="card-title d-flex align-self-start fs-1 fw-bold m-0 pb-2"
                >&dollar;{{this.price}}/mo</p>
              {{/if}}
              {{yield to="left"}}
            </div>
          </div>
          {{#if (has-block "right")}}
            <div class="col-md-1 d-flex justify-content-center">
              <div class="vr d-none d-md-flex text-secondary"></div>
            </div>
            <hr class="d-flex d-md-none text-secondary" />
          {{/if}}
          <div class="col-md">
            {{yield to="right"}}
          </div>
        </div>
      </:card-body>
    </Card>
  </template>
}
