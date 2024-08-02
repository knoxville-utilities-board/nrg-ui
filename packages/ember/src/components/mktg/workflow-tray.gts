import type { TOC } from '@ember/component/template-only';

interface MktgWorkflowTraySignature {
  Args: {
    title?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

const MktgWorkflowTray: TOC<MktgWorkflowTraySignature> = <template>
  <div
    class="w-md-33 flex-md-fill d-flex flex-column py-5 px-4 px-md-5 bg-light"
    ...attributes
  >
    <h1>{{@title}}</h1>
    {{yield}}
  </div>
</template>;

export default MktgWorkflowTray;
