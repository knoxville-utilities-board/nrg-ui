import BoundValue from './bound-value.ts';
export interface TextFieldSignature {
    Element: HTMLInputElement;
    Args: {
        basic?: boolean;
        disabled?: boolean;
        readonly?: boolean;
    };
}
export default class TextField extends BoundValue<TextFieldSignature, string> {
    get classList(): string;
    change(evt: Event): void;
}
//# sourceMappingURL=text-field.d.ts.map