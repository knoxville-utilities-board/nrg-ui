import Component from '@glimmer/component';
import type { TOC } from '@ember/component/template-only';
import type { ComponentLike, HelperLike, WithBoundArgs } from '@glint/template';
export interface ParamHelperSignature {
    Args: {
        Positional: [string];
        Named: Omit<ActionParameter, 'name'>;
    };
    Return: ActionParameter;
}
export declare const param: import("@ember/component/helper").FunctionBasedHelper<ParamHelperSignature>;
export interface ActionParameter {
    name: string;
    type?: string;
    description?: string;
}
export interface BaseBlockSignature {
    Element: HTMLDivElement;
    Args: {
        description?: string;
        name: string;
        parameters?: (string | ActionParameter)[];
        sectionName: string;
        subsectionName: string;
    };
    Blocks: {
        default: [];
    };
}
export declare class BaseBlock extends Component<BaseBlockSignature> {
    [key: string]: unknown;
    get parameters(): ActionParameter[];
    get signature(): string;
    hasValue(value: unknown): value is string;
}
export interface BlocksSignature {
    Args: {
        sectionName: string;
        subsectionName: string;
    };
    Blocks: {
        default: [
            WithBoundArgs<ComponentLike<BaseBlockSignature>, 'sectionName' | 'subsectionName'>,
            HelperLike<ParamHelperSignature>
        ];
    };
}
export declare const Blocks: TOC<BlocksSignature>;
export default Blocks;
