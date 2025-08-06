import BoundValue from './bound-value.ts';
import type { FieldOptions } from './field.gts';
export interface TextAreaSignature {
    Element: HTMLTextAreaElement;
    Args: {
        basic?: boolean;
        readonly?: boolean;
        fieldOptions?: FieldOptions;
    };
}
export default class TextArea extends BoundValue<TextAreaSignature, string> {
    get classList(): string;
    change(evt: Event): void;
}
