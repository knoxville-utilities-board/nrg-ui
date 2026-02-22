import Component from '@glimmer/component';
import type { ActionsSignature } from './component-api/actions';
import type { ArgumentsSignature } from './component-api/arguments';
import type { BlocksSignature } from './component-api/blocks';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
import type { BundledLanguage } from 'shiki';
import '../assets/component-api.css';
import '../assets/section.css';
export interface SubsectionSignature<Model extends object = object> {
    Element: HTMLDivElement;
    Args: {
        model: Model;
        elementTag?: string;
        name: string;
        sectionName: string;
        sourceCode?: string;
        sourceLanguage?: BundledLanguage;
    };
    Blocks: {
        api: [
            {
                Arguments: WithBoundArgs<ComponentLike<ArgumentsSignature>, 'model' | 'sectionName' | 'subsectionName'>;
                Actions: WithBoundArgs<ComponentLike<ActionsSignature>, 'sectionName' | 'subsectionName'>;
                Blocks: WithBoundArgs<ComponentLike<BlocksSignature>, 'sectionName' | 'subsectionName'>;
            }
        ];
        default: [];
        example?: [Model];
    };
}
export declare class Subsection<Model extends object = object> extends Component<SubsectionSignature<Model>> {
    get hasCode(): "" | BundledLanguage | undefined;
    get code(): string;
    get language(): BundledLanguage;
}
export interface SectionSignature {
    Element: HTMLDivElement;
    Args: {
        name: string;
    };
    Blocks: {
        default: [
            {
                Subsection: WithBoundArgs<ComponentLike<SubsectionSignature<any>>, 'sectionName'>;
            }
        ];
    };
}
export default class Section extends Component<SectionSignature> {
    TypedSubsection: {
        new (owner: import("@ember/-internals/owner").default, args: {
            model: any;
            elementTag?: string;
            name: string;
            sectionName: string;
            sourceCode?: string;
            sourceLanguage?: BundledLanguage;
        }): Subsection<any>;
    };
}
