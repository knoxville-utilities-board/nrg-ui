import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';
export interface SegmentSignature {
    Element: HTMLDivElement;
    Args: {
        animated?: boolean;
        hideLabel?: boolean;
        label?: string;
        multiple?: boolean;
        progress?: number;
        striped?: boolean;
        title?: string;
    };
}
export interface ProgressSignature {
    Element: HTMLDivElement;
    Args: {
        animated?: boolean;
        hideLabel?: boolean;
        label?: string;
        striped?: boolean;
        title?: string;
    } & ({
        stacked: true;
    } | {
        stacked?: false;
        progress: number;
    });
    Blocks: {
        default?: [ComponentLike<SegmentSignature>];
    };
}
declare const Progress: TOC<ProgressSignature>;
export default Progress;
