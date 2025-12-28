import { runInDebug, assert } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { t } from 'ember-intl';
import { scheduleTask, runTask } from 'ember-lifeline';
import { modifier } from 'ember-modifier';
import { TrackedArray } from 'tracked-built-ins';
import BoundValue from './bound-value.js';
import { classes } from '../../helpers/classes.js';
import OnInsertModifier from '../../modifiers/on-insert.js';
import '../../validation/validators/base.js';
import '@ember/utils';
import '../../validation/validators/custom.js';
import FileValidator from '../../validation/validators/file.js';
import Button from '../button.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n, g, i } from 'decorator-transforms/runtime';

class SelectedFileList extends Component {
  removeFile(index) {
    this.args.onRemove?.(index);
  }
  static {
    n(this.prototype, "removeFile", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("{{#if @files}}\n  <div class=\"m-0 p-0 col-12\">\n    <ul class={{classes \"list-group list-group-flush rounded p-0 col-12 form-control\" (if @isInvalid \"is-invalid\") (if @isWarning \"is-warning\")}}>\n      {{#each @files as |file index|}}\n        <li class=\"col-12 list-group-item d-flex flex-row align-items-center justify-content-between\">\n          {{file.name}}\n          {{#unless @disabled}}\n            <Button data-test-remove class=\"btn-link\" @onClick={{fn this.removeFile index}}>\n              {{t \"nrg.file-upload.remove\"}}\n            </Button>\n          {{/unless}}\n        </li>\n      {{/each}}\n    </ul>\n  </div>\n{{else}}\n  <div class={{classes \"form-control\" (if @isInvalid \"is-invalid\") (if @isWarning \"is-warning\")}}>\n    <p class=\"text-muted m-0\">{{t \"nrg.file-upload.noFiles\"}}</p>\n  </div>\n{{/if}}", {
      strictMode: true,
      scope: () => ({
        classes,
        Button,
        fn,
        t
      })
    }), this);
  }
}
class FileUpload extends BoundValue {
  validatorId;
  static {
    g(this.prototype, "inputElement", [tracked]);
  }
  #inputElement = (i(this, "inputElement"), void 0);
  static {
    g(this.prototype, "isDraggingOver", [tracked], function () {
      return false;
    });
  }
  #isDraggingOver = (i(this, "isDraggingOver"), void 0);
  constructor(owner, args) {
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
            assert('The accept argument\'s file type strings should be in the format "image/png" or ".pdf" to be compatible with the input\'s "accept" attribute.');
          }
        }
      });
      return this.args.accept?.join(', ');
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
  get validatorKey() {
    return this.args.validatorKey ?? this.args.binding.valuePath;
  }
  filterDuplicateFiles(files) {
    if (!this.value || this.value.length === 0) {
      return Array.from(files);
    }
    const filteredFiles = [];
    for (const newFile of files) {
      if (!this.value.some(file => file.name === newFile.name)) {
        filteredFiles.push(newFile);
      }
    }
    return filteredFiles;
  }
  handleCancel(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  static {
    n(this.prototype, "handleCancel", [action]);
  }
  handleDragover(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.args.fieldOptions?.disabled) {
      return;
    }
    this.isDraggingOver = true;
  }
  static {
    n(this.prototype, "handleDragover", [action]);
  }
  handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.args.fieldOptions?.disabled) {
      return;
    }
    this.isDraggingOver = false;
    const files = event.dataTransfer?.files;
    this.change(files);
  }
  static {
    n(this.prototype, "handleDrop", [action]);
  }
  initInput(element) {
    this.inputElement = element;
  }
  static {
    n(this.prototype, "initInput", [action]);
  }
  change(files) {
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
  static {
    n(this.prototype, "change", [action]);
  }
  openInput(event) {
    event.preventDefault();
    event.stopPropagation();
    this.inputElement.value = '';
    this.inputElement.click();
  }
  static {
    n(this.prototype, "openInput", [action]);
  }
  removeFile(index) {
    if (this.args.fieldOptions?.disabled) {
      return;
    }
    const [removedFile] = this.value.splice(index, 1);
    this.onChange(this.value);
    this.args.onRemove?.(removedFile);
  }
  static {
    n(this.prototype, "removeFile", [action]);
  }
  setupValidator(accept) {
    const {
      binding
    } = this.args;
    const {
      form
    } = this.args.fieldOptions ?? {};
    if (!form || !binding) {
      return;
    }
    if (accept) {
      if (this.validatorId) {
        form.unregisterBinding(this.validatorKey);
        form.unregisterValidator(this.validatorKey, this.validatorId);
      }
      const fileValidator = new FileValidator(binding, {
        acceptedTypes: accept
      }, binding.model);
      this.validatorId = form.registerValidator(fileValidator, this.validatorKey);
    } else {
      if (!this.validatorId) {
        return;
      }
      form.unregisterValidator(this.validatorKey, this.validatorId);
      this.validatorId = undefined;
    }
  }
  static {
    n(this.prototype, "setupValidator", [action]);
  }
  setupValidatorModifier = modifier((element, [accept]) => {
    runTask(this, () => this.setupValidator(accept));
  });
  toggleIsDragging(isDragging) {
    if (this.args.fieldOptions?.disabled) {
      return;
    }
    this.isDraggingOver = isDragging;
  }
  static {
    n(this.prototype, "toggleIsDragging", [action]);
  }
  updateValue(event) {
    event.preventDefault();
    event.stopPropagation();
    const inputFiles = this.inputElement?.files;
    this.change(inputFiles);
  }
  static {
    n(this.prototype, "updateValue", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("<div class={{classes \"form-control-plaintext p-0\" (if @fieldOptions.isInvalid \"is-invalid\") (if @fieldOptions.isWarning \"is-warning\")}} {{this.setupValidatorModifier @accept}} ...attributes>\n  <div style={{htmlSafe this.dropzoneStyling}} class=\"p-4 border border-2 rounded-3 d-flex flex-row align-items-center\n      {{if @fieldOptions.disabled \"bg-body-secondary\"}}\n      {{if this.isDraggingOver \"bg-body-tertiary\"}}\" {{on \"dragover\" this.handleDragover}} {{on \"dragenter\" (fn this.toggleIsDragging true)}} {{on \"dragend\" (fn this.toggleIsDragging false)}} {{on \"dragleave\" (fn this.toggleIsDragging false)}} {{on \"drop\" this.handleDrop}}>\n    <div class={{classes \"w-100 d-flex flex-column flex-md-row align-items-center justify-content-center my-4\" (if @fieldOptions.disabled \"text-body-tertiary\")}} data-test-drop-zone>\n      <i class=\"bi bi-file-earmark-text mx-2 fs-4\" />\n      <p class=\"m-0\">\n        {{t \"nrg.file-upload.dragAndDrop\"}}\n      </p>\n      <Button class=\"btn btn-link p-0 m-0 ms-1 fst-italic\" @disabled={{@fieldOptions.disabled}} @onClick={{this.openInput}} @text={{t \"nrg.file-upload.selectFiles\"}} data-test-open=\"input\" />\n      <input accept={{this.accept}} aria-describedby={{@fieldOptions.describedBy}} disabled={{@fieldOptions.disabled}} hidden id={{@fieldOptions.id}} multiple type=\"file\" {{on \"change\" this.updateValue}} {{on \"cancel\" this.handleCancel}} {{onInsert this.initInput}} />\n    </div>\n  </div>\n  <div class=\"d-flex flex-column align-items-center p-0 mt-1\">\n    <SelectedFileList @disabled={{@fieldOptions.disabled}} @files={{this.value}} @isInvalid={{@fieldOptions.isInvalid}} @isWarning={{@fieldOptions.isWarning}} @onRemove={{this.removeFile}} />\n  </div>\n</div>", {
      strictMode: true,
      scope: () => ({
        classes,
        htmlSafe,
        on,
        fn,
        t,
        Button,
        onInsert: OnInsertModifier,
        SelectedFileList
      })
    }), this);
  }
}

export { FileUpload as default };
//# sourceMappingURL=file-upload.js.map
