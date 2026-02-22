import BoundValue from './bound-value.ts';
import type { BoundValueSignature } from './bound-value';
import type { FieldOptions } from './field';
import type { Optional } from '../../index.ts';
import type Owner from '@ember/owner';
export type CheckboxSignature = BoundValueSignature<{
    Element: HTMLInputElement;
    Args: {
        inline?: boolean;
        label?: string;
        reverse?: boolean;
        type?: 'checkbox' | 'switch';
        fieldOptions?: FieldOptions;
        onDestroy?: (checkbox: Checkbox) => void;
        onInit?: (checkbox: Checkbox) => void;
    };
    Blocks: {
        default: [];
    };
}, boolean>;
export default class Checkbox extends BoundValue<CheckboxSignature, boolean> {
    internalId: `${string}-${string}-${string}-${string}-${string}`;
    constructor(owner: Owner, args: BoundValueSignature<CheckboxSignature, Optional<boolean>>['Args']);
    get classList(): string;
    get divClassList(): string;
    get isSwitch(): boolean;
    get id(): string;
    change(evt: Event): void;
}
