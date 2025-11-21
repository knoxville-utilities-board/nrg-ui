import Component from '@glimmer/component';
import ResponsiveService from '../services/responsive.ts';
import type Owner from '@ember/owner';
export interface NavItemSignature {
    Element: HTMLLIElement;
    Args: {
        label: string;
        url?: string;
        model?: string;
        route?: string;
    };
}
export default class NavItem extends Component<NavItemSignature> {
    responsive: ResponsiveService;
    constructor(owner: Owner, args: NavItemSignature['Args']);
    get classList(): string;
}
