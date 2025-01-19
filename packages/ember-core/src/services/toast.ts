import { action } from '@ember/object';
import Service from '@ember/service';
import { isBlank } from '@ember/utils';
import { tracked } from '@glimmer/tracking';
import { cancelTask, runTask } from 'ember-lifeline';
import { TrackedArray } from 'tracked-built-ins';

import type { Timer } from '@ember/runloop';

export type ToastOptions = {
  message: string;
  type: 'success' | 'info' | 'warning' | 'danger';
  sticky?: boolean;
  timeout?: number;
  timeoutReference?: Timer;
};

export default class Toast extends Service {
  @tracked
  queue: Array<ToastOptions> = new TrackedArray();

  @action
  info(message: string, options?: Partial<ToastOptions>) {
    this.add({
      ...options,
      message,
      type: 'info',
    });
  }

  @action
  success(message: string, options?: Partial<ToastOptions>) {
    this.add({
      ...options,
      message,
      type: 'success',
    });
  }

  @action
  warning(message: string, options?: Partial<ToastOptions>) {
    this.add({
      ...options,
      message,
      type: 'warning',
    });
  }

  @action
  danger(message: string, options?: Partial<ToastOptions>) {
    this.add({
      ...options,
      message,
      type: 'danger',
    });
  }

  @action
  add(options: ToastOptions) {
    if (isBlank(options.timeout) && options.sticky !== true) {
      options.timeout = 5000;
    }
    if (options.timeout) {
      options.timeoutReference = runTask(
        this,
        () => {
          const index = this.queue.indexOf(options);
          if (index !== -1) {
            this.queue.splice(index, 1);
          }
        },
        options.timeout,
      ) as Timer;
    }
    this.queue.push(options);
  }

  @action
  remove(message: ToastOptions) {
    if (message.timeoutReference) {
      // @ts-expect-error - ember-lifeline currently uses DT types, not native types
      // https://github.com/ember-lifeline/ember-lifeline/issues/1178
      cancelTask(this, message.timeoutReference);
    }
    const index = this.queue.indexOf(message);
    if (index !== -1) {
      this.queue.splice(index, 1);
    }
  }

  @action
  clear() {
    this.queue.splice(0, this.queue.length);
  }
}

declare module '@ember/service' {
  interface Registry {
    toast: Toast;
  }
}
