import { action } from '@ember/object';
import Service from '@ember/service';
import { isBlank } from '@ember/utils';
import { tracked } from '@glimmer/tracking';
import { runTask, cancelTask } from 'ember-lifeline';
import { TrackedArray } from 'tracked-built-ins';
import { g, i, n } from 'decorator-transforms/runtime';

class Toast extends Service {
  static {
    g(this.prototype, "queue", [tracked], function () {
      return new TrackedArray();
    });
  }
  #queue = (i(this, "queue"), void 0);
  info(message, options) {
    this.add({
      ...options,
      message,
      type: 'info'
    });
  }
  static {
    n(this.prototype, "info", [action]);
  }
  success(message, options) {
    this.add({
      ...options,
      message,
      type: 'success'
    });
  }
  static {
    n(this.prototype, "success", [action]);
  }
  warning(message, options) {
    this.add({
      ...options,
      message,
      type: 'warning'
    });
  }
  static {
    n(this.prototype, "warning", [action]);
  }
  danger(message, options) {
    this.add({
      ...options,
      message,
      type: 'danger'
    });
  }
  static {
    n(this.prototype, "danger", [action]);
  }
  add(options) {
    if (isBlank(options.timeout) && options.sticky !== true) {
      options.timeout = 5000;
    }
    if (options.timeout) {
      options.timeoutReference = runTask(this, () => {
        const index = this.queue.indexOf(options);
        if (index !== -1) {
          this.queue.splice(index, 1);
        }
      }, options.timeout);
    }
    this.queue.push(options);
  }
  static {
    n(this.prototype, "add", [action]);
  }
  remove(message) {
    if (message.timeoutReference) {
      cancelTask(this, message.timeoutReference);
    }
    const index = this.queue.indexOf(message);
    if (index !== -1) {
      this.queue.splice(index, 1);
    }
  }
  static {
    n(this.prototype, "remove", [action]);
  }
  clear() {
    this.queue.splice(0, this.queue.length);
  }
  static {
    n(this.prototype, "clear", [action]);
  }
}

export { Toast as default };
//# sourceMappingURL=toast.js.map
