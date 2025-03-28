import Modifier from 'ember-modifier';
import type Owner from '@ember/owner';
type Named = {
    disabled?: boolean;
};
type Positional = [(evt: MouseEvent, ...args: unknown[]) => unknown];
type Element = HTMLElement;
export interface OnClickOutsideSignature {
    Args: {
        Named: Named;
        Positional: Positional;
    };
    Element: Element;
}
export default class OnClickOutside extends Modifier<OnClickOutsideSignature> {
    element: Element;
    callback: Positional[0];
    named: Named;
    guid: string;
    constructor(owner: Owner, args: {
        named: Named;
        positional: Positional;
    });
    get disabled(): boolean | undefined;
    modify(element: Element, positional: Positional, named: Named): void;
    clickHandler(evt: MouseEvent, ...args: unknown[]): boolean;
}
export {};
