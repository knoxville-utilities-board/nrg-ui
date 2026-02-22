import Component from '@glimmer/component';
import type { IconType } from '../../index.ts';
import type { ComponentLike } from '@glint/template';
export interface MktgAddonSignature {
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
        icon?: IconType;
        label?: string;
        product?: string;
        description?: string;
        active?: boolean;
        selected?: boolean;
    };
    Blocks: {
        default: [ComponentLike<MktgAddonSignature>];
    };
    Element: HTMLElement;
}
export default class MktgServicePricing extends Component<MktgServicePricingSignature> {
    get status(): "fw-bold" | "fw-normal" | "fw-normal text-decoration-underline text-light-emphasis";
    get label(): string | undefined;
}
