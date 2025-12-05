import Component from '@glimmer/component';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
declare const columnMap: {
    1: string;
    2: string;
    3: string;
    4: string;
    6: string;
    12: string;
};
export interface MktgFeatureSignature {
    Args: {
        class: string;
        icon?: string;
        text?: string;
        meta?: string;
    };
    Element: HTMLParagraphElement;
}
export interface MktgFeatureListSignature {
    Element: HTMLDivElement;
    Blocks: {
        features: [WithBoundArgs<ComponentLike<MktgFeatureSignature>, 'class'>];
        label: [];
        default?: [];
    };
    Args: {
        columns: keyof typeof columnMap;
    };
}
export default class MktgFeatureList extends Component<MktgFeatureListSignature> {
    get classList(): string;
}
export {};
