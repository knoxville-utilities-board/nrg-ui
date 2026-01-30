import Helper from '@ember/component/helper';
import { getOwnConfig } from '@embroider/macros';

function version() {
  return getOwnConfig()?.appVersion;
}
class Version extends Helper {
  compute() {
    return version();
  }
}

export { Version as default, version };
//# sourceMappingURL=version.js.map
