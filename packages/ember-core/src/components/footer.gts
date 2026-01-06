import type { TOC } from '@ember/component/template-only';

export interface FooterSignature {
  Element: HTMLElement;
  Blocks: {
    left?: [];
    right?: [];
  };
}

const Footer: TOC<FooterSignature> = <template>
  <footer class="border-top border-1 border-dark-subtle mt-auto fs-6" ...attributes>
    <div class="container-fluid py-2 px-2 px-sm-4">
      <div class="row row-cols-auto justify-content-between align-content-center m-0">
        {{#if (has-block "left")}}
          <div class="col row row-cols-auto align-content-center small ms-0 me-auto">
            {{yield to="left"}}
          </div>
        {{/if}}
        {{#if (has-block "right")}}
          <div class="col row row-cols-auto align-content-center small me-0 ms-auto">
            {{yield to="right"}}
          </div>
        {{/if}}
      </div>
    </div>
  </footer>
</template>;

export default Footer;
