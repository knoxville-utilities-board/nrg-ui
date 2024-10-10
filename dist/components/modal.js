import { registerDestructor } from '@ember/destroyable';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { t } from 'ember-intl';
import OnInsertModifier from '../modifiers/did-insert.js';
import OnUpdate from '../modifiers/on-update.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime';

class Modal extends Component {
  static {
    g(this.prototype, "modalService", [service('modal')]);
  }
  #modalService = (i(this, "modalService"), void 0);
  static {
    g(this.prototype, "dialogElement", [tracked]);
  }
  #dialogElement = (i(this, "dialogElement"), void 0);
  static {
    g(this.prototype, "dialogId", [tracked], function () {
      return crypto.randomUUID();
    });
  }
  #dialogId = (i(this, "dialogId"), void 0);
  constructor(owner1, args1) {
    super(owner1, args1);
    registerDestructor(this, () => {
      if (this.args.isOpen) {
        this.closeModal();
      }
    });
  }
  get isActive() {
    return this.dialogId === this.modalService.activeModal;
  }
  get position() {
    return this.args.position ?? 'center';
  }
  get classList() {
    const classes1 = ['border-0', 'rounded-3', this.position];
    if (!this.isActive) {
      classes1.push('inactive');
    }
    return classes1.join(' ');
  }
  get isDismissible() {
    return this.args.dismissible ?? true;
  }
  onDismiss(evt1) {
    evt1?.preventDefault();
    evt1?.stopPropagation();
    if (!this.isDismissible) {
      return;
    }
    this.args.onDismiss?.();
  }
  static {
    n(this.prototype, "onDismiss", [action]);
  }
  onClose() {
    if (!this.args.isOpen) {
      return;
    }
    this.openModal();
    if (this.isDismissible) {
      this.onDismiss();
    }
  }
  static {
    n(this.prototype, "onClose", [action]);
  }
  onInsert(element1) {
    const dialog1 = element1;
    this.dialogElement = dialog1;
    if (this.args.isOpen) {
      this.openModal();
    }
  }
  static {
    n(this.prototype, "onInsert", [action]);
  }
  onUpdate() {
    if (this.args.isOpen) {
      this.openModal();
    } else {
      this.closeModal();
    }
  }
  static {
    n(this.prototype, "onUpdate", [action]);
  }
  openModal() {
    this.dialogElement.showModal();
    this.modalService.openModal(this.dialogId);
  }
  static {
    n(this.prototype, "openModal", [action]);
  }
  closeModal() {
    this.dialogElement.close();
    this.modalService.closeModal(this.dialogId);
  }
  static {
    n(this.prototype, "closeModal", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("\n    <dialog class={{this.classList}} id={{this.dialogId}} {{on \"cancel\" this.onDismiss}} {{on \"close\" this.onClose}} {{onInsert this.onInsert}} {{onUpdate this.onUpdate @isOpen}} ...attributes>\n      <div class=\"modal-content\">\n        {{#if this.isDismissible}}\n          <button aria-label={{t \"nrg.base.close\"}} class=\"btn-close\" type=\"button\" {{on \"click\" this.onDismiss}}></button>\n        {{/if}}\n        {{#if (has-block \"header\")}}\n          <div class=\"modal-header\">\n            <h5 class=\"modal-title\">\n              {{yield to=\"header\"}}\n            </h5>\n          </div>\n        {{/if}}\n        <div class=\"modal-body\">\n          {{yield}}\n        </div>\n        {{#if (has-block \"footer\")}}\n          <div class=\"modal-footer\">\n            {{yield to=\"footer\"}}\n          </div>\n        {{/if}}\n      </div>\n    </dialog>\n  ", {
      strictMode: true,
      scope: () => ({
        on,
        onInsert: OnInsertModifier,
        onUpdate: OnUpdate,
        t
      })
    }), this);
  }
}

export { Modal as default };
//# sourceMappingURL=modal.js.map
