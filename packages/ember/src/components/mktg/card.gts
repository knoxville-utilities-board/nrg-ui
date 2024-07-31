import Component from '@glimmer/component';
import Card from '../card.gts';

interface CardSignature {
  Element: HTMLDivElement;
  Args: {
    title?: string;
    subtitle?: string;
    leftAlignCallout?: boolean;
    horizontal?: boolean;
  };
  Blocks: {
    start: [];
    end: [];
    callout: [];
  };
}

export default class MktgCard extends Component<CardSignature> {
  get horizontal() {
    return this.args.horizontal;
  }

  get title() {
    return this.args.title;
  }

  get subtitle() {
    return this.args.subtitle;
  }

  get leftAlignCallout() {
    return this.args.leftAlignCallout;
  }

  <template>
    {{#if this.horizontal}}
      <Card ...attributes>
        <:body>
          <div class="row-md d-flex flex-column flex-md-row p-md-3">
            <div class="col-md d-flex flex-column justify-content-start pb-2">
              <div class="d-flex flex-column justify-content-between w-100 m-0">
                {{#if this.title}}
                  <p class="fw-bold fs-5 m-0">{{this.title}}</p>
                {{/if}}
                {{#if (has-block "callout")}}
                  {{yield to="callout"}}
                  {{!-- <p
                    class="card-title d-flex align-self-start fs-1 fw-bold m-0 pb-2"
                  >&dollar;{{this.price}}/mo</p> --}}
                {{/if}}
                {{yield to="start"}}
              </div>
            </div>
            {{#if (has-block "end")}}
              <div class="col-md-1 d-flex justify-content-center">
                <div class="vr d-none d-md-flex text-secondary"></div>
              </div>
              <hr class="d-flex d-md-none text-secondary" />
            {{/if}}
            <div class="col-md">
              {{yield to="end"}}
            </div>
          </div>
        </:body>
      </Card>
    {{else}}
      <Card ...attributes>
        <:header>
          <div
            class="d-flex flex-column justify-content-start align-items-center bg-white mb-2"
          >
            {{#if this.leftAlignCallout}}
              <div class="d-flex flex-column justify-content-start w-100 m-0">
                {{yield to="callout"}}
                {{!-- <p class="d-flex fs-1 fw-bold m-0">&dollar;{{this.price}}/mo</p> --}}
                <p class="fw-bold fs-4 mt-2">{{this.title}}</p>
              </div>
            {{else}}
              <div class="d-flex flex-row justify-content-between w-100 m-0">
                <p class="fw-bold fs-4 mt-2">{{this.title}}</p>
                {{#if (has-block "callout")}}
                  {{yield to="callout"}}
                  {{!-- <p
                    class="d-flex align-self-start align-self-md-center fs-1 fw-bold m-0"
                  >&dollar;{{this.price}}<span
                      class="fs-5 align-self-end mb-2"
                    >/mo</span></p> --}}
                {{/if}}
              </div>
            {{/if}}
            <div class="align-self-start">
              <p class="m-0 mb-2 text-body-secondary">{{this.subtitle}}</p>
            </div>
            {{#if (has-block "start")}}
              {{yield to="start"}}
            {{/if}}
          </div>
        </:header>
        <:body>
          {{#if (has-block "end")}}
            {{yield to="end"}}
          {{/if}}
        </:body>
      </Card>
    {{/if}}
  </template>
}
