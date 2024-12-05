import Service from '@ember/service';
export default class Modal extends Service {
    modalIds: string[];
    activeModal?: string;
    updateActiveModal(): void;
    openModal(id: string): void;
    closeModal(id: string): void;
}
//# sourceMappingURL=modal.d.ts.map