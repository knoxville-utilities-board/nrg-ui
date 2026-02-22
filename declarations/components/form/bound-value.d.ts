import Component from '@glimmer/component';
import type { FieldOptions } from './field';
import type { Binding, Optional } from '../../index.ts';
import type Owner from '@ember/owner';
type AllowChangeFn<T> = (newValue: T, oldValue: T) => boolean;
export type BoundValueSignature<Signature, Type> = {
    Args: {
        binding?: Binding;
        defaultValue?: Type;
        useDefaultValue?: boolean;
        fieldOptions?: FieldOptions;
        allowChange?: AllowChangeFn<Optional<Type>>;
        initBinding?: (binding: Binding) => void;
        onChange?: (value: Optional<Type>, ...args: unknown[]) => void;
    };
} & Signature;
export default class BoundValue<Signature, T> extends Component<BoundValueSignature<Signature, Optional<T>>> {
    constructor(owner: Owner, args: BoundValueSignature<Signature, Optional<T>>['Args']);
    get model(): object;
    get valuePath(): string;
    get value(): Optional<T>;
    set value(newValue: Optional<T>);
    get useDefaultValue(): boolean;
    get defaultValue(): Optional<T>;
    get allowChange(): AllowChangeFn<Optional<T>>;
    getDefaultValue(): Optional<T>;
    onChange(newValue: Optional<T>, ...args: unknown[]): void;
}
export {};
