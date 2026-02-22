import BoundValue from './bound-value.ts';
import type { FieldOptions } from './field';
import type { BoundValueSignature, Optional } from '../../index.ts';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
export type RadioGroupSignature = BoundValueSignature<{
    Element: HTMLDivElement;
    Args: {
        basic?: boolean;
        name?: string;
        fieldOptions?: FieldOptions;
    };
    Blocks: {
        default: [{
            Radio: WithBoundArgs<ComponentLike<RadioSignature>, 'name'>;
        }];
    };
}, string>;
export default class RadioGroup extends BoundValue<RadioGroupSignature, string> {
    get classList(): string;
    get name(): string;
    change(updatedValue: Optional<string>): void;
}
export interface RadioSignature {
    Element: HTMLInputElement;
    Args: {
        currentValue?: string | null;
        disabled?: boolean;
        isInvalid?: boolean;
        isWarning?: boolean;
        label?: string;
        name: string;
        option?: string;
        onChange?: (value: string, ...args: unknown[]) => void;
    };
}
