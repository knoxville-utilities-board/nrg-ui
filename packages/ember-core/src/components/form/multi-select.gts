import Select from './select.gts';
import { BoundValue } from '../..';

import type { Optional } from '../..';
import type { Direction, PopoverVisibility } from '../popover.gts';

export interface MultiSelectSignature<T> {
  Element: HTMLDivElement;
  Args: {
    defaultText?: string;
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

    onShow?: () => unknown | Promise<unknown>;
    onHide?: () => unknown | Promise<unknown>;
  };
  Blocks: {
    control?: [PopoverVisibility];
    display?: [T | undefined];
    option?: [T | undefined];
    empty?: [];
  };
}

export default class FormMultiSelect<T> extends BoundValue<MultiSelectSignature<T>, T[]> {
  TypedSelect = Select;

  get displayOptions(): T[] {

  }

  getDefaultValue() {
    return [] as T[];
  }

  onSelect = (value: T) => {
    // TODO
  }

  <template>
    <this.TypedSelect
      @defaultText={{@defaultText}}
      @describedBy={{@describedBy}}
      @disabled={{@disabled}}
      @displayPath={{@displayPath}}
      @id={{@id}}
      @isInvalid={{@isInvalid}}
      @isWarning={{@isWarning}}
      @loading={{@loading}}
      @options={{this.displayOptions}}
      @scrollable={{@scrollable}}
      @serializationPath={{@serializationPath}}
      @side={{@side}}
    />
  </template>
}
