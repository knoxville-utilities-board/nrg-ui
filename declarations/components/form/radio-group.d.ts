import BoundValue from './bound-value.ts';
import type { FieldOptions } from './field.gts';
import type { Optional } from '../../';
import type { ComponentLike } from '@glint/template';
export interface RadioGroupSignature {
    Element: HTMLDivElement;
    Args: {
        basic?: boolean;
        name: string;
        fieldOptions?: FieldOptions;
    };
    Blocks: {
        default: [{
            Radio: ComponentLike<RadioSignature>;
        }];
    };
}
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
