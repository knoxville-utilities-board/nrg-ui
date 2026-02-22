import "./../assets/component-api.css"
import "./../assets/section.css"
import { hash, array } from '@ember/helper';
import Component from '@glimmer/component';
import CodeBlock from './code-block.js';
import { getMdnLinkForElement, createLink } from '../utils.js';
import { Actions } from './component-api/actions.js';
import Arguments from './component-api/arguments.js';
import { Blocks } from './component-api/blocks.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

;

;

class Subsection extends Component {
  get hasCode() {
    return this.args.sourceCode && this.args.sourceLanguage;
  }
  get code() {
    return this.args.sourceCode;
  }
  get language() {
    return this.args.sourceLanguage;
  }
  static {
    setComponentTemplate(precompileTemplate("<div class=\"showcase-subsection mb-5\">\n  {{#let (createLink (array @sectionName @name)) as |link|}}\n    <h4 class=\"d-flex justify-content-between align-items-end\" id={{link}}>\n      <a class=\"showcase-header\" href=\"#{{link}}\">\n        {{@name}}\n      </a>\n      {{#if @elementTag}}\n        <a class=\"float-end fs-6\" href={{getMdnLinkForElement @elementTag}} target=\"_blank\" rel=\"noopener noreferrer\">\n          <CodeBlock @code=\"<{{@elementTag}} ...attributes>\" @lang=\"html\" @inline={{true}} />\n        </a>\n      {{/if}}\n    </h4>\n  {{/let}}\n\n  {{#if (has-block \"example\")}}\n    <div class=\"border border-secondary rounded p-3 my-2 showcase-example\">\n      {{yield @model to=\"example\"}}\n    </div>\n  {{/if}}\n\n  {{#if (has-block \"api\")}}\n    <div class=\"showcase-component-api mt-3\">\n      {{yield (hash Arguments=(component Arguments model=@model sectionName=@sectionName subsectionName=@name) Actions=(component Actions sectionName=@sectionName subsectionName=@name) Blocks=(component Blocks sectionName=@sectionName subsectionName=@name)) to=\"api\"}}\n    </div>\n  {{/if}}\n\n  {{#if this.hasCode}}\n    {{#let (createLink (array @sectionName @name \"source\")) as |link|}}\n      <h5 id={{link}}>\n        <a class=\"showcase-header\" href=\"#{{link}}\">\n          Source\n        </a>\n      </h5>\n    {{/let}}\n    <div class=\"my-2\">\n      <CodeBlock @code={{this.code}} @lang={{this.language}} @model={{@model}} />\n    </div>\n  {{/if}}\n</div>", {
      strictMode: true,
      scope: () => ({
        createLink,
        array,
        getMdnLinkForElement,
        CodeBlock,
        hash,
        Arguments,
        Actions,
        Blocks
      })
    }), this);
  }
}
class Section extends Component {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TypedSubsection = Subsection;
  static {
    setComponentTemplate(precompileTemplate("<div class=\"showcase-section\" ...attributes>\n  {{#let (createLink @name) as |link|}}\n    <h2 id={{link}}>\n      <a class=\"showcase-header\" href=\"#{{link}}\">\n        {{@name}}\n      </a>\n    </h2>\n  {{/let}}\n  <hr />\n  {{yield (hash Subsection=(component this.TypedSubsection sectionName=@name))}}\n</div>", {
      strictMode: true,
      scope: () => ({
        createLink,
        hash
      })
    }), this);
  }
}

export { Subsection, Section as default };
//# sourceMappingURL=section.js.map
