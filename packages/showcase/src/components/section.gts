import { hash } from '@ember/helper';
import Component from '@glimmer/component';

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';

import '../assets/section.css';

export interface SubsectionSignature {
  Element: HTMLDivElement;
  Args: {
    name?: string;
  };
  Blocks: {
    default: [];
    name?: [];
  };
}

const Subsection: TOC<SubsectionSignature> = <template>
  <div class="showcase-subsection">
    {{#if (has-block "name")}}
      <h4>{{yield to="name"}}</h4>
    {{else if @name}}
      <h4>{{@name}}</h4>
    {{/if}}

    {{yield}}
  </div>
</template>;

export interface SectionSignature {
  Element: HTMLDivElement;
  Args: {
    name?: string;
  };
  Blocks: {
    default: [
      {
        Subsection: ComponentLike<SubsectionSignature>;
      },
    ];
    name?: [];
  };
}

export default class Section extends Component<SectionSignature> {
  <template>
    <div class="showcase-section" ...attributes>
      {{#if (has-block "name")}}
        <h2>{{yield to="name"}}</h2>
        <hr />
      {{else if @name}}
        <h2>{{@name}}</h2>
        <hr />
      {{/if}}
      {{yield (hash Subsection=(component Subsection))}}
    </div>
  </template>
}
