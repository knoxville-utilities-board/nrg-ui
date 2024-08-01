import type { TOC } from '@ember/component/template-only';

interface SectionHeaderSignature {
  Element: HTMLDivElement;
  Args: {
    subject?: string;
    title?: string;
  };
  Blocks: {
    "sub-content": [];
  };
}

const SectionHeader: TOC<SectionHeaderSignature> = <template>
  <div class="col-12 d-flex flex-column align-items-center">
    <div class="text-center" ...attributes>
      <p class="text-uppercase p-0 m-0 fw-semibold">{{@subject}}</p>
      <p class="mx-0 mb-2 fw-semibold fs-1">{{@title}}</p>
      {{yield to="sub-content"}}
    </div>
  </div>
</template>;

export default SectionHeader;
