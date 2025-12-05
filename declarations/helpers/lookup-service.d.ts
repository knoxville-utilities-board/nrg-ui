import Helper from '@ember/component/helper';
import type { DIRegistry } from '@ember/owner';
export interface LookupServiceSignature<Name extends keyof DIRegistry['service'] & string> {
    Args: {
        Positional: [Name];
        Named: {
            singleton?: boolean;
        };
    };
    Return: DIRegistry['service'][Name];
}
export default class LookupService<Name extends keyof DIRegistry['service'] & string> extends Helper<LookupServiceSignature<Name>> {
    compute([name]: [Name], { singleton }: {
        singleton?: boolean;
    }): DIRegistry['service'][Name];
}
