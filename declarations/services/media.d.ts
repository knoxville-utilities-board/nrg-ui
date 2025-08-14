import Service from '@ember/service';
import { TrackedSet } from 'tracked-built-ins';
import type Owner from '@ember/owner';
type Fn = () => unknown | Promise<unknown>;
type Callbacks = {
    mediaChanged: Set<Fn>;
};
export declare const defaultBreakpoints: Readonly<{
    xsmall: "(min-width: 0px) and (max-width: 575px)";
    small: "(min-width: 576px) and (max-width: 767px)";
    medium: "(min-width: 768px) and (max-width: 991px)";
    large: "(min-width: 992px) and (max-width: 1199px)";
    xlarge: "(min-width: 1200px) and (max-width: 1399px)";
    xxlarge: "(min-width: 1400px)";
}>;
export default class Media extends Service {
    #private;
    _mockedBreakpoint: string;
    _matches: TrackedSet<string>;
    mocked: boolean;
    callbacks: Callbacks;
    breakpoints: {
        xsmall: string;
        small: string;
        medium: string;
        large: string;
        xlarge: string;
        xxlarge: string;
    };
    constructor(owner: Owner);
    get matches(): Set<string>;
    set matches(value: Iterable<string>);
    get isXSmall(): boolean;
    get isSmall(): boolean;
    get isMedium(): boolean;
    get isLarge(): boolean;
    get isXLarge(): boolean;
    get isXXLarge(): boolean;
    on(name: keyof Callbacks, callback: Fn): void;
    off(name: keyof Callbacks, callback: Fn): void;
    trigger(name: keyof Callbacks): void;
    match(name: string, query: string): void;
}
declare module '@ember/service' {
    interface Registry {
        media: Media;
    }
}
export {};
