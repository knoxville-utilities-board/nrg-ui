import Modifier from 'ember-modifier';
import type Owner from '@ember/owner';
import type { ArgsFor } from 'ember-modifier';
type AnyArray = any[];
type CallbackFn<Args extends AnyArray> = (element: HTMLElement, ...args: Args) => void;
export interface OnDestroySignature<Args extends AnyArray> {
    Element: HTMLElement;
    Args: {
        Positional: [CallbackFn<Args>, ...Args];
    };
}
export default class OnDestroy<Args extends AnyArray> extends Modifier<OnDestroySignature<Args>> {
    callback: () => void;
    constructor(owner: Owner, args: ArgsFor<OnDestroySignature<Args>>);
    modify(element: HTMLElement, [callback, ...args]: [CallbackFn<Args>, ...Args]): void;
}
export {};
