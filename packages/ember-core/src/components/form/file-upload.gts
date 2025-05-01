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
    acceptedFileTypes?: string[];
    maxUploadCount?: number;
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
    <div class="{{this.classList}} m-0 p-0">
      <ul class="list-group col-12">
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

  get themedButtonClass() {
    const theme = this.theme.theme ?? 'light';
    return `btn-${theme}`;
  }

  get maxCountReached() {
    return this.selectedFiles.length >= (this.args.maxUploadCount ?? Infinity);
  }

  @action
  handleDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDraggingOver = false;

    if (this.maxCountReached) {
      return;
    }

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.selectedFiles = this.selectedFiles.concat(Array.from(files));
      this.value = this.selectedFiles;
      this.args.onSelect?.();
    }
  }

  @action
  handleDragover(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDraggingOver = true;
  }

  @action
  openInput(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    const input = document.querySelector('input[type="file"]');
    if (input instanceof HTMLInputElement) {
      input.click();
    }
  }

  @action
  removeFile(file: File) {
    this.selectedFiles = this.selectedFiles.filter(f => f !== file);
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
      this.selectedFiles = this.selectedFiles.concat(Array.from(files));
      this.value = this.selectedFiles;
    }
    this.args.onSelect?.();
  }

  @action
  toggleModal() {
    this.modalIsOpen = !this.modalIsOpen;
  }

  <template>
    <div>
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
              {{#if this.maxCountReached}}
                <p class="fw-semibold mx-0 my-5">Maximum file count reached</p>
              {{else}}
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
                    disabled={{this.maxCountReached}}
                  />
                </div>
              {{/if}}
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
