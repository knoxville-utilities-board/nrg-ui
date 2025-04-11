import Component from '@glimmer/component';
import type { Icon as IconType } from '../../';
import type { ComponentLike } from '@glint/template';
export interface AddonSignature {
    Args: {
        label?: string;
        price?: string;
        quantity?: number;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
}
export interface MktgServicePricingSignature {
    Args: {
        icon: IconType;
        label: string;
        product?: string;
        description: string;
        active?: boolean;
        selected?: boolean;
    };
    Blocks: {
        default: [ComponentLike<AddonSignature>];
    };
    Element: HTMLElement;
}
export default class MktgServicePricing extends Component<MktgServicePricingSignature> {
    get status(): "fw-bold" | "fw-normal" | "fw-normal text-decoration-underline text-light-emphasis";
    get label(): string;
}
