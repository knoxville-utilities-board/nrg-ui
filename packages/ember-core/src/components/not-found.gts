import Button from './button.gts';

import type { TOC } from '@ember/component/template-only';

export interface NotFoundSignature {
  Element: HTMLDivElement;
  Args: {
    url: string;
  };
}

const NotFound: TOC<NotFoundSignature> = <template>
  <div class="p-5 d-flex flex-column bg-white" ...attributes>
    <p class="fw-bold fs-1 m-0">Page Not Found</p>
    <hr class="w-100" />
    <p class="fw-semibold fs-5 m-0 mb-3">The page you requested could not be found.</p>
    <a href={{@url}}>
      <Button class="btn-primary" @text="Back to Home" />
    </a>
  </div>
</template>;
export default NotFound;
