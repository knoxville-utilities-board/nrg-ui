import Helper from '@ember/component/helper';
export interface VersionSignature {
    Return: string | undefined;
}
export declare function version(): string | undefined;
export default class Version extends Helper<VersionSignature> {
    compute(): string | undefined;
}
