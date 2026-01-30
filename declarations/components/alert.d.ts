import Component from '@glimmer/component';
import type { IconType } from '../';
declare type AlertType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
export interface AlertSignature {
    Element: HTMLDivElement;
    Args: {
        dismissible?: boolean;
        icon?: IconType;
        text?: string;
        type?: AlertType;
        onDismiss?: () => unknown;
    };
    Blocks: {
        default?: [];
    };
}
export default class Alert extends Component<AlertSignature> {
    visible: boolean;
    get type(): AlertType;
    get classList(): string;
    onDismiss(): void;
    onDismissed(): void;
}
export {};
