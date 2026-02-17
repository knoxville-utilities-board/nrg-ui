import type ContextMenuService from './services/context-menu.ts';
import type ModalService from './services/modal.ts';
import type ResponsiveService from './services/responsive.ts';
import type ThemeService from './services/theme.ts';
import type ToastService from './services/toast.ts';

export default interface ServiceRegistry {
  'context-menu': ContextMenuService;
  modal: ModalService;
  responsive: ResponsiveService;
  theme: ThemeService;
  toast: ToastService;
}
