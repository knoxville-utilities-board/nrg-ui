import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
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
        icon?: string;
        text?: string;
        meta?: string;
        class: string;
    };
    Element: HTMLParagraphElement;
}
export interface MktgFeatureListSignature {
    Element: HTMLDivElement;
    Blocks: {
        features: [ComponentLike<MktgFeatureSignature>];
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
