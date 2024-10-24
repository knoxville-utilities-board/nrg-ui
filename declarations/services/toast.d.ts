import Service from '@ember/service';
import type { EmberRunTimer } from '@ember/runloop/types';
type ToastOptions = {
    message?: string;
    type?: 'success' | 'info' | 'warning' | 'danger';
    sticky?: boolean;
    timeout?: number;
    timeoutReference?: EmberRunTimer;
};
export default class Toast extends Service {
    queue: Array<ToastOptions>;
    info(message: string, options: ToastOptions): void;
    success(message: string, options: ToastOptions): void;
    warning(message: string, options: ToastOptions): void;
    danger(message: string, options: ToastOptions): void;
    add(options: ToastOptions): void;
    remove(message: ToastOptions): void;
    clear(): void;
}
export {};
//# sourceMappingURL=toast.d.ts.map