import BoundValue from './bound-value.ts';
import type { Optional } from '../../index.ts';
import type { Direction, PopoverVisibility } from '../popover.ts';
import type { FieldOptions } from './field';
import type IntlService from 'ember-intl/services/intl';
declare type SearchOption<T> = {
    label: string;
    value: string | T;
    raw: T;
};
export interface SearchSignature<T> {
    Element: HTMLDivElement;
    Args: {
        basic?: boolean;
        clearable?: boolean;
        displayPath?: string;
        format?: ((value: Optional<string>) => string) | false;
        hideSearchIcon?: boolean;
        loading?: boolean;
        minCharacters?: number;
        noResultsLabel?: string;
        placeholder?: string;
        readonly?: boolean;
        scrollable?: boolean;
        searchTimeout?: number;
        serializationPath?: string;
        side?: Direction;
        fieldOptions?: FieldOptions;
        onShow?: () => unknown | Promise<unknown>;
        onHide?: () => unknown | Promise<unknown>;
        onQuery?: (searchString: string) => Promise<T[]> | T[];
    };
    Blocks: {
        option: [T];
    };
}
export default class Search<T> extends BoundValue<SearchSignature<T>, string | T> {
    self: Record<'searchString' | 'displayValue', string>;
    visibility: PopoverVisibility;
    inputElement: HTMLInputElement;
    menuElement: HTMLElement;
    activeIndex: number;
    options: T[];
    searchString: string;
    intl: IntlService;
    get clearable(): boolean;
    get hideSearchIcon(): boolean;
    get loading(): boolean;
    get minCharacters(): number;
    get noResultsLabel(): string;
    get placeholder(): string;
    get scrollable(): boolean;
    get searchTimeout(): number;
    get canPerformSearch(): boolean;
    get inputClassList(): string;
    get displayValue(): string;
    get internalOptions(): ({
        raw: T;
        label: string;
        value: string;
    } | {
        raw: (T & object) | (T & null);
        label: string;
        value: string | T;
    })[];
    get selectedOption(): Optional<SearchOption<T>>;
    set selectedOption(option: SearchOption<T>);
    get isInputElementActive(): boolean;
    get inputValue(): string;
    set inputValue(searchString: string);
    scrollActiveOptionIntoView(): void;
    query: import("ember-concurrency").TaskForAsyncTaskFunction<unknown, (this: unknown, searchString: any) => Promise<void>>;
    selectOption(option: SearchOption<T>, index: number, evt?: Event): void;
    moveUp(evt: KeyboardEvent): void;
    moveDown(evt: KeyboardEvent): void;
    enterKeyHandler(evt?: KeyboardEvent): void;
    exitKeyHandler(evt?: KeyboardEvent): void;
    onFocus(evt: FocusEvent): void;
    onBlur(): void;
    onMouseDown(evt: MouseEvent): void;
    clear(): void;
    onSearchBarInsert(element: HTMLElement): void;
    onMenuInsert(element: HTMLElement): void;
    setVisibility(visibility: PopoverVisibility): void;
}
export {};
