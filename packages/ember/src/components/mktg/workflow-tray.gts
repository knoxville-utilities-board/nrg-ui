import type { TOC } from '@ember/component/template-only';
import Button from '@nrg-ui/ember/components/button';

export interface MktgWorkflowTraySignature {
  Args: {
    // eslint-disable-next-line no-unused-vars
    onClick?: (evt: MouseEvent) => unknown;
  };
  Blocks: {
    'first-bill-total': [];
    'monthly-bill-total': [];
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
        {{yield to="first-bill-total"}}
      </div>
    </div>
    <div class="row my-2">
      <div class="col">
        Monthly Bill
      </div>
      <div class="col-auto">
        {{yield to="monthly-bill-total"}}
      </div>
    </div>
    <div class="row mt-5 mx-0">
      <Button
        class="btn bg-primary text-light p-3"
        @onClick={{@onClick}}
      >Next</Button>
    </div>
  </div>
</template>;

export default MktgWorkflowTray;
