import Component from '@glimmer/component';
import type { Optional } from '../index.ts';
export interface Meta {
    start: string | number;
    count: string | number;
    total: string | number;
}
export interface PaginationSignature {
    Element: HTMLUListElement;
    Args: {
        compact?: boolean;
        defaultPageSize?: number;
        enablePageJump?: boolean;
        meta?: Meta;
        pageJumpDebounce?: number;
        pageSizes?: number[];
        showDetailedMeta?: boolean;
        onChangePage?: (start: number) => void;
        onChangePageSize?: (pageSize: number) => void;
    };
    Blocks: {
        default: [];
    };
}
interface Page {
    number?: number;
    current?: boolean;
    blank?: boolean;
}
export default class Pagination extends Component<PaginationSignature> {
    currentPageNumber: number;
    get meta(): {
        start: number;
        count: number;
        total: number;
    };
    get defaultPageSize(): number;
    get selectedPageSize(): number;
    set selectedPageSize(pageSize: number);
    get firstPage(): {
        number: number;
        current: boolean;
    };
    get currentPage(): number;
    get totalPages(): number;
    get canStepForward(): boolean;
    get canStepBackward(): boolean;
    get currentPageStart(): number;
    get currentPageEnd(): number;
    get showFirstPage(): boolean;
    get showLastPage(): boolean;
    get pageItems(): Page[];
    get pageSizes(): number[];
    get jumpToDebounce(): number;
    getPageNumberFromStart(start: number): number;
    getStartFromPageNumber(page: number): number;
    changePage: (page: Page, evt?: Event) => void;
    jumpToPage: (page: Optional<number>) => void;
    jumpToLastPage: (evt: Event) => void;
    goToPage: import("ember-concurrency").TaskForAsyncTaskFunction<unknown, (this: unknown, page: any) => Promise<void>>;
    stepForward: (evt: Event) => void;
    stepBackward: (evt: Event) => void;
}
export {};
