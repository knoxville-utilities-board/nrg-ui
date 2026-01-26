import Component from '@glimmer/component';
import type ToastService from '../services/toast.ts';
export interface ToasterSignature {
    Element: HTMLDivElement;
    Args: {
        fixed?: boolean;
    };
}
export default class Toaster extends Component<ToasterSignature> {
    toast: ToastService;
    get fixed(): boolean;
    get classList(): string;
}
