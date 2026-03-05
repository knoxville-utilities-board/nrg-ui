import Component from '@glimmer/component';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
export declare const columnMap: {
    readonly 1: "g-col-lg-12";
    readonly 2: "g-col-lg-6";
    readonly 3: "g-col-lg-4";
    readonly 4: "g-col-lg-3";
    readonly 6: "g-col-lg-2";
    readonly 12: "g-col-lg-1";
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
