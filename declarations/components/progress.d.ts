import Component from '@glimmer/component';
import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';
interface SegmentSignature {
    Element: HTMLDivElement;
    Args: {
        animated?: boolean;
        hideLabel?: boolean;
        label?: string;
        multiple: boolean;
        progress?: number;
        striped?: boolean;
        title?: string;
    };
}
interface ProgressSignature {
    Element: HTMLDivElement;
    Args: {
        animated?: boolean;
        hideLabel?: boolean;
        label?: string;
        progress: number;
        showLabel?: boolean;
        stacked?: boolean;
        striped?: boolean;
        title?: string;
    };
    Blocks: {
        default?: [ComponentLike<Segment>];
    };
}
declare class Segment extends Component<SegmentSignature> {
    get classList(): string;
    get label(): string;
    get widthStyle(): import("@ember/template").SafeString;
}
declare const ProgressComponent: TOC<ProgressSignature>;
export default ProgressComponent;
//# sourceMappingURL=progress.d.ts.map