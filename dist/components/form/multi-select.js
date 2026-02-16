import { fn, hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { get } from '@ember/object';
import { service } from '@ember/service';
import { tracked, cached } from '@glimmer/tracking';
import { t, tKey } from 'ember-intl';
import { scheduleTask } from 'ember-lifeline';
import { TrackedArray } from 'tracked-built-ins';
import BoundValue from './bound-value.js';
import Select from './select.js';
import { bind } from '../../helpers/bind.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';
import { g, i, n } from 'decorator-transforms/runtime';

const RemoveButton = setComponentTemplate(precompileTemplate("<button aria-label={{t \"nrg.base.remove\"}} class=\"btn-close btn-close-white ms-2\" disabled={{@disabled}} type=\"button\" {{on \"click\" @onClick}} />", {
  strictMode: true,
  scope: () => ({
    t,
    on
  })
}), templateOnly());
class MultiSelect extends BoundValue {
  static {
    g(this.prototype, "intl", [service]);
  }
  #intl = (i(this, "intl"), void 0);
  static {
    g(this.prototype, "lastSelection", [tracked], function () {
      return null;
    });
  }
  #lastSelection = (i(this, "lastSelection"), void 0);
  self = this;
  TypedSelect = Select;
  constructor(owner, args) {
    super(owner, args);
    if (!(this.value instanceof TrackedArray)) {
      scheduleTask(this, 'actions', () => {
        this.onChange(new TrackedArray(this.value ?? []));
      });
    }
  }
  get defaultText() {
    return this.args.defaultText ?? this.intl.t(this.args.defaultTextKey ?? tKey('nrg.multi-select.defaultText'));
  }
  get noOptionsText() {
    return this.args.noOptionsText ?? this.intl.t(this.args.noOptionsTextKey ?? tKey('nrg.multi-select.noOptions'));
  }
  get closeOnSelect() {
    return this.args.closeOnSelect ?? false;
  }
  get internalOptions() {
    const {
      value: selections
    } = this;
    if (!this.args.options) {
      return [];
    }
    return this.args.options.map(option => {
      if (typeof option !== 'object') {
        return {
          raw: option,
          label: option,
          value: option,
          selected: selections.includes(option)
        };
      }
      const label = get(option, this.args.displayPath ?? 'label');
      let value = option;
      // null serializationPath results in value being the raw option
      if (this.args.serializationPath !== null) {
        value = get(option, this.args.serializationPath ?? 'value');
      }
      return {
        raw: option,
        label,
        value
      };
    });
  }
  static {
    n(this.prototype, "internalOptions", [cached]);
  }
  get selectedOptions() {
    const {
      internalOptions,
      value
    } = this;
    return value.map(selectedValue => internalOptions.find(option => option.value === selectedValue));
  }
  static {
    n(this.prototype, "selectedOptions", [cached]);
  }
  get availableOptions() {
    return this.internalOptions.filter(option => !this.value.includes(option.value));
  }
  static {
    n(this.prototype, "availableOptions", [cached]);
  }
  addItem = option => {
    const {
      value: currentValue
    } = this;
    const {
      value
    } = option;
    this.args.onAdd?.(value);
    currentValue.push(value);
    this.onChange(currentValue);
    this.lastSelection = null;
  };
  removeItem = (option, index) => {
    const {
      value: currentValue
    } = this;
    const {
      value
    } = option;
    this.args.onRemove?.(value);
    currentValue.splice(index, 1);
    this.onChange(currentValue);
  };
  static {
    setComponentTemplate(precompileTemplate("<div class=\"card multi-select border-0\">\n  <Select @binding={{bind this.self \"lastSelection\"}} @closeOnSelect={{this.closeOnSelect}} @defaultTextKey=\"nrg.multi-select.defaultText\" @fieldOptions={{hash describedBy=@fieldOptions.describedBy disabled=@fieldOptions.disabled id=@fieldOptions.id isInvalid=@fieldOptions.isInvalid isWarning=@fieldOptions.isWarning required=@fieldOptions.required}} @loading={{@loading}} @noOptionsText={{@noOptionsText}} @noOptionsTextKey={{@noOptionsTextKey}} @options={{this.availableOptions}} @scrollable={{@scrollable}} @onChange={{this.addItem}} ...attributes @serializationPath={{null}}>\n    <:empty>\n      {{#if this.value.length}}\n        {{#if (has-block \"display\")}}\n          {{yield this.value to=\"display\"}}\n        {{else}}\n          {{#each this.selectedOptions as |option i|}}\n            {{#if (has-block \"selection\")}}\n              {{yield (hash value=option.raw Remove=(component RemoveButton disabled=@fieldOptions.disabled onClick=(fn this.removeItem option i))) to=\"selection\"}}\n            {{else}}\n              <span class=\"badge text-bg-secondary d-inline-flex align-items-center\">\n                {{option.label}}\n                <RemoveButton @disabled={{@fieldOptions.disabled}} @onClick={{fn this.removeItem option i}} />\n              </span>\n            {{/if}}\n          {{/each}}\n        {{/if}}\n      {{else}}\n        {{#if (has-block \"empty\")}}\n          {{yield to=\"empty\"}}\n        {{else}}\n          {{this.defaultText}}\n        {{/if}}\n      {{/if}}\n    </:empty>\n    <:option as |option|>\n      {{#if (has-block \"option\")}}\n        {{yield option.raw to=\"option\"}}\n      {{else}}\n        {{option.label}}\n      {{/if}}\n    </:option>\n    <:menu as |Menu|>\n      {{#if (has-block \"menu\")}}\n        {{yield Menu to=\"menu\"}}\n      {{/if}}\n    </:menu>\n  </Select>\n</div>", {
      strictMode: true,
      scope: () => ({
        Select,
        bind,
        hash,
        RemoveButton,
        fn
      })
    }), this);
  }
}

export { MultiSelect as default };
//# sourceMappingURL=multi-select.js.map
