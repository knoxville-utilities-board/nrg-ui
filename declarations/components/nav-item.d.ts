import Component from '@glimmer/component';
import ResponsiveService from '../services/responsive.ts';
export interface NrgNavItemSignature {
    Element: HTMLLIElement;
    Args: {
        label: string;
        url?: string;
        model?: string;
        route?: string;
    };
}
export default class NrgNavItem extends Component<NrgNavItemSignature> {
    responsive: ResponsiveService;
    constructor(owner: unknown, args: NrgNavItemSignature['Args']);
    get classList(): string;
}
//# sourceMappingURL=nav-item.d.ts.map