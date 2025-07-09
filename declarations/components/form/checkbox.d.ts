import BoundValue from './bound-value.ts';
import type { BoundValueSignature } from './bound-value';
import type { Optional } from '../../';
import type Owner from '@ember/owner';
export interface CheckboxSignature {
    Element: HTMLInputElement;
    Args: {
        describedBy?: string;
        disabled?: boolean;
        id?: string;
        inline?: boolean;
        isInvalid?: boolean;
        isWarning?: boolean;
        label?: string;
        required?: boolean;
        reverse?: boolean;
        type?: 'checkbox' | 'switch';
        onDestroy?: (checkbox: Checkbox) => void;
        onInit?: (checkbox: Checkbox) => void;
    };
    Blocks: {
        default: [];
    };
}
export default class Checkbox extends BoundValue<CheckboxSignature, boolean> {
    internalId: `${string}-${string}-${string}-${string}-${string}`;
    constructor(owner: Owner, args: BoundValueSignature<CheckboxSignature, Optional<boolean>>['Args']);
    get classList(): string;
    get divClassList(): string;
    get isSwitch(): boolean;
    get id(): string;
    change(evt: Event): void;
}
