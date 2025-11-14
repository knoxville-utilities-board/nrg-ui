import { assert } from '@ember/debug';
import { array, hash } from '@ember/helper';
import { get, set } from '@ember/object';
import Component from '@glimmer/component';
import Checkbox from '@nrg-ui/core/components/form/checkbox';
import Datetime from '@nrg-ui/core/components/form/datetime';
import NumberInput from '@nrg-ui/core/components/form/number-input';
import Select from '@nrg-ui/core/components/form/select';
import TextInput from '@nrg-ui/core/components/form/text-input';
import { bind } from '@nrg-ui/core/helpers/bind';

import { createLink, stringify } from '../../utils.ts';
import { TypeCodeBlock } from '../code-block.gts';
import ApiLink from './api-link.gts';

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike, WithBoundArgs } from '@glint/template';

function or(...args: (string | unknown)[]): string {
  return args.find(Boolean) as string;
}

export interface ArgumentSignature<T> {
  Element: HTMLTableRowElement;
  Args: {
    alias?: string;
    defaultValue?: T | string;
    description?: string;
    displayType?: string;
    hideControl?: boolean;
    model: object;
    name?: string;
    options?: readonly T[];
    required?: boolean;
    type?: string;
    typeLink?: string;
    value?: T;

    onInput?: (value: T) => void;
  };
  Blocks: {
    default: [BaseArgument<T>, T];
  };
}

export interface BaseArgumentSignature<T> {
  Element: HTMLTableRowElement;
  Args: {
    displayType?: string;
    type: string;
    typeLink?: string;

    onInput?: (value: T) => void;
  } & ArgumentSignature<T>['Args'];
  Blocks: {
    default: [BaseArgument<T>, T];
  };
}

export class BaseArgument<T> extends Component<BaseArgumentSignature<T>> {
  // This is needed for the binding types, which
  // should be improved (if not simplified)
  [key: string]: unknown;

  get hasDefaultValue(): boolean {
    return this.args.defaultValue !== undefined;
  }

  get value(): T {
    const { alias, model, name, value } = this.args;

    if (value !== undefined) {
      return value;
    }

    assert(
      'Model is required for BaseArgument when not providing @value',
      model,
    );
    assert('Name is required for BaseArgument when not providing @value', name);

    return get(model, alias ?? name) as T;
  }

  set value(value: T) {
    const { alias, model, name } = this.args;

    assert(
      'Model is required for BaseArgument when not providing @onInput',
      model,
    );
    assert(
      'Name is required for BaseArgument when not providing @onInput',
      name,
    );

    set(model, alias ?? name, value);

    this.args.onInput?.(value);
  }

  <template>
    <tr class="argument" ...attributes>
      <td class="name">
        {{@name}}
        {{#if @required}}
          <span class="text-danger">*</span>
        {{/if}}
      </td>
      <td class="type">
        <ApiLink
          @displayType={{@displayType}}
          @link={{@typeLink}}
          @type={{@type}}
        />
      </td>
      <td class="description">
        {{@description}}
      </td>
      <td class="default">
        {{#if this.hasDefaultValue}}
          <TypeCodeBlock @code={{stringify @defaultValue}} @inline={{true}} />
        {{/if}}
      </td>
      <td class="value">
        {{#if @options}}
          <Select @binding={{bind this "value"}} @options={{@options}} />
        {{else}}
          {{yield this this.value}}
        {{/if}}
      </td>
    </tr>
  </template>
}

export const BooleanArgument: TOC<ArgumentSignature<boolean>> = <template>
  <BaseArgument
    @alias={{@alias}}
    @defaultValue={{@defaultValue}}
    @description={{@description}}
    @displayType={{@displayType}}
    @model={{@model}}
    @name={{@name}}
    @options={{@options}}
    @type={{or @type "Boolean"}}
    @typeLink={{@typeLink}}
    @value={{@value}}
    @onInput={{@onInput}}
    ...attributes
    as |base|
  >
    {{#unless @hideControl}}
      <Checkbox
        @binding={{bind base "value"}}
        @label={{if base.value "True" "False"}}
      />
    {{/unless}}

    {{yield base base.value}}
  </BaseArgument>
</template>;

export const DateArgument: TOC<ArgumentSignature<Date>> = <template>
  <BaseArgument
    @alias={{@alias}}
    @defaultValue={{@defaultValue}}
    @description={{@description}}
    @displayType={{@displayType}}
    @model={{@model}}
    @name={{@name}}
    @options={{@options}}
    @type={{or @type "Date"}}
    @typeLink={{@typeLink}}
    @value={{@value}}
    @onInput={{@onInput}}
    ...attributes
    as |base|
  >
    {{#unless @hideControl}}
      <Datetime @binding={{bind base "value"}} />
    {{/unless}}

    {{yield base base.value}}
  </BaseArgument>
</template>;

export const NumberArgument: TOC<ArgumentSignature<number>> = <template>
  <BaseArgument
    @alias={{@alias}}
    @defaultValue={{@defaultValue}}
    @description={{@description}}
    @displayType={{@displayType}}
    @model={{@model}}
    @name={{@name}}
    @type={{or @type "Number"}}
    @typeLink={{@typeLink}}
    @value={{@value}}
    @onInput={{@onInput}}
    as |base|
  >
    {{#unless @hideControl}}
      <NumberInput @binding={{bind base "value"}} />
    {{/unless}}

    {{yield base base.value}}
  </BaseArgument>
</template>;

export const StringArgument: TOC<ArgumentSignature<string>> = <template>
  <BaseArgument
    @alias={{@alias}}
    @defaultValue={{@defaultValue}}
    @description={{@description}}
    @displayType={{@displayType}}
    @model={{@model}}
    @name={{@name}}
    @options={{@options}}
    @type={{or @type "String"}}
    @typeLink={{@typeLink}}
    @value={{@value}}
    @onInput={{@onInput}}
    as |base|
  >
    {{#unless @hideControl}}
      <TextInput @binding={{bind base "value"}} />
    {{/unless}}

    {{yield base base.value}}
  </BaseArgument>
</template>;

export interface ArgumentsSignature {
  Element: HTMLTableElement;
  Args: {
    sectionName: string;
    subsectionName: string;
    model: object;
  };
  Blocks: {
    default: [
      {
        Base: WithBoundArgs<
          ComponentLike<BaseArgumentSignature<unknown>>,
          'model'
        >;
        Boolean: WithBoundArgs<
          ComponentLike<ArgumentSignature<boolean>>,
          'model'
        >;
        Date: WithBoundArgs<ComponentLike<ArgumentSignature<Date>>, 'model'>;
        Number: WithBoundArgs<
          ComponentLike<ArgumentSignature<number>>,
          'model'
        >;
        String: WithBoundArgs<
          ComponentLike<ArgumentSignature<string>>,
          'model'
        >;
      },
    ];
  };
}

export default class Arguments extends Component<ArgumentsSignature> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TypedBase = BaseArgument<any>;

  <template>
    {{#let (createLink (array @sectionName @subsectionName "args")) as |link|}}
      <h5 class="mt-4" id={{link}}>
        <a class="showcase-header" href="#{{link}}">
          Arguments
        </a>
      </h5>
    {{/let}}
    <div class="arguments">
      <table class="table table-striped" ...attributes>
        <thead>
          <tr>
            <th class="name">Name</th>
            <th class="description" colspan="2">Description</th>
            <th class="default">Default</th>
            <th class="value">Value</th>
          </tr>
        </thead>
        <tbody>
          {{yield
            (hash
              Base=(component this.TypedBase model=@model)
              Boolean=(component BooleanArgument model=@model)
              Date=(component DateArgument model=@model)
              Number=(component NumberArgument model=@model)
              String=(component StringArgument model=@model)
            )
          }}
        </tbody>
      </table>
    </div>
  </template>
}
