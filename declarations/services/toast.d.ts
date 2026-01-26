import Service from '@ember/service';
import type { Timer } from '@ember/runloop';
export type ToastOptions = {
    message: string;
    type: 'success' | 'info' | 'warning' | 'danger';
    sticky?: boolean;
    timeout?: number;
    timeoutReference?: Timer;
};
export default class Toast extends Service {
    queue: Array<ToastOptions>;
    info(message: string, options?: Partial<ToastOptions>): void;
    success(message: string, options?: Partial<ToastOptions>): void;
    warning(message: string, options?: Partial<ToastOptions>): void;
    danger(message: string, options?: Partial<ToastOptions>): void;
    add(options: ToastOptions): void;
    remove(message: ToastOptions): void;
    clear(): void;
}
declare module '@ember/service' {
    interface Registry {
        toast: Toast;
    }
}
