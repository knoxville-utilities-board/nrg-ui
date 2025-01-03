import type { Direction } from './popover.gts';
import type { TOC } from '@ember/component/template-only';
import type { Alignment } from '@floating-ui/dom';
import type { ComponentLike } from '@glint/template';
export interface TooltipSignature {
    Element: HTMLSpanElement;
    Args: {
        alignment?: Alignment;
        controlElement?: HTMLElement;
        isShown?: boolean;
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
    Element: HTMLDivElement;
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
declare const Tooltip: TOC<TooltipSignature>;
export default Tooltip;
//# sourceMappingURL=tooltip.d.ts.map