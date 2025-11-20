import { fn, hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { get } from '@ember/object';
import { service } from '@ember/service';
import { cached, tracked } from '@glimmer/tracking';
import { t } from 'ember-intl';
import { scheduleTask } from 'ember-lifeline';
import { TrackedArray } from 'tracked-built-ins';

import BoundValue from './bound-value.ts';
import Select from './select.gts';
import { bind } from '../../helpers/bind.ts';

import type {
  BoundValueSignature,
  DropdownSignature,
  Optional,
} from '../../index.ts';
import type { PopoverVisibility } from '../popover.gts';
import type { FieldOptions } from './field.gts';
import type { TOC } from '@ember/component/template-only';
import type Owner from '@ember/owner';
import type { WithBoundArgs } from '@glint/template';
import type { IntlService } from 'ember-intl';

declare type SelectOption<T> = {
  label: string;
  value: T;
  raw?: T;
  selected?: boolean;
};

declare interface RemoveButtonSignature {
  Element: HTMLSpanElement;
  Args: {
    disabled?: boolean;
    onClick: (evt: MouseEvent) => unknown;
  };
}

const RemoveButton: TOC<RemoveButtonSignature> = <template>
  <button
    aria-label={{t "nrg.base.remove"}}
    class="btn-close btn-close-white ms-2"
    disabled={{@disabled}}
    type="button"
    {{on "click" @onClick}}
  />
</template>;

export type MultiSelectSignature<T> = BoundValueSignature<
  {
    Element: HTMLButtonElement;
    Args: {
      closeOnSelect?: boolean;
      defaultText?: string;
      defaultTextKey?: string;
      displayPath?: string;
      loading?: boolean;
      noOptionsText?: string;
      noOptionsTextKey?: string;
      options?: readonly T[];
      scrollable?: boolean;
      serializationPath?: string | null;

      fieldOptions?: FieldOptions;

      onAdd?: (value: T) => unknown;
      onRemove?: (value: T) => unknown;
      onShow?: () => unknown | Promise<unknown>;
      onHide?: () => unknown | Promise<unknown>;
    };
    Blocks: {
      control?: [PopoverVisibility];
      display?: [T[]];
      option?: [T | undefined];
      selection?: [
        {
          value: T | undefined;
          Remove: WithBoundArgs<typeof RemoveButton, 'disabled' | 'onClick'>;
        },
      ];
      empty?: [];
      menu?: DropdownSignature['Blocks']['menu'];
    };
  },
  T[]
>;

export default class MultiSelect<T> extends BoundValue<
  MultiSelectSignature<T>,
  T[]
> {
  @service
  declare intl: IntlService;

  @tracked
  lastSelection: Optional<SelectOption<T>> = null;

  self: Record<'value', Optional<T[]>> = this;
  TypedSelect = Select;

  constructor(owner: Owner, args: MultiSelectSignature<T>['Args']) {
    super(owner, args);

    if (!(this.value instanceof TrackedArray)) {
      scheduleTask(this, 'actions', () => {
        this.onChange(new TrackedArray(this.value ?? []));
      });
    }
  }

  get defaultText() {
    return (
      this.args.defaultText ??
      this.intl.t(this.args.defaultTextKey ?? 'nrg.multi-select.defaultText')
    );
  }

  get noOptionsText() {
    return (
      this.args.noOptionsText ??
      this.intl.t(this.args.noOptionsTextKey ?? 'nrg.multi-select.noOptions')
    );
  }

  get closeOnSelect() {
    return this.args.closeOnSelect ?? false;
  }

  @cached
  get internalOptions(): SelectOption<T>[] {
    const { value: selections } = this;

    if (!this.args.options) {
      return [];
    }

    return this.args.options.map((option) => {
      if (typeof option !== 'object') {
        return {
          raw: option,
          label: option as string,
          value: option,
          selected: selections!.includes(option),
        };
      }

      const label = get(option, this.args.displayPath ?? 'label') as string;
      let value: T = option;

      // null serializationPath results in value being the raw option
      if (this.args.serializationPath !== null) {
        value = get(option, this.args.serializationPath ?? 'value') as T;
      }

      return {
        raw: option,
        label,
        value,
      };
    });
  }

  @cached
  get selectedOptions(): SelectOption<T>[] {
    const { internalOptions, value } = this;

    return value!.map(
      (selectedValue) =>
        internalOptions.find((option) => option.value === selectedValue)!,
    );
  }

  @cached
  get availableOptions(): SelectOption<T>[] {
    return this.internalOptions.filter(
      (option) => !this.value!.includes(option.value),
    );
  }

  addItem = (option: Optional<SelectOption<T>>) => {
    const { value: currentValue } = this;
    const { value } = option!;

    this.args.onAdd?.(value);
    currentValue!.push(value);

    this.onChange(currentValue);
    this.lastSelection = null;
  };

  removeItem = (option: Optional<SelectOption<T>>, index: number) => {
    const { value: currentValue } = this;
    const { value } = option!;

    this.args.onRemove?.(value);
    currentValue!.splice(index, 1);

    this.onChange(currentValue);
  };

  <template>
    <div class="card multi-select border-0">
      <Select
        @binding={{bind this.self "lastSelection"}}
        @closeOnSelect={{this.closeOnSelect}}
        @defaultTextKey="nrg.multi-select.defaultText"
        @fieldOptions={{hash
          describedBy=@fieldOptions.describedBy
          disabled=@fieldOptions.disabled
          id=@fieldOptions.id
          isInvalid=@fieldOptions.isInvalid
          isWarning=@fieldOptions.isWarning
          required=@fieldOptions.required
        }}
        @loading={{@loading}}
        @noOptionsText={{@noOptionsText}}
        @noOptionsTextKey={{@noOptionsTextKey}}
        @options={{this.availableOptions}}
        @scrollable={{@scrollable}}
        @onChange={{this.addItem}}
        ...attributes
        @serializationPath={{null}}
      >
        <:empty>
          {{#if this.value.length}}
            {{#if (has-block "display")}}
              {{yield this.value to="display"}}
            {{else}}
              {{#each this.selectedOptions as |option i|}}
                {{#if (has-block "selection")}}
                  {{yield
                    (hash
                      value=option.raw
                      Remove=(component
                        RemoveButton
                        disabled=@fieldOptions.disabled
                        onClick=(fn this.removeItem option i)
                      )
                    )
                    to="selection"
                  }}
                {{else}}
                  <span
                    class="badge text-bg-secondary d-inline-flex align-items-center"
                  >
                    {{option.label}}
                    <RemoveButton
                      @disabled={{@fieldOptions.disabled}}
                      @onClick={{fn this.removeItem option i}}
                    />
                  </span>
                {{/if}}
              {{/each}}
            {{/if}}
          {{else}}
            {{#if (has-block "empty")}}
              {{yield to="empty"}}
            {{else}}
              {{this.defaultText}}
            {{/if}}
          {{/if}}
        </:empty>
        <:option as |option|>
          {{#if (has-block "option")}}
            {{yield option.raw to="option"}}
          {{else}}
            {{option.label}}
          {{/if}}
        </:option>
        <:menu as |Menu|>
          {{#if (has-block "menu")}}
            {{yield Menu to="menu"}}
          {{/if}}
        </:menu>
      </Select>
    </div>
  </template>
}
