import { registerDestructor } from '@ember/destroyable';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import onInsert from '@nrg-ui/core/modifiers/did-insert';
import onUpdate from '@nrg-ui/core/modifiers/on-update';
import ModalService from '@nrg-ui/core/services/modal';

export interface ModalSignature {
  Element: HTMLDialogElement;
  Args: {
    isOpen: boolean;
    hasBackdrop?: boolean;
    dismissable?: boolean;
    position?: 'centered' | 'flyout-left' | 'flyout-right';
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
    const classes = [];
    if (!this.isActive) {
      classes.push('inactive');
    }
    classes.push(this.position);
    return classes.join(' ');
  }

  get isOpen() {
    return this.args.isOpen;
  }

  get isDismissable() {
    return this.args.dismissable ?? true;
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
      id={{this.dialogId}}
      class={{this.classList}}
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
              type="button"
              class="btn-close"
              {{on "click" this.onDismiss}}
              aria-label="Close"
            ></button>
          {{/if}}
        </div>
        <div class="modal-body">
          {{yield to="default"}}
        </div>
        <div class="modal-footer">
          {{yield to="footer"}}
        </div>
      </div>
    </dialog>
  </template>
}
