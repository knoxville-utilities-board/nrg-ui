import Component from '@glimmer/component';
import type { Direction } from './popover';
import type { Alignment } from '@floating-ui/dom';
import type { ComponentLike } from '@glint/template';
export interface TooltipSignature {
    Element: HTMLSpanElement;
    Args: {
        alignment?: Alignment;
        controlElement?: HTMLElement;
        delay?: number;
        flip?: boolean;
        offset?: string | number;
        side?: Direction;
        onShow?: () => unknown;
        onHide?: () => unknown;
    };
    Blocks: {
        default: [ComponentLike<TooltipTargetSignature>];
        content: [
            {
                Header: ComponentLike<HeaderSignature>;
                Body: ComponentLike<BodySignature>;
            }
        ];
    };
}
interface HeaderSignature {
    Element: HTMLHeadingElement;
    Blocks: {
        default: [];
    };
}
interface BodySignature {
    Element: HTMLDivElement;
    Blocks: {
        default: [];
    };
}
interface TooltipTargetSignature {
    Element: HTMLSpanElement;
    Args: {
        onMouseEnter?: (evt: MouseEvent) => unknown;
        onMouseLeave?: (evt: MouseEvent) => unknown;
    };
    Blocks: {
        default: [];
    };
}
declare class Tooltip extends Component<TooltipSignature> {
    get delay(): number;
}
export default Tooltip;
