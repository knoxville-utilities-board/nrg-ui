import type { TOC } from '@ember/component/template-only';

interface MktgWorkflowTraySignature {
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

const MktgWorkflowTray: TOC<MktgWorkflowTraySignature> = <template>
  <div class="col-12 col-md-4 py-5 px-4 px-md-5 bg-light" ...attributes>
    <div class="m-2">
      {{yield}}
    </div>
  </div>
</template>;

export default MktgWorkflowTray;
