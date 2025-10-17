import Modifier from 'ember-modifier';
type CallbackFn<Element, A> = (element: Element, args: A) => void;
export interface OnUpdateSignature<Element extends HTMLElement, Named extends object> {
    Element: Element;
    Args: {
        Positional: [CallbackFn<Element, Named>];
        Named: Named;
    };
}
export default class OnUpdate<Element extends HTMLElement, Named extends Record<string, unknown>> extends Modifier<OnUpdateSignature<Element, Named>> {
    initialized: boolean;
    modify(element: Element, [fn]: [CallbackFn<Element, Named>], named: Named): void;
}
export {};
