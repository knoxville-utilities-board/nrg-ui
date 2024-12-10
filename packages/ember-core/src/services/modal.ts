import Service from '@ember/service';
import { tracked } from 'tracked-built-ins';

export default class Modal extends Service {
  modalIds: string[] = [];

  @tracked
  activeModal?: string;

  updateActiveModal() {
    if (this.modalIds.length > 0) {
      this.activeModal = this.modalIds[this.modalIds.length - 1];
    } else {
      this.activeModal = undefined;
    }
  }

  openModal(id: string) {
    if (this.modalIds.includes(id)) {
      return;
    }
    this.modalIds.push(id);
    this.updateActiveModal();
  }

  closeModal(id: string) {
    if (!this.modalIds.includes(id)) {
      return;
    }
    this.modalIds = this.modalIds.filter((modalId) => modalId !== id);
    this.updateActiveModal();
  }
}

declare module '@ember/service' {
  interface Registry {
    modal: Modal;
  }
}
