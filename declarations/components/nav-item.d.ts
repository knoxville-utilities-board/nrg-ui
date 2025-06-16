import Component from '@glimmer/component';
import ResponsiveService from '../services/responsive.ts';
export interface NavItemSignature {
    Element: HTMLLIElement;
    Args: {
        label: string;
        url?: string;
        model?: string;
        route?: string;
    };
}
export default class NrgNavItem extends Component<NavItemSignature> {
    responsive: ResponsiveService;
    constructor(owner: unknown, args: NavItemSignature['Args']);
    get classList(): string;
}
