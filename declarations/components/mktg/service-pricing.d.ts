import type { Icon as IconType } from '../../types';
import type { ComponentLike } from '@glint/template';
import Component from '@glimmer/component';
interface AddonSignature {
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
interface MktgServicePricingSignature {
    Args: {
        icon: IconType;
        label: string;
        package?: string;
        description: string;
        active?: boolean;
        selected?: boolean;
    };
    Blocks: {
        default: [ComponentLike<typeof Addon>];
    };
    Element: HTMLElement;
}
declare class Addon extends Component<AddonSignature> {
    get label(): string | undefined;
}
export default class MktgServicePricing extends Component<MktgServicePricingSignature> {
    get status(): "fw-bold" | "fw-normal" | "fw-normal text-decoration-underline text-light-emphasis";
    get label(): string;
}
export {};
//# sourceMappingURL=service-pricing.d.ts.map