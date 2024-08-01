import type { TOC } from '@ember/component/template-only';

declare type ColorType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

interface IconBubbleSignature {
  Element: HTMLDivElement;
  Args: {
    icon: string;
    color: ColorType;
  };
}

const IconBubble: TOC<IconBubbleSignature> = <template>
  <div class="d-flex" ...attributes>
    <div
      class="d-flex justify-content-center rounded-circle bg-{{@color}}-subtle fs-2 p-3 m-2"
    >
      <i class="bi {{@icon}} text-{{@color}}" />
    </div>
  </div>
</template>;

export default IconBubble;
