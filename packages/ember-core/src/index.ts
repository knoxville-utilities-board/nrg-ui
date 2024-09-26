/* Components - Forms */
export { default as BoundValue } from './components/form/bound-value.ts';
export { default as CheckboxGroup } from './components/form/checkbox-group.gts';
export { default as Checkbox } from './components/form/checkbox.gts';
export { default as Field } from './components/form/field.gts';
export { default as Form } from './components/form/index.gts';
export { default as PhoneInput } from './components/form/phone-input.gts';
export { default as RadioGroup } from './components/form/radio-group.gts';
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
export { default as ButtonGroup } from './components/button-group.gts';
export { default as Button } from './components/button.gts';
export { default as Card } from './components/card.gts';
export { default as Footer } from './components/footer.gts';
export { default as Header } from './components/header.gts';
export { default as Icon } from './components/icon.gts';
export { default as LoadingIndicator } from './components/loading-indicator.gts';
export { default as NavItem } from './components/nav-item.gts';
export { default as Progress } from './components/progress.gts';

/* Helpers */
export { bind, default as Bind } from './helpers/bind.ts';

/* Modifiers */
export { default as didInsert } from './modifiers/did-insert.ts';
export { default as onUpdate } from './modifiers/on-update.ts';

/* Types - Components - Forms */
export type { BoundValueSignature } from './components/form/bound-value.ts';
export type { CheckboxGroupSignature } from './components/form/checkbox-group.gts';
export type { CheckboxSignature } from './components/form/checkbox.gts';
export type { FieldSignature } from './components/form/field.gts';
export type { FormSignature } from './components/form/index.gts';
export type { NumberInputSignature } from './components/form/number-input.gts';
export type { PhoneInputSignature } from './components/form/phone-input.gts';
export type { RadioGroupSignature } from './components/form/radio-group.gts';
export type { SelectSignature } from './components/form/select.gts';
export type { TextAreaSignature } from './components/form/text-area.gts';
export type { TextInputSignature } from './components/form/text-input.gts';

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
  MktgServicePricingSignature,
  AddonSignature as MktgServicePricingAddonSignature,
} from './components/mktg/service-pricing.gts';
export type { MktgWorkflowTraySignature } from './components/mktg/workflow-tray.gts';

/* Types - Components - Core */
export type { AlertSignature } from './components/alert.gts';
export type { ButtonGroupSignature } from './components/button-group.gts';
export type { ButtonSignature } from './components/button.gts';
export type { CardSignature } from './components/card.gts';
export type { FooterSignature } from './components/footer.gts';
export type { HeaderSignature } from './components/header.gts';
export type { IconSignature } from './components/icon.gts';
export type { LoadingIndicatorSignature } from './components/loading-indicator.gts';
export type { NavItemSignature } from './components/nav-item.gts';
export type {
  ProgressSignature,
  SegmentSignature as ProgressSegmentSignature,
} from './components/progress.gts';

export type Binding<Model extends object = Record<string, unknown>> = {
  model: Model;
  valuePath: string;
};
export type { Icon as IconType } from './icons.ts';
export type Optional<T> = T | null;
export type Primitive = string | number | boolean | null | undefined;
