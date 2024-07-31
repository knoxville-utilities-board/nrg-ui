import type { TOC } from '@ember/component/template-only';

export interface MktgWorkflowTraySignature {
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

const MktgWorkflowTray: TOC<MktgWorkflowTraySignature> = <template>
  <div ...attributes>
    <div class="row justify-content-between">
      <div class="col-auto">First Bill Including Fees</div>
      <div class="col-auto">$172/mo</div>
    </div>
    <div class="row justify-content-between">
      <div class="col-auto">Monthly Total</div>
      <div class="col-auto">$172/mo</div>
    </div>
    <div class="row mt-5 mx-0">
      {{yield}}
    </div>
  </div>
</template>;

export default MktgWorkflowTray;
