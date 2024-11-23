import ModalService from './services/modal.ts';
import ResponsiveService from './services/responsive.ts';
import ThemeService from './services/theme.ts';
import ToastService from './services/toast.ts';

export default interface ServiceRegistry {
  modal: ModalService;
  responsive: ResponsiveService;
  theme: ThemeService;
  toast: ToastService;
}
