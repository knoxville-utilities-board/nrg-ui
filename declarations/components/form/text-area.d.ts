import BoundValue from './bound-value.ts';
import type { BoundValueSignature } from './bound-value.ts';
import type { FieldOptions } from './field';
export type TextAreaSignature = BoundValueSignature<{
    Element: HTMLTextAreaElement;
    Args: {
        basic?: boolean;
        readonly?: boolean;
        fieldOptions?: FieldOptions;
    };
}, string>;
export default class TextArea extends BoundValue<TextAreaSignature, string> {
    get classList(): string;
    change(evt: Event): void;
}
