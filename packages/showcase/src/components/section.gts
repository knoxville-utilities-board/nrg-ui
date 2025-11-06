import { array, hash } from '@ember/helper';
import Component from '@glimmer/component';

import CodeBlock from './code-block.gts';
import { createLink } from '../utils.ts';
import Actions from './component-api/actions.gts';
import Arguments from './component-api/arguments.gts';
import Blocks from './component-api/blocks.gts';

import type { ActionsSignature } from './component-api/actions.gts';
import type { ArgumentsSignature } from './component-api/arguments.gts';
import type { BlocksSignature } from './component-api/blocks.gts';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
import type { BundledLanguage } from 'shiki';

import '../assets/component-api.css';
import '../assets/section.css';

export interface SubsectionSignature<Model extends object = object> {
  Element: HTMLDivElement;
  Args: {
    model: Model;

    name: string;
    sectionName: string;
    sourceCode?: string;
    sourceLanguage?: BundledLanguage;
  };
  Blocks: {
    api: [
      {
        Arguments: WithBoundArgs<
          ComponentLike<ArgumentsSignature>,
          'model' | 'sectionName' | 'subsectionName'
        >;
        Actions: WithBoundArgs<
          ComponentLike<ActionsSignature>,
          'sectionName' | 'subsectionName'
        >;
        Blocks: WithBoundArgs<
          ComponentLike<BlocksSignature>,
          'sectionName' | 'subsectionName'
        >;
      },
    ];
    default: [];
    example?: [Model];
  };
}

export class Subsection<Model extends object = object> extends Component<
  SubsectionSignature<Model>
> {
  get hasCode() {
    return this.args.sourceCode && this.args.sourceLanguage;
  }

  get code() {
    return this.args.sourceCode!;
  }

  get language() {
    return this.args.sourceLanguage!;
  }

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
          {{yield @model to="example"}}
        </div>
      {{/if}}

      {{#if (has-block "api")}}
        <div class="showcase-component-api mt-3">
          {{yield
            (hash
              Arguments=(component
                Arguments
                model=@model
                sectionName=@sectionName
                subsectionName=@name
              )
              Actions=(component
                Actions sectionName=@sectionName subsectionName=@name
              )
              Blocks=(component
                Blocks sectionName=@sectionName subsectionName=@name
              )
            )
            to="api"
          }}
        </div>
      {{/if}}

      {{#if this.hasCode}}
        {{#let (createLink (array @sectionName @name "source")) as |link|}}
          <h5 id={{link}}>
            <a class="showcase-header" href="#{{link}}">
              Source
            </a>
          </h5>
        {{/let}}
        <div class="my-2">
          <CodeBlock @code={{this.code}} @lang={{this.language}} />
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
        Subsection: WithBoundArgs<
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ComponentLike<SubsectionSignature<any>>,
          'sectionName'
        >;
      },
    ];
  };
}

export default class Section extends Component<SectionSignature> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TypedSubsection = Subsection<any>;

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
      {{yield
        (hash Subsection=(component this.TypedSubsection sectionName=@name))
      }}
    </div>
  </template>
}
