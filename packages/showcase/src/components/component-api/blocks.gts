import { helper } from '@ember/component/helper';
import { array } from '@ember/helper';
import Component from '@glimmer/component';

import { createLink } from '../../utils.ts';
import CodeBlock, { TypeCodeBlock } from '../code-block.gts';
import ApiLink from './api-link.gts';

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike, HelperLike, WithBoundArgs } from '@glint/template';

export interface ParamHelperSignature {
  Args: {
    Positional: [string];
    Named: Omit<ActionParameter, 'name'>;
  };
  Return: ActionParameter;
}

export const param = helper<ParamHelperSignature>(
  ([name], { type, description }) => {
    return { name, type, description };
  },
);

export interface ActionParameter {
  name: string;
  type?: string;
  description?: string;
}

export interface BaseBlockSignature {
  Element: HTMLDivElement;
  Args: {
    description?: string;
    name: string;
    parameters?: (string | ActionParameter)[];

    sectionName: string;
    subsectionName: string;
  };
  Blocks: {
    default: [];
  };
}

export class BaseBlock extends Component<BaseBlockSignature> {
  [key: string]: unknown;

  get parameters(): ActionParameter[] {
    const { parameters: args = [] } = this.args;

    if (typeof args[0] === 'string') {
      return args.map((arg) => (typeof arg === 'string' ? { name: arg } : arg));
    }

    return args as ActionParameter[];
  }

  get signature() {
    if (!this.parameters.length) {
      return '';
    }

    const params = this.parameters
      .map((param) => `${param.name}: ${param.type ?? 'any'}`)
      .join(', ');

    return `(${params})`;
  }

  hasValue(value: unknown): value is string {
    return value !== undefined;
  }

  <template>
    {{#let
      (createLink (array @sectionName @subsectionName "blocks" @name))
      as |link|
    }}
      <h6 id={{link}}>
        <a class="showcase-header" href="#{{link}}">
          <CodeBlock @code={{@name}} @lang="plaintext" @inline={{true}} />
        </a>
      </h6>
    {{/let}}
    <div class="block" ...attributes>
      {{#if this.signature}}
        <p class="signature">
          <TypeCodeBlock @code={{this.signature}} />
        </p>
      {{/if}}
      <p class="description">
        {{@description}}
      </p>
      {{#if this.parameters}}
        <div class="parameters">
          <table class="table table-striped parameters">
            <thead>
              <tr>
                <th class="name">Name</th>
                <th class="description" colspan="2">Description</th>
              </tr>
            </thead>
            <tbody>
              {{#each this.parameters as |param|}}
                <tr>
                  <td class="name">
                    {{param.name}}
                  </td>
                  <td class="type">
                    {{#if param.type}}
                      <ApiLink @type={{param.type}} />
                    {{/if}}
                  </td>
                  <td class="description">
                    {{param.description}}
                  </td>
                </tr>
              {{/each}}
            </tbody>
          </table>
        </div>
      {{/if}}
    </div>
  </template>
}

export interface BlocksSignature {
  Args: {
    sectionName: string;
    subsectionName: string;
  };
  Blocks: {
    default: [
      WithBoundArgs<
        ComponentLike<BaseBlockSignature>,
        'sectionName' | 'subsectionName'
      >,
      HelperLike<ParamHelperSignature>,
    ];
  };
}

export const Blocks: TOC<BlocksSignature> = <template>
  {{#let (createLink (array @sectionName @subsectionName "blocks")) as |link|}}
    <h5 class="mt-4" id={{link}}>
      <a class="showcase-header" href="#{{link}}">
        Blocks
      </a>
    </h5>
  {{/let}}
  <div class="blocks">
    {{yield
      (component
        BaseBlock sectionName=@sectionName subsectionName=@subsectionName
      )
      param
    }}
  </div>
</template>;

export default Blocks;
