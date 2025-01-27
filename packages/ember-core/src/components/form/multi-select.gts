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
import { classes } from '../../helpers/classes.ts';

import type { Optional } from '../../index.ts';
import type { Direction, PopoverVisibility } from '../popover.gts';
import type { TOC } from '@ember/component/template-only';
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
    onClick: (evt: MouseEvent) => unknown;
  };
}

const RemoveButton: TOC<RemoveButtonSignature> = <template>
  <span
    aria-label={{t "nrg.base.remove"}}
    class="btn-close btn-close-white"
    type="button"
    {{on "click" @onClick}}
  >
  </span>
</template>;

export interface MultiSelectSignature<T> {
  Element: HTMLButtonElement;
  Args: {
    closeOnSelect?: boolean;
    defaultText?: string;
    defaultTextKey?: string;
    describedBy?: string;
    disabled?: boolean;
    displayPath?: string;
    id?: string;
    isInvalid?: boolean;
    isWarning?: boolean;
    loading?: boolean;
    options: T[];
    scrollable?: boolean;
    serializationPath?: string | null;
    side?: Direction;

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
        Remove: WithBoundArgs<typeof RemoveButton, 'onClick'>;
      },
    ];
    empty?: [];
  };
}

export default class FormMultiSelect<T> extends BoundValue<
  MultiSelectSignature<T>,
  T[]
> {
  @service
  declare intl: IntlService;

  @tracked
  lastSelection: Optional<SelectOption<T>> = null;

  self: Record<'value', Optional<T[]>> = this;
  TypedSelect = Select;

  constructor(owner: unknown, args: MultiSelectSignature<T>['Args']) {
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
      this.intl.t(this.args.defaultTextKey ?? 'nrg.select.defaultText')
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
    <div class="card multi-select">
      <Select
        class={{classes
          "border-0"
          (if this.selectedOptions.length "border-bottom rounded-bottom-0")
        }}
        @binding={{bind this.self "lastSelection"}}
        @closeOnSelect={{this.closeOnSelect}}
        @defaultTextKey="nrg.multi-select.defaultText"
        @options={{this.availableOptions}}
        @onChange={{this.addItem}}
        ...attributes
        @serializationPath={{null}}
      >
        <:empty>
          {{#if this.value.length}}
            {{#if (has-block "display")}}
              {{yield this.value to="display"}}
            {{else}}
              {{this.defaultText}}
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
      </Select>
      {{#if this.selectedOptions.length}}
        <div class="card-body">
          {{#each this.selectedOptions as |option i|}}
            {{#if (has-block "selection")}}
              {{yield
                (hash
                  value=option.raw
                  Remove=(component
                    RemoveButton onClick=(fn this.removeItem option i)
                  )
                )
                to="selection"
              }}
            {{else}}
              <span
                class="badge text-bg-secondary d-inline-flex align-items-center"
              >
                <span class="me-2">
                  {{option.label}}
                </span>
                <RemoveButton @onClick={{fn this.removeItem option i}} />
              </span>
            {{/if}}
          {{/each}}
        </div>
      {{/if}}
    </div>
  </template>
}
