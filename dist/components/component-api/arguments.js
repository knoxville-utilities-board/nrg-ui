import { assert } from '@ember/debug';
import { hash, array } from '@ember/helper';
import { get, set } from '@ember/object';
import Component from '@glimmer/component';
import Checkbox from '@nrg-ui/core/components/form/checkbox';
import Datetime from '@nrg-ui/core/components/form/datetime';
import NumberInput from '@nrg-ui/core/components/form/number-input';
import Select from '@nrg-ui/core/components/form/select';
import TextInput from '@nrg-ui/core/components/form/text-input';
import { bind } from '@nrg-ui/core/helpers/bind';
import { stringify, createLink } from '../../utils.js';
import { TypeCodeBlock } from '../code-block.js';
import { ApiLink } from './api-link.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

function or(...args) {
  return args.find(Boolean);
}
class BaseArgument extends Component {
  // This is needed for the binding types, which
  // should be improved (if not simplified)

  get hasDefaultValue() {
    return this.args.defaultValue !== undefined;
  }
  get value() {
    const {
      alias,
      model,
      name,
      value
    } = this.args;
    if (value !== undefined) {
      return value;
    }
    assert('Model is required for BaseArgument when not providing @value', model);
    assert('Name is required for BaseArgument when not providing @value', name);
    return get(model, alias ?? name);
  }
  set value(value) {
    const {
      alias,
      model,
      name
    } = this.args;
    assert('Model is required for BaseArgument when not providing @onInput', model);
    assert('Name is required for BaseArgument when not providing @onInput', name);
    set(model, alias ?? name, value);
    this.args.onInput?.(value);
  }
  static {
    setComponentTemplate(precompileTemplate("<tr class=\"argument\" ...attributes>\n  <td class=\"name\">\n    {{@name}}\n    {{#if @required}}\n      <span class=\"text-danger\">*</span>\n    {{/if}}\n  </td>\n  <td class=\"type\">\n    <ApiLink @displayType={{@displayType}} @link={{@typeLink}} @type={{@type}} />\n  </td>\n  <td class=\"description\">\n    {{@description}}\n  </td>\n  <td class=\"default\">\n    {{#if this.hasDefaultValue}}\n      <TypeCodeBlock @code={{stringify @defaultValue}} @inline={{true}} />\n    {{/if}}\n  </td>\n  <td class=\"value\">\n    {{#if @options}}\n      <Select @binding={{bind this \"value\"}} @options={{@options}} />\n    {{else}}\n      {{yield this this.value}}\n    {{/if}}\n  </td>\n</tr>", {
      strictMode: true,
      scope: () => ({
        ApiLink,
        TypeCodeBlock,
        stringify,
        Select,
        bind
      })
    }), this);
  }
}
const BooleanArgument = setComponentTemplate(precompileTemplate("<BaseArgument @alias={{@alias}} @defaultValue={{@defaultValue}} @description={{@description}} @displayType={{@displayType}} @model={{@model}} @name={{@name}} @options={{@options}} @type={{or @type \"Boolean\"}} @typeLink={{@typeLink}} @value={{@value}} @onInput={{@onInput}} ...attributes as |base|>\n  {{#unless @hideControl}}\n    <Checkbox @binding={{bind base \"value\"}} @label={{if base.value \"True\" \"False\"}} />\n  {{/unless}}\n\n  {{yield base base.value}}\n</BaseArgument>", {
  strictMode: true,
  scope: () => ({
    BaseArgument,
    or,
    Checkbox,
    bind
  })
}), templateOnly());
const DateArgument = setComponentTemplate(precompileTemplate("<BaseArgument @alias={{@alias}} @defaultValue={{@defaultValue}} @description={{@description}} @displayType={{@displayType}} @model={{@model}} @name={{@name}} @options={{@options}} @type={{or @type \"Date\"}} @typeLink={{@typeLink}} @value={{@value}} @onInput={{@onInput}} ...attributes as |base|>\n  {{#unless @hideControl}}\n    <Datetime @binding={{bind base \"value\"}} />\n  {{/unless}}\n\n  {{yield base base.value}}\n</BaseArgument>", {
  strictMode: true,
  scope: () => ({
    BaseArgument,
    or,
    Datetime,
    bind
  })
}), templateOnly());
const NumberArgument = setComponentTemplate(precompileTemplate("<BaseArgument @alias={{@alias}} @defaultValue={{@defaultValue}} @description={{@description}} @displayType={{@displayType}} @model={{@model}} @name={{@name}} @type={{or @type \"Number\"}} @typeLink={{@typeLink}} @value={{@value}} @onInput={{@onInput}} as |base|>\n  {{#unless @hideControl}}\n    <NumberInput @binding={{bind base \"value\"}} />\n  {{/unless}}\n\n  {{yield base base.value}}\n</BaseArgument>", {
  strictMode: true,
  scope: () => ({
    BaseArgument,
    or,
    NumberInput,
    bind
  })
}), templateOnly());
const StringArgument = setComponentTemplate(precompileTemplate("<BaseArgument @alias={{@alias}} @defaultValue={{@defaultValue}} @description={{@description}} @displayType={{@displayType}} @model={{@model}} @name={{@name}} @options={{@options}} @type={{or @type \"String\"}} @typeLink={{@typeLink}} @value={{@value}} @onInput={{@onInput}} as |base|>\n  {{#unless @hideControl}}\n    <TextInput @binding={{bind base \"value\"}} />\n  {{/unless}}\n\n  {{yield base base.value}}\n</BaseArgument>", {
  strictMode: true,
  scope: () => ({
    BaseArgument,
    or,
    TextInput,
    bind
  })
}), templateOnly());
class Arguments extends Component {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TypedBase = BaseArgument;
  static {
    setComponentTemplate(precompileTemplate("{{#let (createLink (array @sectionName @subsectionName \"args\")) as |link|}}\n  <h5 class=\"mt-4\" id={{link}}>\n    <a class=\"showcase-header\" href=\"#{{link}}\">\n      Arguments\n    </a>\n  </h5>\n{{/let}}\n<div class=\"arguments\">\n  <table class=\"table table-striped\" ...attributes>\n    <thead>\n      <tr>\n        <th class=\"name\">Name</th>\n        <th class=\"description\" colspan=\"2\">Description</th>\n        <th class=\"default\">Default</th>\n        <th class=\"value\">Value</th>\n      </tr>\n    </thead>\n    <tbody>\n      {{yield (hash Base=(component this.TypedBase model=@model) Boolean=(component BooleanArgument model=@model) Date=(component DateArgument model=@model) Number=(component NumberArgument model=@model) String=(component StringArgument model=@model))}}\n    </tbody>\n  </table>\n</div>", {
      strictMode: true,
      scope: () => ({
        createLink,
        array,
        hash,
        BooleanArgument,
        DateArgument,
        NumberArgument,
        StringArgument
      })
    }), this);
  }
}

export { BaseArgument, BooleanArgument, DateArgument, NumberArgument, StringArgument, Arguments as default };
//# sourceMappingURL=arguments.js.map
