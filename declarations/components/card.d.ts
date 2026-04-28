import Component from '@glimmer/component';
export interface CardSignature {
    Element: HTMLDivElement;
    Args: {
        isClickable?: boolean;
        onClick?: (evt: MouseEvent) => unknown;
        hasBorder?: boolean;
        hasHorizontalDivider?: boolean;
    };
    Blocks: {
        header: [];
        body: [];
    };
}
export default class Card extends Component<CardSignature> {
    get hasBorder(): boolean;
    get hasHorizontalDivider(): boolean;
    onClick(evt: MouseEvent): void;
}
