import { registerDestructor } from '@ember/destroyable';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { t } from 'ember-intl';

import onInsert from '../modifiers/on-insert.ts';
import onUpdate from '../modifiers/on-update.ts';

import type ModalService from '../services/modal.ts';
import type Owner from '@ember/owner';

export interface ModalSignature {
  Element: HTMLDialogElement;
  Args: {
    isOpen: boolean;
    dismissible?: boolean;
    subtle?: boolean;
    position?: 'center' | 'left' | 'right';
    onDismiss: () => void;
  };
  Blocks: {
    header?: [];
    default?: [];
    footer?: [];
  };
}

export default class Modal extends Component<ModalSignature> {
  @service('modal')
  declare modalService: ModalService;

  @tracked
  dialogElement!: HTMLDialogElement;

  @tracked
  dialogId = crypto.randomUUID();

  constructor(owner: Owner, args: ModalSignature['Args']) {
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

  @action
  onDismiss(evt?: Event) {
    evt?.preventDefault();
    evt?.stopPropagation();
    if (!this.isDismissible) {
      return;
    }
    this.args.onDismiss?.();
  }

  @action
  onClose() {
    if (!this.args.isOpen) {
      return;
    }
    this.openModal();
    if (this.isDismissible) {
      this.onDismiss();
    }
  }

  @action
  onInsert(element: HTMLElement) {
    const dialog = element as HTMLDialogElement;
    this.dialogElement = dialog;
    if (this.args.isOpen) {
      this.openModal();
    }
  }

  @action
  onUpdate() {
    if (this.args.isOpen) {
      this.openModal();
    } else {
      this.closeModal();
    }
  }

  @action
  openModal() {
    this.dialogElement.showModal();
    this.modalService.openModal(this.dialogId);
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
      {{onUpdate this.onUpdate @isOpen}}
      ...attributes
    >
      <div class="modal-content">
        {{#if this.isDismissible}}
          <button
            aria-label={{t "nrg.base.close"}}
            class="btn-close"
            type="button"
            {{on "click" this.onDismiss}}
          ></button>
        {{/if}}
        {{#if (has-block "header")}}
          <div class="modal-header">
            <h5 class="modal-title">
              {{yield to="header"}}
            </h5>
          </div>
        {{/if}}
        <div class="modal-body">
          {{yield}}
        </div>
        {{#if (has-block "footer")}}
          <div class="modal-footer">
            {{yield to="footer"}}
          </div>
        {{/if}}
      </div>
    </dialog>
  </template>
}
