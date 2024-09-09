import { A } from '@ember/array';
import MutableArray from '@ember/array/mutable';
import { action } from '@ember/object';
import Service from '@ember/service';
import { isBlank } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

type FlashOptions = {
  message?: string;
  type?: 'success' | 'info' | 'warning' | 'danger' | undefined;
  sticky?: boolean;
  timeout?: 5000;
  timeoutReference?: number;
};

export default class FlashMessage extends Service {
  @tracked
  queue: MutableArray<FlashOptions> = A();

  @action
  info(message: string, options: FlashOptions) {
    this.add({
      message,
      type: 'info',
      ...options,
    });
  }

  @action
  success(message: string, options: FlashOptions) {
    this.add({
      message,
      type: 'success',
      ...options,
    });
  }

  @action
  warning(message: string, options: FlashOptions) {
    this.add({
      message,
      type: 'warning',
      ...options,
    });
  }

  @action
  danger(message: string, options: FlashOptions) {
    this.add({
      message,
      type: 'danger',
      ...options,
    });
  }

  @action
  add(options: FlashOptions) {
    if (isBlank(options.timeout) && options.sticky !== true) {
      options.timeout = 5000;
    }
    if (options.timeout) {
      options.timeoutReference = setTimeout(() => {
        this.queue.removeObject(options);
      }, options.timeout);
    }
    this.queue.pushObject(options);
  }

  @action
  remove(message: FlashOptions) {
    message.timeoutReference && clearTimeout(message.timeoutReference);
    this.queue.removeObject(message);
  }

  @action
  clear() {
    this.queue.clear();
  }
}
