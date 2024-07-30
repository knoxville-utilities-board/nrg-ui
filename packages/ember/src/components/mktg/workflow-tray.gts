import type { TOC } from '@ember/component/template-only';

export interface MktgWorkflowTraySignature {
  Args: {
    'first-bill-total': string;
    'monthly-bill-total': string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const MktgWorkflowTray: TOC<MktgWorkflowTraySignature> = <template>
  <div class="p-2 my-3" ...attributes>
    <div class="row my-2">
      <div class="col">
        First Bill Including Fees
      </div>
      <div class="col-auto">
        {{@first-bill-total}}
      </div>
    </div>
    <div class="row my-2">
      <div class="col">
        Monthly Bill
      </div>
      <div class="col-auto">
        {{@monthly-bill-total}}
      </div>
    </div>
    {{#if (has-block "default")}}
      <div class="row mt-5 mx-0">
        {{yield to="default"}}
      </div>
    {{/if}}
  </div>
</template>;

export default MktgWorkflowTray;
