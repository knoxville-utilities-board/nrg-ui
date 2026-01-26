import { helper } from '@ember/component/helper';
import { array } from '@ember/helper';
import Component from '@glimmer/component';
import { createLink } from '../../utils.js';
import CodeBlock, { TypeCodeBlock } from '../code-block.js';
import { ApiLink } from './api-link.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const param = helper(([name], {
  type,
  description
}) => {
  return {
    name,
    type,
    description
  };
});
class BaseAction extends Component {
  get parameters() {
    const {
      parameters: args = []
    } = this.args;
    if (typeof args[0] === 'string') {
      return args.map(arg => typeof arg === 'string' ? {
        name: arg
      } : arg);
    }
    return args;
  }
  get signature() {
    const params = this.parameters.map(param => `${param.name}: ${param.type ?? 'any'}`).join(', ');
    return `(${params}): ${this.args.returnType ?? 'void'}`;
  }
  hasValue(value) {
    return value !== undefined;
  }
  static {
    setComponentTemplate(precompileTemplate("{{#let (createLink (array @sectionName @subsectionName \"actions\" @name)) as |link|}}\n  <h6 id={{link}}>\n    <a class=\"showcase-header\" href=\"#{{link}}\">\n      <CodeBlock @code={{@name}} @lang=\"plaintext\" @inline={{true}} />\n    </a>\n  </h6>\n{{/let}}\n<div class=\"action\" ...attributes>\n  <p class=\"signature\">\n    <TypeCodeBlock @code={{this.signature}} @showCopyButton={{false}} />\n  </p>\n  <p class=\"description\">\n    {{@description}}\n  </p>\n  {{#if this.parameters}}\n    <div class=\"arguments\">\n      <table class=\"table table-striped\">\n        <thead>\n          <tr>\n            <th class=\"name\">Name</th>\n            <th class=\"description\" colspan=\"2\">Description</th>\n          </tr>\n        </thead>\n        <tbody>\n          {{#each this.parameters as |param|}}\n            <tr>\n              <td class=\"name\">\n                {{param.name}}\n              </td>\n              <td class=\"type\">\n                {{#if param.type}}\n                  <ApiLink @type={{param.type}} />\n                {{/if}}\n              </td>\n              <td class=\"description\">\n                {{param.description}}\n              </td>\n            </tr>\n          {{/each}}\n        </tbody>\n      </table>\n    </div>\n  {{/if}}\n\n  {{yield}}\n</div>", {
      strictMode: true,
      scope: () => ({
        createLink,
        array,
        CodeBlock,
        TypeCodeBlock,
        ApiLink
      })
    }), this);
  }
}
const Actions = setComponentTemplate(precompileTemplate("{{#let (createLink (array @sectionName @subsectionName \"actions\")) as |link|}}\n  <h5 class=\"mt-4\" id={{link}}>\n    <a class=\"showcase-header\" href=\"#{{link}}\">\n      Actions\n    </a>\n  </h5>\n{{/let}}\n{{yield (component BaseAction sectionName=@sectionName subsectionName=@subsectionName) param}}", {
  strictMode: true,
  scope: () => ({
    createLink,
    array,
    BaseAction,
    param
  })
}), templateOnly());

export { Actions, BaseAction, Actions as default, param };
//# sourceMappingURL=actions.js.map
