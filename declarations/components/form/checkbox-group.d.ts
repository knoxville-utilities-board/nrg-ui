import Component from '@glimmer/component';
import { TrackedSet } from 'tracked-built-ins';
import Checkbox from './checkbox.gts';
import type { CheckboxSignature } from './checkbox';
import type { Binding } from '../../';
import type { ComponentLike } from '@glint/template';
export interface CheckboxGroupSignature {
    Element: HTMLDivElement;
    Args: {
        basic?: boolean;
        describedBy?: string;
        disabled?: boolean;
        id?: string;
        inline?: boolean;
        isInvalid?: boolean;
        isWarning?: boolean;
        reverse?: boolean;
        type?: 'checkbox' | 'switch';
        onInitBinding?: (binding: Binding<object>) => void;
    };
    Blocks: {
        default: [ComponentLike<CheckboxSignature>];
    };
}
export default class CheckboxGroup extends Component<CheckboxGroupSignature> {
    boxes: TrackedSet<Checkbox>;
    constructor(owner: unknown, args: CheckboxGroupSignature['Args']);
    get value(): string[];
    get classList(): string;
    registerCheckbox(checkbox: Checkbox): void;
    unregisterCheckbox(checkbox: Checkbox): void;
}
//# sourceMappingURL=checkbox-group.d.ts.map