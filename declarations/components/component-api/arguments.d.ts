import Component from '@glimmer/component';
import type { TOC } from '@ember/component/template-only';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
export interface ArgumentSignature<T> {
    Element: HTMLTableRowElement;
    Args: {
        alias?: string;
        defaultValue?: T | string;
        description?: string;
        displayType?: string;
        hideControl?: boolean;
        model: object;
        name?: string;
        options?: readonly T[];
        required?: boolean;
        type?: string;
        typeLink?: string;
        value?: T;
        onInput?: (value: T) => void;
    };
    Blocks: {
        default: [BaseArgument<T>, T];
    };
}
export interface BaseArgumentSignature<T> {
    Element: HTMLTableRowElement;
    Args: {
        displayType?: string;
        type: string;
        typeLink?: string;
        onInput?: (value: T) => void;
    } & ArgumentSignature<T>['Args'];
    Blocks: {
        default: [BaseArgument<T>, T];
    };
}
export declare class BaseArgument<T> extends Component<BaseArgumentSignature<T>> {
    [key: string]: unknown;
    get hasDefaultValue(): boolean;
    get value(): T;
    set value(value: T);
}
export declare const BooleanArgument: TOC<ArgumentSignature<boolean>>;
export declare const DateArgument: TOC<ArgumentSignature<Date>>;
export declare const NumberArgument: TOC<ArgumentSignature<number>>;
export declare const StringArgument: TOC<ArgumentSignature<string>>;
export interface ArgumentsSignature {
    Element: HTMLTableElement;
    Args: {
        sectionName: string;
        subsectionName: string;
        model: object;
    };
    Blocks: {
        default: [
            {
                Base: WithBoundArgs<ComponentLike<BaseArgumentSignature<unknown>>, 'model'>;
                Boolean: WithBoundArgs<ComponentLike<ArgumentSignature<boolean>>, 'model'>;
                Date: WithBoundArgs<ComponentLike<ArgumentSignature<Date>>, 'model'>;
                Number: WithBoundArgs<ComponentLike<ArgumentSignature<number>>, 'model'>;
                String: WithBoundArgs<ComponentLike<ArgumentSignature<string>>, 'model'>;
            }
        ];
    };
}
export default class Arguments extends Component<ArgumentsSignature> {
    TypedBase: {
        new (owner: import("@ember/-internals/owner").default, args: {
            displayType?: string;
            type: string;
            typeLink?: string;
            onInput?: ((value: any) => void) | undefined;
        } & {
            alias?: string;
            defaultValue?: any;
            description?: string;
            displayType?: string;
            hideControl?: boolean;
            model: object;
            name?: string;
            options?: readonly any[] | undefined;
            required?: boolean;
            type?: string;
            typeLink?: string;
            value?: any;
            onInput?: ((value: any) => void) | undefined;
        }): BaseArgument<any>;
    };
}
