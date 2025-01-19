import Helper from '@ember/component/helper';
import { getOwnConfig } from '@embroider/macros';

export interface VersionSignature {
  Return: string;
}

export function version() {
  return getOwnConfig().appVersion;
}

export default class Version extends Helper<VersionSignature> {
  compute() {
    return version();
  }
}
