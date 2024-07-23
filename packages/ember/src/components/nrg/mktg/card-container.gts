import type { TOC } from '@ember/component/template-only';

interface CardContainerSignature {
  Element: HTMLDivElement;
  Blocks: {
    default: [];
  };
}
const CardContainer: TOC<CardContainerSignature> = <template>
  <div class="row justify-content-center p-2">
    {{yield}}
  </div>
</template>;

export default CardContainer;
