import Component from '@glimmer/component';

import { createLink } from '../utils.ts';

import '../assets/section.css';

export interface SectionSignature {
  Element: HTMLDivElement;
  Args: {
    name: string;
  };
  Blocks: {
    default: [];
  };
}

export default class Section extends Component<SectionSignature> {
  <template>
    <div class="showcase-section" ...attributes>
      {{#let (createLink @name) as |link|}}
        <h2 id={{link}}>
          <a class="showcase-header" href="#{{link}}">
            {{@name}}
          </a>
        </h2>
      {{/let}}
      <hr />

      {{yield}}
    </div>
  </template>
}
