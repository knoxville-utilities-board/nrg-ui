import Modifier from 'ember-modifier';
type Fn = (element: Element, ...args: any[]) => void;
type Element = HTMLElement;
export interface OnUpdateSignature<Positional, Named> {
    Element: HTMLElement;
    Args: {
        Named: Named;
        Positional: [Fn, Positional];
    };
}
export default class OnUpdate<Positional, Named extends Record<string, any>> extends Modifier<OnUpdateSignature<Positional, Named>> {
    initialized: boolean;
    modify(element: Element, [fn, ...positional]: [Fn, Positional], named: Named): void;
}
export {};
//# sourceMappingURL=on-update.d.ts.map