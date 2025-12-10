import Service from '@ember/service';
import { tracked } from 'tracked-built-ins';
import { g, i } from 'decorator-transforms/runtime';

class Modal extends Service {
  modalIds = [];
  static {
    g(this.prototype, "activeModal", [tracked]);
  }
  #activeModal = (i(this, "activeModal"), void 0);
  updateActiveModal() {
    if (this.modalIds.length > 0) {
      this.activeModal = this.modalIds[this.modalIds.length - 1];
    } else {
      this.activeModal = undefined;
    }
  }
  openModal(id) {
    if (this.modalIds.includes(id)) {
      return;
    }
    this.modalIds.push(id);
    this.updateActiveModal();
  }
  closeModal(id) {
    if (!this.modalIds.includes(id)) {
      return;
    }
    this.modalIds = this.modalIds.filter(modalId => modalId !== id);
    this.updateActiveModal();
  }
}

export { Modal as default };
//# sourceMappingURL=modal.js.map
