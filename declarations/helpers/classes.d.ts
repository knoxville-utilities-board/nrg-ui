import Helper from '@ember/component/helper';
type Positional = unknown[];
type Element = HTMLElement;
export declare function classes(...args: unknown[]): string;
export interface ClassesSignature {
    Element: Element;
    Args: {
        Positional: Positional;
    };
    Return: string;
}
export default class Classes extends Helper<ClassesSignature> {
    compute(positional: Positional): string;
}
export {};
