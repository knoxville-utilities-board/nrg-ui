import BoundValue from './bound-value.ts';
export interface TextAreaSignature {
    Element: HTMLTextAreaElement;
    Args: {
        basic?: boolean;
        describedBy?: string;
        disabled?: boolean;
        id?: string;
        isInvalid?: boolean;
        isWarning?: boolean;
        readonly?: boolean;
    };
}
export default class TextArea extends BoundValue<TextAreaSignature, string> {
    get classList(): string;
    change(evt: Event): void;
}
//# sourceMappingURL=text-area.d.ts.map