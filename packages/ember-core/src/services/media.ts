import { assert } from '@ember/debug';
import Service from '@ember/service';
import {
  getOwnConfig,
  isTesting as isTestingMacro,
  macroCondition,
} from '@embroider/macros';
import { tracked } from '@glimmer/tracking';
import { runTask } from 'ember-lifeline';
import { TrackedSet } from 'tracked-built-ins';

import type Owner from '@ember/owner';

const isTesting = macroCondition(isTestingMacro()) ? true : false;

type Fn = () => unknown | Promise<unknown>;
type Callbacks = {
  mediaChanged: Set<Fn>;
};
type Matcher = {
  matches: boolean;
  media: string;
};

export const defaultBreakpoints = Object.freeze({
  xsmall: '(min-width: 0px) and (max-width: 575px)',
  small: '(min-width: 576px) and (max-width: 767px)',
  medium: '(min-width: 768px) and (max-width: 991px)',
  large: '(min-width: 992px) and (max-width: 1199px)',
  xlarge: '(min-width: 1200px) and (max-width: 1399px)',
  xxlarge: '(min-width: 1400px)',
});

export default class Media extends Service {
  _mockedBreakpoint = 'desktop';

  @tracked
  _matches = new TrackedSet<string>();

  @tracked
  mocked = isTesting;

  callbacks: Callbacks = {
    mediaChanged: new Set(),
  };

  breakpoints = {
    ...defaultBreakpoints,
    ...getOwnConfig()?.breakpoints,
  };

  constructor(owner: Owner) {
    super(owner);

    for (const [name, query] of Object.entries(this.breakpoints)) {
      this.match(name, query);
    }
  }

  get matches(): Set<string> {
    if (isTesting && this.mocked) {
      return new TrackedSet([this._mockedBreakpoint]);
    }

    return this._matches;
  }

  set matches(value: Iterable<string>) {
    this._matches = new TrackedSet(value);
  }

  get isXSmall(): boolean {
    return this.matches.has('xsmall');
  }

  get isSmall(): boolean {
    return this.matches.has('small');
  }

  get isMedium(): boolean {
    return this.matches.has('medium');
  }

  get isLarge(): boolean {
    return this.matches.has('large');
  }

  get isXLarge(): boolean {
    return this.matches.has('xlarge');
  }

  get isXXLarge(): boolean {
    return this.matches.has('xxlarge');
  }

  #getCallbackList(name: keyof Callbacks) {
    const callbackList = this.callbacks[name];

    assert(`Callback '${name}' is not valid`, callbackList !== undefined);

    return callbackList;
  }

  on(name: keyof Callbacks, callback: Fn) {
    const callbackList = this.#getCallbackList(name);

    callbackList.add(callback);
  }

  off(name: keyof Callbacks, callback: Fn) {
    const callbackList = this.#getCallbackList(name);

    callbackList.delete(callback);
  }

  trigger(name: keyof Callbacks) {
    const callbackList = this.#getCallbackList(name);
    for (const callback of callbackList) {
      try {
        callback();
      } catch {}
    }
  }

  match(name: string, query: string) {
    if (isTesting) {
      return;
    }

    const mediaQueryList = matchMedia(query);

    const listener = (matcher: Matcher) => {
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

    mediaQueryList.addEventListener('change', (event) => {
      runTask(this, () => listener(event));
    });

    listener(mediaQueryList);
  }
}

declare module '@ember/service' {
  interface Registry {
    media: Media;
  }
}
