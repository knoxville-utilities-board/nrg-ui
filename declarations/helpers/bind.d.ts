import Helper from '@ember/component/helper';
import type { Binding } from '../types';
type Positional = [Record<string, unknown>, string];
type Return = Binding;
export interface BindSignature {
    Args: {
        Positional: Positional;
    };
    Return: Return;
}
export declare function bind(model: Record<string, unknown>, valuePath: string): Binding;
export default class Bind extends Helper<BindSignature> {
    compute([model, valuePath]: Positional): Return;
}
export {};
//# sourceMappingURL=bind.d.ts.map