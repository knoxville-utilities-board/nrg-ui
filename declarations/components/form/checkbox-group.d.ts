import Component from '@glimmer/component';
import { TrackedSet } from 'tracked-built-ins';
import Checkbox from './checkbox.gts';
import type { CheckboxSignature } from './checkbox';
import type { FieldOptions } from './field.gts';
import type { Binding } from '../../';
import type Owner from '@ember/owner';
import type { ComponentLike } from '@glint/template';
export interface CheckboxGroupSignature {
    Element: HTMLDivElement;
    Args: {
        basic?: boolean;
        inline?: boolean;
        reverse?: boolean;
        type?: 'checkbox' | 'switch';
        fieldOptions?: FieldOptions;
        onInitBinding?: (binding: Binding<object>) => void;
    };
    Blocks: {
        default: [ComponentLike<CheckboxSignature>];
    };
}
export default class CheckboxGroup extends Component<CheckboxGroupSignature> {
    boxes: TrackedSet<Checkbox>;
    constructor(owner: Owner, args: CheckboxGroupSignature['Args']);
    get value(): string[];
    get classList(): string;
    registerCheckbox(checkbox: Checkbox): void;
    unregisterCheckbox(checkbox: Checkbox): void;
}
