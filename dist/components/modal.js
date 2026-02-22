import { registerDestructor } from '@ember/destroyable';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { cssTransition } from 'ember-css-transitions';
import { t } from 'ember-intl';
import { modifier } from 'ember-modifier';
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
      return '_' + crypto.randomUUID();
    });
  }
  #dialogId = (i(this, "dialogId"), void 0);
  constructor(owner, args) {
    super(owner, args);
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
    const classes = ['border-0', 'rounded-3', this.position];
    if (!this.isActive) {
      classes.push('inactive');
    }
    if (this.args.subtle) {
      classes.push('subtle');
    }
    return classes.join(' ');
  }
  get isDismissible() {
    return this.args.dismissible ?? true;
  }
  onDismiss(evt) {
    evt?.preventDefault();
    evt?.stopPropagation();
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
    // This function is a callback for the dialog's "close" event,
    // which cannot be canceled. Since a user pressing "Escape" or clicking
    // outside the dialog will trigger this event, we need to re-open
    // the dialog in case it is not dismissible.
    // If it is dismissible, we'll close it immediately after.
    this.openModal();
    if (this.isDismissible) {
      this.onDismiss();
    }
  }
  static {
    n(this.prototype, "onClose", [action]);
  }
  onInsert = modifier(element => {
    this.dialogElement = element;
  });
  onUpdate = modifier(() => {
    if (this.args.isOpen) {
      this.openModal();
    } else {
      this.closeModal();
    }
  });
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
    setComponentTemplate(precompileTemplate("<dialog class={{this.classList}} id={{this.dialogId}} {{on \"cancel\" this.onDismiss}} {{on \"close\" this.onClose}} {{this.onInsert}} {{this.onUpdate @isOpen}} ...attributes>\n  {{#if @isOpen}}\n    <div class=\"modal-content\" {{cssTransition \"modal\" didTransitionOut=this.closeModal}}>\n      {{#if this.isDismissible}}\n        <button aria-label={{t \"nrg.base.close\"}} class=\"btn-close\" type=\"button\" {{on \"click\" this.onDismiss}}></button>\n      {{/if}}\n      {{#if (has-block \"header\")}}\n        <div class=\"modal-header\">\n          <h5 class=\"modal-title\">\n            {{yield to=\"header\"}}\n          </h5>\n        </div>\n      {{/if}}\n      <div class=\"modal-body\">\n        {{yield}}\n      </div>\n      {{#if (has-block \"footer\")}}\n        <div class=\"modal-footer\">\n          {{yield to=\"footer\"}}\n        </div>\n      {{/if}}\n    </div>\n  {{/if}}\n</dialog>", {
      strictMode: true,
      scope: () => ({
        on,
        cssTransition,
        t
      })
    }), this);
  }
}

export { Modal as default };
//# sourceMappingURL=modal.js.map
