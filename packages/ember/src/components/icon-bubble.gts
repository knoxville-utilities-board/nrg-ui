import type { TOC } from '@ember/component/template-only';
import type { NrgIconValue } from '../icon-types';

declare type BackgroundColorType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'
  | 'primary-subtle'
  | 'secondary-subtle'
  | 'success-subtle'
  | 'danger-subtle'
  | 'warning-subtle'
  | 'info-subtle'
  | 'light-subtle'
  | 'dark-subtle';

declare type IconColorType =
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
    icon: NrgIconValue;
    backgroundColor: BackgroundColorType;
    iconColor: IconColorType;
  };
}

const IconBubble: TOC<IconBubbleSignature> = <template>
  <div class="d-flex" ...attributes>
    <div
      class="d-flex justify-content-center rounded-circle bg-{{@backgroundColor}}
        fs-2 p-3 m-2"
    >
      <i class="bi {{@icon}} text-{{@iconColor}}" />
    </div>
  </div>
</template>;

export default IconBubble;
