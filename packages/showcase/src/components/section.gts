import { array, hash } from '@ember/helper';
import Component from '@glimmer/component';

import { createLink } from '../utils.ts';

import type { ComponentLike } from '@glint/template';

import '../assets/section.css';

export interface SubsectionSignature {
  Element: HTMLDivElement;
  Args: {
    name: string;
    sectionName: string;
  };
  Blocks: {
    default: [];
    example?: [];
  };
}

export class Subsection extends Component<SubsectionSignature> {
  <template>
    <div class="showcase-subsection">
      {{#let (createLink (array @sectionName @name)) as |link|}}
        <h4 id={{link}}>
          <a class="showcase-header" href="#{{link}}">
            {{@name}}
          </a>
        </h4>
      {{/let}}

      {{#if (has-block "example")}}
        <div class="border border-secondary rounded p-3 my-2 showcase-example">
          {{yield to="example"}}
        </div>
      {{/if}}
    </div>
  </template>
}

export interface SectionSignature {
  Element: HTMLDivElement;
  Args: {
    name: string;
  };
  Blocks: {
    default: [
      {
        Subsection: ComponentLike<SubsectionSignature>;
      },
    ];
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

      {{yield (hash Subsection=(component Subsection sectionName=@name))}}
    </div>
  </template>
}
