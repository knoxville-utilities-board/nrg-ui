export type Binding = {
  model: Record<string, unknown>;
  valuePath: string;
};
export type Optional<T> = T | null;
export type { Icon } from './icons.ts';
