import BoundValue from './bound-value.ts';
import type { BoundValueSignature } from './bound-value.ts';
import type { FieldOptions } from './field';
import type Owner from '@ember/owner';
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
export type FileUploadSignature = BoundValueSignature<{
    Args: {
        accept?: string[];
        fieldOptions?: FieldOptions;
        validatorKey?: string;
        onAdd?: (files: File[]) => unknown;
        onRemove?: (file: File) => unknown;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}, File[]>;
export default class FileUpload extends BoundValue<FileUploadSignature, File[]> {
    validatorId?: string;
    inputElement?: HTMLInputElement;
    isDraggingOver: boolean;
    constructor(owner: Owner, args: FileUploadSignature['Args']);
    get accept(): string;
    get dropzoneStyling(): string;
    get validatorKey(): string;
    filterDuplicateFiles(files: FileList): File[];
    handleCancel(event: Event): void;
    handleDragover(event: DragEvent): void;
    handleDrop(event: DragEvent): void;
    initInput(element: HTMLElement): void;
    change(files: FileList): void;
    openInput(event: MouseEvent): void;
    removeFile(index: number): void;
    setupValidator(accept?: string[]): void;
    setupValidatorModifier: import("ember-modifier").FunctionBasedModifier<{
        Args: {
            Positional: [string[] | undefined];
            Named: import("ember-modifier/-private/signature").EmptyObject;
        };
        Element: Element;
    }>;
    toggleIsDragging(isDragging: boolean): void;
    updateValue(event: Event): void;
}
