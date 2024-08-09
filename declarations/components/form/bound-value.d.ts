import Component from '@glimmer/component';
import type { Binding, Optional } from '../../types.d.ts';
export type BoundValueSignature<Signature, Type> = {
    Args: {
        binding: Binding;
        defaultValue?: Type;
        useDefaultValue?: boolean;
        allowChange?: (newValue: Type, oldValue: Type) => boolean;
        onChange?: (value: Type, ...args: unknown[]) => void;
    };
} & Signature;
export default class BoundValue<Signature, T> extends Component<BoundValueSignature<Signature, Optional<T>>> {
    getDefaultValue: (() => T) | undefined;
    constructor(owner: unknown, args: BoundValueSignature<Signature, Optional<T>>['Args']);
    get model(): Record<string, unknown>;
    get valuePath(): string;
    get value(): Optional<T>;
    set value(newValue: Optional<T>);
    get useDefaultValue(): false | NonNullable<import("@glimmer/component/-private/component.js").Args<BoundValueSignature<Signature, Optional<T>>>["useDefaultValue"]>;
    get defaultValue(): T | (import("@glimmer/component/-private/component.js").Args<BoundValueSignature<Signature, Optional<T>>>["defaultValue"] & null) | undefined;
    get allowChange(): NonNullable<import("@glimmer/component/-private/component.js").Args<BoundValueSignature<Signature, Optional<T>>>["allowChange"]> | (() => boolean);
    onChange(newValue: Optional<T>, ...args: unknown[]): void;
}
//# sourceMappingURL=bound-value.d.ts.map