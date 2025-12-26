import { assert } from '@ember/debug';
import Service from '@ember/service';
import { macroCondition, isTesting as isTesting$1, getOwnConfig } from '@embroider/macros';
import { tracked } from '@glimmer/tracking';
import { runTask } from 'ember-lifeline';
import { TrackedSet } from 'tracked-built-ins';
import { g, i } from 'decorator-transforms/runtime';

const isTesting = macroCondition(isTesting$1()) ? true : false;
const defaultBreakpoints = Object.freeze({
  xsmall: '(min-width: 0px) and (max-width: 575px)',
  small: '(min-width: 576px) and (max-width: 767px)',
  medium: '(min-width: 768px) and (max-width: 991px)',
  large: '(min-width: 992px) and (max-width: 1199px)',
  xlarge: '(min-width: 1200px) and (max-width: 1399px)',
  xxlarge: '(min-width: 1400px)'
});
class Media extends Service {
  _mockedBreakpoint = 'desktop';
  static {
    g(this.prototype, "_matches", [tracked], function () {
      return new TrackedSet();
    });
  }
  #_matches = (i(this, "_matches"), void 0);
  static {
    g(this.prototype, "mocked", [tracked], function () {
      return isTesting;
    });
  }
  #mocked = (i(this, "mocked"), void 0);
  callbacks = {
    mediaChanged: new Set()
  };
  breakpoints = {
    ...defaultBreakpoints,
    ...getOwnConfig()?.breakpoints
  };
  constructor(owner) {
    super(owner);
    for (const [name, query] of Object.entries(this.breakpoints)) {
      this.match(name, query);
    }
  }
  get matches() {
    if (isTesting && this.mocked) {
      return new TrackedSet([this._mockedBreakpoint]);
    }
    return this._matches;
  }
  set matches(value) {
    this._matches = new TrackedSet(value);
  }
  get isXSmall() {
    return this.matches.has('xsmall');
  }
  get isSmall() {
    return this.matches.has('small');
  }
  get isMedium() {
    return this.matches.has('medium');
  }
  get isLarge() {
    return this.matches.has('large');
  }
  get isXLarge() {
    return this.matches.has('xlarge');
  }
  get isXXLarge() {
    return this.matches.has('xxlarge');
  }
  #getCallbackList(name) {
    const callbackList = this.callbacks[name];
    assert(`Callback '${name}' is not valid`, callbackList !== undefined);
    return callbackList;
  }
  on(name, callback) {
    const callbackList = this.#getCallbackList(name);
    callbackList.add(callback);
  }
  off(name, callback) {
    const callbackList = this.#getCallbackList(name);
    callbackList.delete(callback);
  }
  trigger(name) {
    const callbackList = this.#getCallbackList(name);
    for (const callback of callbackList) {
      try {
        callback();
      } catch {
        // Ignore
      }
    }
  }
  match(name, query) {
    if (isTesting) {
      return;
    }
    const mediaQueryList = matchMedia(query);
    const listener = matcher => {
      let changed = false;
      if (matcher.matches) {
        if (!this.matches.has(name)) {
          this.matches.add(name);
          changed = true;
        }
      } else {
        changed = this.matches.has(name);
        this.matches.delete(name);
      }
      if (changed) {
        runTask(this, () => this.trigger('mediaChanged'));
      }
    };
    mediaQueryList.addEventListener('change', event => {
      runTask(this, () => listener(event));
    });
    listener(mediaQueryList);
  }
}

export { Media as default, defaultBreakpoints };
//# sourceMappingURL=media.js.map
