import type { TOC } from '@ember/component/template-only';
import Card from '../card.gts';

interface CardSignature {
  Element: HTMLDivElement;
  Args: {
    title?: string;
    subtitle?: string;
    leftAlignCallout?: boolean;
    horizontal?: boolean;
    hasBorder?: boolean;
  };
  Blocks: {
    start: [];
    end: [];
    callout: [];
  };
}

const MktgCard: TOC<CardSignature> = <template>
  {{#if @horizontal}}
    <Card @hasBorder={{@hasBorder}} ...attributes>
      <:body>
        <div class="row-md d-flex flex-column flex-md-row p-md-3">
          <div class="col-md d-flex flex-column justify-content-start pb-2">
            <div class="d-flex flex-column justify-content-between w-100 m-0">
              {{#if @title}}
                <p class="fw-bold fs-5 m-0">{{@title}}</p>
              {{/if}}
              {{yield to="callout"}}
              {{yield to="start"}}
            </div>
          </div>
          {{#if (has-block "end")}}
            <div class="col-md-1 d-flex justify-content-center">
              <div class="vr d-none d-md-flex text-body-secondary"></div>
            </div>
            <hr class="d-flex d-md-none text-body-secondary" />
            <div class="col-md">
              {{yield to="end"}}
            </div>
          {{/if}}
        </div>
      </:body>
    </Card>
  {{else}}
    <Card @hasBorder={{@hasBorder}} ...attributes>
      <:header>
        <div
          class="d-flex flex-column justify-content-start align-items-center bg-white mb-2"
        >
          {{#if @leftAlignCallout}}
            <div class="d-flex flex-column justify-content-start w-100 m-0">
              {{yield to="callout"}}
              <p class="fw-bold fs-4 mt-2">{{@title}}</p>
            </div>
          {{else}}
            <div class="d-flex flex-row justify-content-between w-100 m-0">
              <p class="fw-bold fs-4 mt-2">{{@title}}</p>
              {{yield to="callout"}}
            </div>
          {{/if}}
          <div class="align-self-start">
            <p class="m-0 mb-2 text-body-secondary">{{@subtitle}}</p>
          </div>
          {{yield to="start"}}
        </div>
      </:header>
      <:body>
        {{yield to="end"}}
      </:body>
    </Card>
  {{/if}}
</template>;

export default MktgCard;
