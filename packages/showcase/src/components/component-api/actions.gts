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

export interface BaseActionSignature {
  Element: HTMLDivElement;
  Args: {
    description?: string;
    name: string;
    parameters?: (string | ActionParameter)[];
    returnType?: string;

    sectionName: string;
    subsectionName: string;
  };
  Blocks: {
    default: [];
  };
}

export class BaseAction extends Component<BaseActionSignature> {
  [key: string]: unknown;

  get parameters(): ActionParameter[] {
    const { parameters: args = [] } = this.args;

    if (typeof args[0] === 'string') {
      return args.map((arg) => (typeof arg === 'string' ? { name: arg } : arg));
    }

    return args as ActionParameter[];
  }

  get signature() {
    const params = this.parameters
      .map((param) => `${param.name}: ${param.type ?? 'any'}`)
      .join(', ');

    return `(${params}): ${this.args.returnType ?? 'void'}`;
  }

  hasValue(value: unknown): value is string {
    return value !== undefined;
  }

  <template>
    {{#let
      (createLink (array @sectionName @subsectionName "actions" @name))
      as |link|
    }}
      <h6 id={{link}}>
        <a class="showcase-header" href="#{{link}}">
          <CodeBlock @code={{@name}} @lang="plaintext" @inline={{true}} />
        </a>
      </h6>
    {{/let}}
    <div class="action" ...attributes>
      <p class="signature">
        <TypeCodeBlock @code={{this.signature}} @showCopyButton={{false}} />
      </p>
      <p class="description">
        {{@description}}
      </p>
      {{#if this.parameters}}
        <div class="arguments">
          <table class="table table-striped">
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

      {{yield}}
    </div>
  </template>
}

export interface ActionsSignature {
  Args: {
    sectionName: string;
    subsectionName: string;
  };
  Blocks: {
    default: [
      WithBoundArgs<
        ComponentLike<BaseActionSignature>,
        'sectionName' | 'subsectionName'
      >,
      HelperLike<ParamHelperSignature>,
    ];
  };
}

export const Actions: TOC<ActionsSignature> = <template>
  {{#let (createLink (array @sectionName @subsectionName "actions")) as |link|}}
    <h5 class="mt-4" id={{link}}>
      <a class="showcase-header" href="#{{link}}">
        Actions
      </a>
    </h5>
  {{/let}}
  {{yield
    (component
      BaseAction sectionName=@sectionName subsectionName=@subsectionName
    )
    param
  }}
</template>;

export default Actions;
