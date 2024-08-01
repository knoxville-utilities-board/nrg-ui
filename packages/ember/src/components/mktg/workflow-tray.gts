import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';
import { hash } from '@ember/helper';

interface TotalSignature {
  Args: {
    name?: string;
    total?: string;
  };
  Element: HTMLElement;
}

interface MktgWorkflowTraySignature {
  Blocks: {
    default?: [ComponentLike<typeof Total>];
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
    {{yield (component Total)}}
  </div>
</template>;

export default MktgWorkflowTray;
