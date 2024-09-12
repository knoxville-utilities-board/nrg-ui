import { registerDestructor } from '@ember/destroyable';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import onInsert from '@nrg-ui/core/modifiers/did-insert';
import onUpdate from '@nrg-ui/core/modifiers/on-update';
import ModalService from '@nrg-ui/core/services/modal';
import { t } from 'ember-intl';

export interface ModalSignature {
  Element: HTMLDialogElement;
  Args: {
    isOpen: boolean;
    hasBackdrop?: boolean;
    dismissible?: boolean;
    position?: 'center' | 'left' | 'right';
    onDismiss: () => void;
  };
  Blocks: {
    header?: [];
    default?: [];
    footer?: [];
  };
}

export default class ModalComponent extends Component<ModalSignature> {
  @service('modal')
  declare modalService: ModalService;

  @tracked
  dialogElement!: HTMLDialogElement;

  @tracked
  dialogId = crypto.randomUUID();

  constructor(owner: unknown, args: ModalSignature['Args']) {
    super(owner, args);
    registerDestructor(this, () => {
      if (this.isOpen) {
        this.closeModal();
      }
    });
  }

  get isActive() {
    return this.dialogId === this.modalService.activeModal;
  }

  get position() {
    return this.args.position ?? 'centered';
  }

  get classList() {
    const classes = [this.position];
    if (!this.isActive) {
      classes.push('inactive');
    }
    return classes.join(' ');
  }


  get isDismissible() {
    return this.args.dismissible ?? true;
  }

  get hasBackdrop() {
    return this.args.hasBackdrop ?? true;
  }

  @action
  onDismiss(evt?: Event) {
    evt?.preventDefault();
    evt?.stopPropagation();
    if (!this.isDismissable) {
      return;
    }
    this.args.onDismiss?.();
  }

  @action
  onClose() {
    if (this.isOpen && !this.isDismissable) {
      this.openModal();
    }
  }

  @action
  onInsert(element: HTMLElement) {
    const dialog = element as HTMLDialogElement;
    this.dialogElement = dialog;
    if (this.isOpen) {
      this.openModal();
    }
  }

  @action
  onUpdate() {
    if (this.isOpen) {
      this.openModal();
    } else {
      this.closeModal();
    }
  }

  @action
  openModal() {
    if (this.hasBackdrop) {
      this.dialogElement.showModal();
      this.modalService.openModal(this.dialogId);
    } else {
      this.dialogElement.show();
    }
  }

  @action
  closeModal() {
    this.dialogElement.close();
    this.modalService.closeModal(this.dialogId);
  }

  <template>
    <dialog
      class={{this.classList}}
      id={{this.dialogId}}
      {{on "cancel" this.onDismiss}}
      {{on "close" this.onClose}}
      {{onInsert this.onInsert}}
      {{onUpdate this.onUpdate this.isOpen}}
      ...attributes
    >
      <div class="modal-content">

        <div class="modal-header">
          <h5 class="modal-title">
            {{yield to="header"}}
          </h5>
          {{#if this.isDismissable}}
            <button
              aria-label={{t "nrg.base.close"}}
              class="btn-close"
              type="button"
              {{on "click" this.onDismiss}}
            ></button>
          {{/if}}
        </div>
        <div class="modal-body">
          {{yield}}
        </div>
        <div class="modal-footer">
          {{yield to="footer"}}
        </div>
      </div>
    </dialog>
  </template>
}
