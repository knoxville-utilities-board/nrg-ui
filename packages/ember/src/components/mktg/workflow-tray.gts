import type { TOC } from '@ember/component/template-only';

interface MktgWorkflowTraySignature {
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

const MktgWorkflowTray: TOC<MktgWorkflowTraySignature> = <template>
  <div
    class="col-12 col-md-5 col-lg-4 py-2 py-md-5 px-4 px-md-3 bg-light order-2 order-md-1"
    ...attributes
  >
    <div class="m-2">
      {{yield}}
    </div>
  </div>
</template>;

export default MktgWorkflowTray;
