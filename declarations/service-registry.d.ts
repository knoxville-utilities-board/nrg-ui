import ContextMenuService from './services/context-menu.ts';
import ModalService from './services/modal.ts';
import ResponsiveService from './services/responsive.ts';
import ThemeService from './services/theme.ts';
import ToastService from './services/toast.ts';
export default interface ServiceRegistry {
    'context-menu': ContextMenuService;
    modal: ModalService;
    responsive: ResponsiveService;
    theme: ThemeService;
    toast: ToastService;
}
