import { registerDestructor } from '@ember/destroyable';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { t } from 'ember-intl';

import BoundValue from './bound-value.ts';
import { classes } from '../../helpers/classes.ts';
import onInsert from '../../modifiers/on-insert.ts';
import onUpdate from '../../modifiers/on-update.ts';
import { FileValidator } from '../../validation/index.ts';
import Button from '../button.gts';

import type { FormType } from './index.gts';

export interface SelectedFileListSignature {
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
    accept?: string[];
    describedBy?: string;
    disabled?: boolean;
    form?: FormType;
    id?: string;
    isInvalid?: boolean;
    isWarning?: boolean;
    validatorKey?: string;
    onSelect?: (files: File[]) => unknown;
    onRemove?: (file: File) => unknown;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

class SelectedFileList extends Component<SelectedFileListSignature> {
  @action
  removeFile(file: File) {
    this.args.onRemove?.(file);
  }

  <template>
    {{#if @files}}
      <div class="m-0 p-0 col-12">
        <ul class={{classes "list-group list-group-flush rounded p-0 col-12 form-control" (if @isInvalid "is-invalid") (if @isWarning "is-warning")}}>
          {{#each @files as |file|}}
            <li class="col-12 list-group-item d-flex flex-row align-items-center justify-content-between">
              {{file.name}}
              <Button data-test-remove class="btn-link" @onClick={{fn this.removeFile file}}>{{t "nrg.file-upload.remove"}}</Button>
            </li>
          {{/each}}
        </ul>
      </div>
    {{else}}
      <div class={{classes "form-control" (if @isInvalid "is-invalid") (if @isWarning "is-warning")}}>
        <p class="text-muted m-0">{{t "nrg.file-upload.noFiles"}}</p>
      </div>
    {{/if}}
  </template>
}

export default class FileUpload extends BoundValue<FileUploadSignature, File[]> {
  validatorId?: string;

  @tracked
  inputElement?: HTMLInputElement;

  @tracked
  isDraggingOver = false;

  @tracked
  selectedFiles: File[] = [];


  constructor(owner: unknown, args: FileUploadSignature['Args']) {
    super(owner, args);
    registerDestructor(this, () => {
      this.setupValidator();
    });
  }

  get accept() {
    return (this.args.accept as string[])?.join(', ') ?? '';
  }

  get dropzoneStyling() {
    let style = "border-style: dashed !important;";
    if (this.args.disabled) {
      style += "cursor: not-allowed !important;";
    }
    return style;
  }

  filterDuplicateFiles(files: FileList): File[] {
    if (this.selectedFiles.length === 0) {
      return Array.from(files);
    }
    const filteredFiles = [];
    for (const file of files) {
      if (!this.selectedFiles.some(selectedFile => selectedFile.name === file.name)) {
        filteredFiles.push(file);
      }
    }
    return filteredFiles;
  }

  triggerChange() {
    const event = new Event('change');
    this.inputElement?.dispatchEvent(event);
  }

  @action
  handleCancel(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  @action
  handleDragover(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (this.args.disabled) {
      return;
    }
    this.isDraggingOver = true;
  }

  @action
  handleDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (this.args.disabled) {
      return;
    }
    this.isDraggingOver = false;

    const files = event.dataTransfer?.files;

    if (files && files.length > 0) {
      this.inputElement!.files = files;
      this.triggerChange();
    }
  }

  @action
  initInput(element: HTMLElement) {
    if (element instanceof HTMLInputElement) {
      this.inputElement = element;
    }
  }

  @action
  openInput(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.inputElement!.value = '';
    this.inputElement!.click();
  }

  @action
  removeFile(file: File) {
    this.selectedFiles = this.selectedFiles.filter(selectedFile => selectedFile !== file);
    this.inputElement!.value = '';
    this.triggerChange();
    this.args.onRemove?.(file);
  }

  @action
  setupValidator() {
    const { binding, form, accept, validatorKey } = this.args;
    if (!binding || !form || !accept || !validatorKey) {
      return;
    }
    if (this.validatorId) {
      form.unregisterValidator(validatorKey, this.validatorId);
    }
    const fileValidator = new FileValidator(
      binding,
      { acceptedTypes: accept },
      binding.model,
    )
    form.registerValidator(fileValidator, validatorKey);
  }

  @action
  toggleIsDragging(isDragging: boolean) {
    if (this.args.disabled) {
      return;
    }
    this.isDraggingOver = isDragging;
  }

  @action
  updateValue(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const inputFiles = this.inputElement?.files;

    if (inputFiles && inputFiles.length > 0) {
      const filteredFiles = this.filterDuplicateFiles(inputFiles);
      this.selectedFiles = this.selectedFiles.concat(filteredFiles);
      this.value = this.selectedFiles;
      this.args.onSelect?.(filteredFiles);
    }

    if (inputFiles!.length === 0 && this.selectedFiles.length < this.value!.length) {
      this.value = this.selectedFiles;
    }
  }

  <template>
    <div
    class={{classes "form-control-plaintext p-0" (if @isInvalid "is-invalid") (if @isWarning "is-warning")}}
    {{onUpdate this.setupValidator @accept}}
    ...attributes
    >
      <div
        style={{htmlSafe this.dropzoneStyling}}
        class="p-4 border border-2 rounded-3 d-flex flex-row align-items-center
        {{if @disabled "bg-body-secondary"}}
        {{if this.isDraggingOver "bg-body-tertiary"}}"
        {{on "dragover" this.handleDragover}}
        {{on "dragenter" (fn this.toggleIsDragging true)}}
        {{on "dragend" (fn this.toggleIsDragging false)}}
        {{on "dragleave" (fn this.toggleIsDragging false)}}
        {{on "drop" this.handleDrop}}
      >
        <div class={{classes "w-100 d-flex flex-column flex-md-row align-items-center justify-content-center my-4" (if @disabled "text-body-tertiary")}} data-test-drop-zone>
          <i class="bi bi-file-earmark-text mx-2 fs-4" />
          <p class="m-0">
            {{t "nrg.file-upload.dragAndDrop"}}
          </p>
          <Button
            class="btn btn-link p-0 m-0 ms-1 fst-italic"
            @disabled={{@disabled}}
            @onClick={{this.openInput}}
            @text={{t "nrg.file-upload.selectFiles"}}
            data-test-open="input"
          />
          <input
            accept={{this.accept}}
            aria-describedby={{@describedBy}}
            disabled={{@disabled}}
            hidden
            id={{@id}}
            multiple
            type="file"
            {{on "change" this.updateValue}}
            {{on "cancel" this.handleCancel}}
            {{onInsert this.initInput}}
          />
        </div>
      </div>
      <div class="d-flex flex-column align-items-center p-0 mt-1">
        <SelectedFileList
          @files={{this.selectedFiles}}
          @isInvalid={{@isInvalid}}
          @isWarning={{@isWarning}}
          @onRemove={{this.removeFile}}
        />
      </div>
    </div>
  </template>
}
