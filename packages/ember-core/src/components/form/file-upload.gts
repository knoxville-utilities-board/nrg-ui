import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import BoundValue from './bound-value.ts';
import Button from '../button.gts';
import Modal from '../modal.gts';

import type ThemeService from '../../services/theme.ts';

export interface FileListSignature {
  Args: {
    files: File[];
    isInvalid?: boolean;
    isWarning?: boolean;
    onRemove?: (file: File) => void;
  };
  Element: HTMLUListElement;
  Blocks: {
    default: [];
  };
}

export interface FileUploadSignature {
  Args: {
    describedBy?: string;
    isInvalid?: boolean;
    isWarning?: boolean;
    onSelect?: () => void;
    onRemove?: () => void;
  };
  Blocks: {
    default: [];
  };
  Element: null;
}

class FileList extends Component<FileListSignature> {
  get classList() {
    const classList = ['form-control'];

    if (this.args.isInvalid) {
      classList.push('is-invalid');
    } else if (this.args.isWarning) {
      classList.push('is-warning');
    }

    return classList.join(' ');
  }

  @action
  removeFile(file: File) {
    this.args.onRemove?.(file);
  }

  <template>
    {{#if @files}}
      <div class="m-0 p-0 col-12">
        <ul class="list-group list-group-flush rounded p-0 col-12 {{this.classList}}">
          {{#each @files as |file|}}
            <li class="col-12 list-group-item d-flex flex-row align-items-center justify-content-between">
              {{file.name}}
              <Button class="btn-link" @onClick={{fn this.removeFile file}}>Remove</Button>
            </li>
          {{/each}}
        </ul>
      </div>
    {{else}}
      <div class="{{this.classList}}">
        <p class="text-muted m-0">No files selected</p>
      </div>
    {{/if}}
  </template>
}

export default class FileUpload extends BoundValue<FileUploadSignature, File[]> {
  @service
  declare theme: ThemeService;

  @tracked
  isDraggingOver = false;

  @tracked
  modalIsOpen = false;

  @tracked
  selectedFiles: File[] = [];

  get classList() {
    const classList = ['form-control-plaintext'];

    if (this.args.isInvalid) {
      classList.push('is-invalid');
    } else if (this.args.isWarning) {
      classList.push('is-warning');
    }

    return classList.join(' ');
  }

  get themedButtonClass() {
    const theme = this.theme.theme ?? 'light';
    return `btn-${theme}`;
  }

  checkDuplicateFiles(files: File[]): boolean {
    let isDuplicate = false;
    for (const file of files) {
      if (this.selectedFiles.some(existingFile => existingFile.name === file.name)) {
        isDuplicate = true;
        break;
      }
    }
    return isDuplicate;
  }

  updateValue(files: File[]) {
    const isDuplicate = this.checkDuplicateFiles(files);
    if (isDuplicate) {
      return;
    }
    this.selectedFiles = this.selectedFiles.concat(files);
    this.value = this.selectedFiles;
    this.args.onSelect?.();
  }

  @action
  handleDragover(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDraggingOver = true;
  }

  @action
  handleDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDraggingOver = false;

    const files = event.dataTransfer?.files;

    if (files && files.length > 0) {
      this.updateValue(Array.from(files));
    }
  }

  @action
  openInput(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    const input = document.querySelector('input[type="file"]');
    if (input instanceof HTMLInputElement) {
      input.value = '';
      input.click();
    }
  }

  @action
  removeFile(file: File) {
    this.selectedFiles = this.selectedFiles.filter(selectedFile => selectedFile !== file);
    this.value = this.selectedFiles;
    this.args.onRemove?.();
  }

  @action
  selectFile(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    const input = event.target as HTMLInputElement | null;
    const files = input?.files;
    if (files && files.length > 0) {
      this.updateValue(Array.from(files));
    }
  }

  @action
  toggleModal() {
    this.modalIsOpen = !this.modalIsOpen;
  }

  <template>
    <div class="{{this.classList}} p-0">
      <Button @onClick={{this.toggleModal}} class="{{this.themedButtonClass}} mb-2">
        <i class="bi bi-upload"/>
        Upload Files
      </Button>
        <FileList @files={{this.selectedFiles}} @onRemove={{this.removeFile}} @isInvalid={{@isInvalid}} @isWarning={{@isWarning}} />
      <Modal @dismissible={{true}} @isOpen={{this.modalIsOpen}} @onDismiss={{this.toggleModal}}>
        <:header>
          Upload Files
        </:header>
        <:default>
          <div class="d-flex flex-column align-items-center mt-4 row row-cols-12">
            <div
              style="border-style: dashed !important;"
              class="col-10 py-5 border border-2 rounded-3 d-flex flex-row align-items-center justify-content-center
              {{if this.isDraggingOver "bg-dark-subtle"}}"
              {{on "dragover" this.handleDragover}}
              {{on "dragenter" (fn (mut this.isDraggingOver) true)}}
              {{on "dragend" (fn (mut this.isDraggingOver) false)}}
              {{on "dragleave" (fn (mut this.isDraggingOver) false)}}
              {{on "drop" this.handleDrop}}
            >
              <div class="d-flex align-items-center justify-content-center my-5">
                <i class="bi bi-upload me-2" />
                <p class="m-0">
                  Drag and drop files here or
                </p>
                <Button class="btn btn-link p-0 m-0" @onClick={{this.openInput}}>
                  <span class="btn btn-link p-0 m-0">select a file</span>
                </Button>
                <input
                  type="file"
                  title="Select a file"
                  aria-label="Select a file"
                  multiple
                  hidden
                  {{on "change" this.selectFile}}
                />
              </div>
            </div>
            <div class="mt-3 col-10 d-flex flex-column align-items-center p-0">
              <FileList @files={{this.selectedFiles}} @onRemove={{this.removeFile}} @isInvalid={{@isInvalid}} @isWarning={{@isWarning}}/>
            </div>
            <Button class="col-auto align-self-end btn-primary mt-3 me-3" @onClick={{this.toggleModal}}>Done</Button>
          </div>
        </:default>
      </Modal>
    </div>
  </template>
}
