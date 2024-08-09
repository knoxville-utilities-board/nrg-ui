import Component from '@glimmer/component';
import type { Icon } from '../types';
declare type AlertType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
interface AlertSignature {
    Element: HTMLDivElement | null;
    Args: {
        dismissible?: boolean;
        icon?: Icon;
        text?: string;
        type?: AlertType;
        onDismiss?: () => unknown;
    };
    Blocks: {
        default?: [];
    };
}
export default class AlertComponent extends Component<AlertSignature> {
    visible: boolean;
    get type(): AlertType;
    get classList(): string;
    onDismiss(): void;
    onDismissed(): void;
}
export {};
//# sourceMappingURL=alert.d.ts.map