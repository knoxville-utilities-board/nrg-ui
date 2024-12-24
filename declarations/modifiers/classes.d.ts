import Modifier from 'ember-modifier';
type Named = {
    filter?: boolean;
};
type Positional = unknown[];
type Element = HTMLElement;
export interface ClassesSignature {
    Element: Element;
    Args: {
        Named: Named;
        Positional: Positional;
    };
}
export default class Classes extends Modifier<ClassesSignature> {
    modify(element: Element, positional: Positional, named: Named): void;
}
export {};
//# sourceMappingURL=classes.d.ts.map