import Component from '@glimmer/component';
export declare const typeBorder = "border";
export declare const typeGrow = "grow";
export interface LoadingIndicatorSignature {
    Element: HTMLDivElement;
    Args: {
        label?: string;
        showLabel?: boolean;
        type?: typeof typeBorder | typeof typeGrow;
    };
}
export default class LoadingIndicator extends Component<LoadingIndicatorSignature> {
    get typeClass(): "spinner-grow" | "spinner-border";
    get label(): string;
}
