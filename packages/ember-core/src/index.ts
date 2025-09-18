/* Components - Forms */
export { default as BoundValue } from './components/form/bound-value.ts';
export { default as CheckboxGroup } from './components/form/checkbox-group.gts';
export { default as Checkbox } from './components/form/checkbox.gts';
export { default as Datetime } from './components/form/datetime.gts';
export { default as Field } from './components/form/field.gts';
export { default as FileUpload } from './components/form/file-upload.gts';
export { default as Form } from './components/form/index.gts';
export { default as MultiSelect } from './components/form/multi-select.gts';
export { default as NumberInput } from './components/form/number-input.gts';
export { default as PhoneInput } from './components/form/phone-input.gts';
export { default as RadioGroup } from './components/form/radio-group.gts';
export { default as Search } from './components/form/search.gts';
export { default as Select } from './components/form/select.gts';
export { default as TextArea } from './components/form/text-area.gts';
export { default as TextInput } from './components/form/text-input.gts';

/* Components - Marketing */
export { default as MktgCardContainer } from './components/mktg/card-container.gts';
export { default as MktgCard } from './components/mktg/card.gts';
export { default as MktgFaq } from './components/mktg/faq.gts';
export { default as MktgFeatureList } from './components/mktg/feature-list.gts';
export { default as MktgFooter } from './components/mktg/footer.gts';
export { default as MktgHeader } from './components/mktg/header.gts';
export { default as MktgNavbar } from './components/mktg/navbar.gts';
export { default as MktgPromoContainer } from './components/mktg/promo-container.gts';
export { default as MktgPromo } from './components/mktg/promo.gts';
export { default as MktgSectionHeader } from './components/mktg/section-header.gts';
export { default as MktgServicePricing } from './components/mktg/service-pricing.gts';
export { default as MktgWorkflowTray } from './components/mktg/workflow-tray.gts';

/* Components - Core */
export { default as Alert } from './components/alert.gts';
export { default as AppBar } from './components/app-bar.gts';
export { default as Button } from './components/button.gts';
export { default as ButtonGroup } from './components/button-group.gts';
export { default as Card } from './components/card.gts';
export {
  ContextMenuItem,
  default as ContextMenu,
} from './components/context-menu.gts';
export { default as Dropdown } from './components/dropdown.gts';
export { default as Footer } from './components/footer.gts';
export { default as Header } from './components/header.gts';
export { default as Icon } from './components/icon.gts';
export { default as LoadingIndicator } from './components/loading-indicator.gts';
export { default as Modal } from './components/modal.gts';
export { default as NavItem } from './components/nav-item.gts';
export { default as PageNotFound } from './components/page-not-found.gts';
export { default as Pagination } from './components/pagination.gts';
export { default as Popover } from './components/popover.gts';
export { default as Progress } from './components/progress.gts';
export { default as Scaffold } from './components/scaffold.gts';
export { default as Sidebar } from './components/sidebar.gts';
export {
  Container as StackedPaneContainer,
  Pane as StackedPane,
} from './components/stacked-pane.gts';
export { default as ThemeControl } from './components/theme-control.gts';
export { default as Toaster } from './components/toaster.gts';
export { default as Tooltip } from './components/tooltip.gts';

/* Helpers */
export { bind, default as Bind } from './helpers/bind.ts';
export { classes, default as Classes } from './helpers/classes.ts';
export { default as lookupService } from './helpers/lookup-service.ts';
export { default as Version, version } from './helpers/version.ts';

/* Modifiers */
export { default as onClickOutside } from './modifiers/on-click-outside.ts';
export { default as onDestroy } from './modifiers/on-destroy.ts';
export { default as onInsert } from './modifiers/on-insert.ts';
export { default as onUpdate } from './modifiers/on-update.ts';

/* Types - Components - Forms */
import type { InputFieldSignature } from './components/form/-private/input-field.ts';
import type { NumberInputArgs } from './components/form/number-input.gts';
import type { PhoneInputArgs } from './components/form/phone-input.gts';
import type { TextInputArgs } from './components/form/text-input.gts';

export type { BoundValueSignature } from './components/form/bound-value.ts';
export type { CheckboxGroupSignature } from './components/form/checkbox-group.gts';
export type { CheckboxSignature } from './components/form/checkbox.gts';
export type { DatetimeSignature } from './components/form/datetime.gts';
export type { FieldSignature } from './components/form/field.gts';
export type { FileUploadSignature } from './components/form/file-upload.gts';
export type { FormSignature } from './components/form/index.gts';
export type { MultiSelectSignature } from './components/form/multi-select.gts';
export type NumberInputSignature = InputFieldSignature<NumberInputArgs>;
export type PhoneInputSignature = InputFieldSignature<PhoneInputArgs>;
export type { RadioGroupSignature } from './components/form/radio-group.gts';
export type { SearchSignature } from './components/form/search.gts';
export type { SelectSignature } from './components/form/select.gts';
export type { TextAreaSignature } from './components/form/text-area.gts';
export type TextInputSignature = InputFieldSignature<TextInputArgs>;

/* Types - Components - Marketing */
export type { MktgCardContainerSignature } from './components/mktg/card-container.gts';
export type { MktgCardSignature } from './components/mktg/card.gts';
export type { MktgFaqSignature } from './components/mktg/faq.gts';
export type {
  MktgFeatureListSignature,
  MktgFeatureSignature,
} from './components/mktg/feature-list.gts';
export type { MktgFooterSignature } from './components/mktg/footer.gts';
export type { MktgHeaderSignature } from './components/mktg/header.gts';
export type { MktgNavbarSignature } from './components/mktg/navbar.gts';
export type { MktgPromoContainerSignature } from './components/mktg/promo-container.gts';
export type { MktgPromoSignature } from './components/mktg/promo.gts';
export type { MktgSectionHeaderSignature } from './components/mktg/section-header.gts';
export type {
  AddonSignature as MktgServicePricingAddonSignature,
  MktgServicePricingSignature,
} from './components/mktg/service-pricing.gts';
export type { MktgWorkflowTraySignature } from './components/mktg/workflow-tray.gts';

/* Types - Components - Core */
export type { AlertSignature } from './components/alert.gts';
export type { AppBarSignature } from './components/app-bar.gts';
export type { ButtonGroupSignature } from './components/button-group.gts';
export type { ButtonSignature } from './components/button.gts';
export type { CardSignature } from './components/card.gts';
export type {
  ContextMenuItemSignature,
  ContextMenuSignature,
} from './components/context-menu.gts';
export type { DropdownSignature } from './components/dropdown.gts';
export type { FooterSignature } from './components/footer.gts';
export type { HeaderSignature } from './components/header.gts';
export type { IconSignature } from './components/icon.gts';
export type { LoadingIndicatorSignature } from './components/loading-indicator.gts';
export type { ModalSignature } from './components/modal.gts';
export type { NavItemSignature } from './components/nav-item.gts';
export type { PaginationSignature } from './components/pagination.gts';
export type { PopoverSignature } from './components/popover.gts';
export type {
  ProgressSignature,
  SegmentSignature as ProgressSegmentSignature,
} from './components/progress.gts';
export type { ScaffoldSignature } from './components/scaffold.gts';
export type { SidebarSignature } from './components/sidebar.gts';
export type {
  ContainerSignature as StackedPaneContainerSignature,
  PaneSignature as StackedPaneSignature,
} from './components/stacked-pane.gts';
export type { ThemeControlSignature } from './components/theme-control.gts';
export type { ToasterSignature } from './components/toaster.gts';

export type Binding<Model extends object = Record<string, unknown>> = {
  model: Model;
  valuePath: string;
};
export type { Icon as IconType } from './icons.ts';
export type Optional<T> = T | null;
export type Primitive = string | number | boolean | null | undefined;
export type Theme = 'light' | 'dark' | 'auto';
