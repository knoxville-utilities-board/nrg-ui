import Helper from '@ember/component/helper';
import type { Binding } from '../';
export declare function bind<Model extends object = Record<string, unknown>>(model: Model, valuePath: string): Binding<Model>;
export default class Bind<Model extends object = Record<string, unknown>> extends Helper {
    compute([model, valuePath]: [Model, string]): Binding<Model>;
}
