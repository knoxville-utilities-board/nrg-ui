export type Binding<Model extends object = Record<string, unknown>> = {
  model: Model;
  valuePath: string;
};
export type { Icon } from './icons.ts';
export type Optional<T> = T | null;
export type Primitive = string | number | boolean | null | undefined;
