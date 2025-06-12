import BoundValue from './bound-value.ts';
import type { FormType } from './index.gts';
export interface SelectedFileListSignature {
    Args: {
        disabled?: boolean;
        files: File[] | null;
        isInvalid?: boolean;
        isWarning?: boolean;
        onRemove?: (index: number) => void;
    };
    Element: HTMLUListElement;
    Blocks: {
        default: [];
    };
}
export interface FileUploadSignature {
    Args: {
        accept?: string[];
        describedBy?: string;
        disabled?: boolean;
        form?: FormType;
        id?: string;
        isInvalid?: boolean;
        isWarning?: boolean;
        validatorKey?: string;
        onAdd?: (files: File[]) => unknown;
        onRemove?: (file: File) => unknown;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class FileUpload extends BoundValue<FileUploadSignature, File[]> {
    validatorId?: string;
    inputElement?: HTMLInputElement;
    isDraggingOver: boolean;
    constructor(owner: unknown, args: FileUploadSignature['Args']);
    get accept(): string;
    get dropzoneStyling(): string;
    filterDuplicateFiles(files: FileList): File[];
    handleCancel(event: Event): void;
    handleDragover(event: DragEvent): void;
    handleDrop(event: DragEvent): void;
    initInput(element: HTMLElement): void;
    change(files: FileList): void;
    openInput(event: MouseEvent): void;
    removeFile(index: number): void;
    setupValidator(): void;
    toggleIsDragging(isDragging: boolean): void;
    updateValue(event: Event): void;
}
