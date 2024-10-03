import { action } from '@ember/object';
import Service from '@ember/service';
import { isBlank } from '@ember/utils';
import { tracked } from '@glimmer/tracking';
import { runTask, cancelTask } from 'ember-lifeline';
import { TrackedArray } from 'tracked-built-ins';

import type { EmberRunTimer } from '@ember/runloop/types';

type FlashOptions = {
  message?: string;
  type?: 'success' | 'info' | 'warning' | 'danger';
  sticky?: boolean;
  timeout?: number;
  timeoutReference?: EmberRunTimer;
};

export default class FlashMessage extends Service {
  @tracked
  queue: Array<FlashOptions> = new TrackedArray();

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
      options.timeoutReference = runTask(
        this,
        () => {
          const index = this.queue.indexOf(options);
          if (index !== -1) {
            this.queue.splice(index, 1);
          }
        },
        options.timeout,
      ) as EmberRunTimer;
    }
    this.queue.push(options);
  }

  @action
  remove(message: FlashOptions) {
    message.timeoutReference && cancelTask(this, message.timeoutReference);
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
