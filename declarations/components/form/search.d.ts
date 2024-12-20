import BoundValue from './bound-value.ts';
import type { Optional } from '../../';
import type IntlService from 'ember-intl/services/intl';
declare type SearchOption<T> = {
    label: string;
    value: string | T;
    raw: T;
};
export interface SearchSignature<T> {
    Args: {
        basic?: boolean;
        clearable?: boolean;
        describedBy?: string;
        disabled?: boolean;
        displayPath?: string;
        format?: ((value: Optional<string>) => string) | false;
        hideSearchIcon?: boolean;
        id?: string;
        isInvalid?: boolean;
        isWarning?: boolean;
        loading?: boolean;
        minCharacters?: number;
        noResultsLabel?: string;
        placeholder?: string;
        readonly?: boolean;
        scrollable?: boolean;
        searchTimeout?: number;
        serializationPath?: string;
        onQuery: (searchString: string) => Promise<T[]>;
    };
    Element: HTMLDivElement;
}
export default class Search<T> extends BoundValue<SearchSignature<T>, string | T> {
    self: Record<'searchString', string>;
    activeIndex: number;
    options: T[];
    isFocused: boolean;
    menuElement: Optional<HTMLElement>;
    searchInputElement: Optional<HTMLElement>;
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
    get showOptions(): boolean;
    get classList(): string;
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
    scrollActiveOptionIntoView(): void;
    query: import("ember-concurrency").TaskForAsyncTaskFunction<unknown, (this: unknown, searchString: any) => Promise<void>>;
    selectOption(option: SearchOption<T>, index: number, evt?: Event): void;
    moveUp(evt: KeyboardEvent): void;
    moveDown(evt: KeyboardEvent): void;
    enterKeyHandler(evt?: KeyboardEvent): void;
    exitKeyHandler(evt?: KeyboardEvent): void;
    onFocus(evt: FocusEvent): void;
    onBlur(): void;
    onSearch(evt: Event): void;
    clear(): void;
    onSearchBarInsert(element: HTMLElement): void;
    onMenuInsert(element: HTMLElement): void;
}
export {};
//# sourceMappingURL=search.d.ts.map