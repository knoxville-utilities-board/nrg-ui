import type { TOC } from '@ember/component/template-only';

interface FooterSignature {
  Element: HTMLElement;
  Blocks: {
    left?: [];
    right?: [];
    default?: [];
  };
}

const Footer: TOC<FooterSignature> = <template>
  <footer
    class="bg-body-secondary border-top border-2 border-dark-subtle mt-auto fs-6"
    ...attributes
  >
    <div class="container-fluid py-2 px-4">
      <div
        class="row row-cols-auto justify-content-between align-content-center"
      >
        <div class="col row row-cols-auto align-content-center small">
          {{yield to="left"}}
        </div>
        <div class="col row row-cols-auto align-content-center small">
          {{yield to="right"}}
        </div>
      </div>
    </div>
  </footer>
</template>;

export default Footer;
