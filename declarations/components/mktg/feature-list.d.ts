import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import type { TOC } from '@ember/component/template-only';
declare const columnMap: {
    1: string;
    2: string;
    3: string;
    4: string;
    6: string;
    12: string;
};
interface FeatureSignature {
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
        features: [ComponentLike<typeof Feature>];
        label: [];
        default?: [];
    };
    Args: {
        columns: keyof typeof columnMap;
    };
}
declare const Feature: TOC<FeatureSignature>;
export default class MktgFeatureList extends Component<MktgFeatureListSignature> {
    get classList(): string;
}
export {};
//# sourceMappingURL=feature-list.d.ts.map