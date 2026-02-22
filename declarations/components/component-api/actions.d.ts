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
export interface BaseActionSignature {
    Element: HTMLDivElement;
    Args: {
        description?: string;
        name: string;
        parameters?: (string | ActionParameter)[];
        returnType?: string;
        sectionName: string;
        subsectionName: string;
    };
    Blocks: {
        default: [];
    };
}
export declare class BaseAction extends Component<BaseActionSignature> {
    [key: string]: unknown;
    get parameters(): ActionParameter[];
    get signature(): string;
    hasValue(value: unknown): value is string;
}
export interface ActionsSignature {
    Args: {
        sectionName: string;
        subsectionName: string;
    };
    Blocks: {
        default: [
            WithBoundArgs<ComponentLike<BaseActionSignature>, 'sectionName' | 'subsectionName'>,
            HelperLike<ParamHelperSignature>
        ];
    };
}
export declare const Actions: TOC<ActionsSignature>;
export default Actions;
