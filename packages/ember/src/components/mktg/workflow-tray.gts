import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';

interface TotalSignature {
  Args: {
    name?: string;
    total?: string;
  };
  Element: HTMLElement;
}

interface MktgWorkflowTraySignature {
  Blocks: {
    totals?: [ComponentLike<typeof Total>];
    default?: [];
  };
  Element: HTMLElement;
}

const Total: TOC<TotalSignature> = <template>
  <div class="row justify-content-between" ...attributes>
    <div class="col-auto">{{@name}}</div>
    <div class="col-auto">{{@total}}</div>
  </div>
</template>;

const MktgWorkflowTray: TOC<MktgWorkflowTraySignature> = <template>
  <div ...attributes>
    {{yield (component Total) to="totals"}}
    <div class="row mt-4 mx-0">
      {{yield to="default"}}
    </div>
  </div>
</template>;

export default MktgWorkflowTray;
