import { assert, runInDebug } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { t } from 'ember-intl';
import { scheduleTask } from 'ember-lifeline';
import { TrackedArray } from 'tracked-built-ins';

import BoundValue from './bound-value.ts';
import { classes } from '../../helpers/classes.ts';
import onInsert from '../../modifiers/on-insert.ts';
import onUpdate from '../../modifiers/on-update.ts';
import { FileValidator } from '../../validation/index.ts';
import Button from '../button.gts';

import type { FieldOptions } from './field.gts';
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

export interface FileUploadSignature {
  Args: {
    accept?: string[];

    fieldOptions?: FieldOptions;

    onAdd?: (files: File[]) => unknown;
    onRemove?: (file: File) => unknown;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

class SelectedFileList extends Component<SelectedFileListSignature> {
  @action
  removeFile(index: number) {
    this.args.onRemove?.(index);
  }

  <template>
    {{#if @files}}
      <div class="m-0 p-0 col-12">
        <ul
          class={{classes
            "list-group list-group-flush rounded p-0 col-12 form-control"
            (if @isInvalid "is-invalid")
            (if @isWarning "is-warning")
          }}
        >
          {{#each @files as |file index|}}
            <li
              class="col-12 list-group-item d-flex flex-row align-items-center justify-content-between"
            >
              {{file.name}}
              {{#unless @disabled}}
                <Button
                  data-test-remove
                  class="btn-link"
                  @onClick={{fn this.removeFile index}}
                >
                  {{t "nrg.file-upload.remove"}}
                </Button>
              {{/unless}}
            </li>
          {{/each}}
        </ul>
      </div>
    {{else}}
      <div
        class={{classes
          "form-control"
          (if @isInvalid "is-invalid")
          (if @isWarning "is-warning")
        }}
      >
        <p class="text-muted m-0">{{t "nrg.file-upload.noFiles"}}</p>
      </div>
    {{/if}}
  </template>
}

export default class FileUpload extends BoundValue<
  FileUploadSignature,
  File[]
> {
  validatorId?: string;

  @tracked
  inputElement?: HTMLInputElement;

  @tracked
  isDraggingOver = false;

  constructor(owner: Owner, args: FileUploadSignature['Args']) {
    super(owner, args);
    registerDestructor(this, () => {
      this.setupValidator();
    });

    if (!(this.value instanceof TrackedArray)) {
      scheduleTask(this, 'actions', () => {
        this.onChange(new TrackedArray(this.value ?? []));
      });
    }
  }

  get accept() {
    if (this.args.accept) {
      runInDebug(() => {
        for (const type of this.args.accept ?? []) {
          const fileExtension = type.startsWith('.');
          const mimeType = type.includes('/');
          if (!fileExtension && !mimeType) {
            assert(
              'The accept argument\'s file type strings should be in the format "image/png" or ".pdf" to be compatible with the input\'s \"accept\" attribute.',
            );
          }
        }
      });
      return (this.args.accept as string[])?.join(', ');
    }
    return '';
  }

  get dropzoneStyling() {
    let style = 'border-style: dashed !important;';
    if (this.args.fieldOptions?.disabled) {
      style += 'cursor: not-allowed !important;';
    }
    return style;
  }

  filterDuplicateFiles(files: FileList): File[] {
    if (!this.value || this.value!.length === 0) {
      return Array.from(files);
    }
    const filteredFiles = [];
    for (const newFile of files) {
      if (!this.value!.some((file) => file.name === newFile.name)) {
        filteredFiles.push(newFile);
      }
    }
    return filteredFiles;
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
    if (this.args.fieldOptions?.disabled) {
      return;
    }
    this.isDraggingOver = true;
  }

  @action
  handleDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (this.args.fieldOptions?.disabled) {
      return;
    }
    this.isDraggingOver = false;

    const files = event.dataTransfer?.files;
    this.change(files!);
  }

  @action
  initInput(element: HTMLElement) {
    this.inputElement = element as HTMLInputElement;
  }

  @action
  change(files: FileList) {
    if (this.args.fieldOptions?.disabled) {
      return;
    }

    const value = this.value ?? [];

    if (files && files.length > 0) {
      const filteredFiles = this.filterDuplicateFiles(files);
      value.push(...filteredFiles);
      this.onChange(value);
      this.args.onAdd?.(filteredFiles);
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
  removeFile(index: number) {
    if (this.args.fieldOptions?.disabled) {
      return;
    }
    const [removedFile] = this.value!.splice(index, 1);
    this.onChange(this.value);
    this.args.onRemove?.(removedFile!);
  }

  @action
  setupValidator() {
    const { binding, accept } = this.args;
    const { form, validatorKey } = this.args.fieldOptions ?? {};
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
    );
    form.registerValidator(fileValidator, validatorKey);
  }

  @action
  toggleIsDragging(isDragging: boolean) {
    if (this.args.fieldOptions?.disabled) {
      return;
    }
    this.isDraggingOver = isDragging;
  }

  @action
  updateValue(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const inputFiles = this.inputElement?.files;
    this.change(inputFiles!);
  }

  <template>
    <div
      class={{classes
        "form-control-plaintext p-0"
        (if @fieldOptions.isInvalid "is-invalid")
        (if @fieldOptions.isWarning "is-warning")
      }}
      {{onUpdate this.setupValidator @accept}}
      ...attributes
    >
      <div
        style={{htmlSafe this.dropzoneStyling}}
        class="p-4 border border-2 rounded-3 d-flex flex-row align-items-center
          {{if @fieldOptions.disabled 'bg-body-secondary'}}
          {{if this.isDraggingOver 'bg-body-tertiary'}}"
        {{on "dragover" this.handleDragover}}
        {{on "dragenter" (fn this.toggleIsDragging true)}}
        {{on "dragend" (fn this.toggleIsDragging false)}}
        {{on "dragleave" (fn this.toggleIsDragging false)}}
        {{on "drop" this.handleDrop}}
      >
        <div
          class={{classes
            "w-100 d-flex flex-column flex-md-row align-items-center justify-content-center my-4"
            (if @fieldOptions.disabled "text-body-tertiary")
          }}
          data-test-drop-zone
        >
          <i class="bi bi-file-earmark-text mx-2 fs-4" />
          <p class="m-0">
            {{t "nrg.file-upload.dragAndDrop"}}
          </p>
          <Button
            class="btn btn-link p-0 m-0 ms-1 fst-italic"
            @disabled={{@fieldOptions.disabled}}
            @onClick={{this.openInput}}
            @text={{t "nrg.file-upload.selectFiles"}}
            data-test-open="input"
          />
          <input
            accept={{this.accept}}
            aria-describedby={{@fieldOptions.describedBy}}
            disabled={{@fieldOptions.disabled}}
            hidden
            id={{@fieldOptions.id}}
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
          @disabled={{@fieldOptions.disabled}}
          @files={{this.value}}
          @isInvalid={{@fieldOptions.isInvalid}}
          @isWarning={{@fieldOptions.isWarning}}
          @onRemove={{this.removeFile}}
        />
      </div>
    </div>
  </template>
}
