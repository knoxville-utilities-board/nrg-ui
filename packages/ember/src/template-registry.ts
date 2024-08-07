// Core component types
import type Alert from '@nrg-ui/ember/components/alert';
import type ButtonGroup from '@nrg-ui/ember/components/button-group';
import type Button from '@nrg-ui/ember/components/button';
import type Card from '@nrg-ui/ember/components/card';
import type Footer from '@nrg-ui/ember/components/footer';
import type Header from '@nrg-ui/ember/components/header';
import type Icon from '@nrg-ui/ember/components/icon';
import type LoadingIndicator from '@nrg-ui/ember/components/loading-indicator';
import type NavItem from '@nrg-ui/ember/components/nav-item';
import type Progress from '@nrg-ui/ember/components/progress';

// Form component types
import type TextArea from '@nrg-ui/ember/components/form/text-area';
import type TextField from '@nrg-ui/ember/components/form/text-field';

// Marketing component types
import type MarketingCardContainer from '@nrg-ui/ember/components/mktg/card-container';
import type MarketingFaq from '@nrg-ui/ember/components/mktg/faq';
import type MarketingHeader from '@nrg-ui/ember/components/mktg/header';
import type MarketingPromoContainer from '@nrg-ui/ember/components/mktg/promo-container';
import type MarketingSectionHeader from '@nrg-ui/ember/components/mktg/section-header';
import type MarketingServicePricing from '@nrg-ui/ember/components/mktg/service-pricing';

export default interface Registry {
  Alert: typeof Alert;
  alert: typeof Alert;
  ButtonGroup: typeof ButtonGroup;
  'button-group': typeof ButtonGroup;
  Button: typeof Button;
  button: typeof Button;
  Card: typeof Card;
  card: typeof Card;
  Footer: typeof Footer;
  footer: typeof Footer;
  Header: typeof Header;
  header: typeof Header;
  Icon: typeof Icon;
  icon: typeof Icon;
  LoadingIndicator: typeof LoadingIndicator;
  'loading-indicator': typeof LoadingIndicator;
  NavItem: typeof NavItem;
  'nav-item': typeof NavItem;
  Progress: typeof Progress;
  progress: typeof Progress;

  'Form::TextArea': typeof TextArea;
  'form/text-area': typeof TextArea;
  'Form::TextField': typeof TextField;
  'form/text-field': typeof TextField;

  'Mktg::CardContainer': typeof MarketingCardContainer;
  'mktg/card-container': typeof MarketingCardContainer;
  'Mktg::Faq': typeof MarketingFaq;
  'mktg/faq': typeof MarketingFaq;
  'Mktg::Header': typeof MarketingHeader;
  'mktg/header': typeof MarketingHeader;
  'Mktg::PromoContainer': typeof MarketingPromoContainer;
  'mktg/promo-container': typeof MarketingPromoContainer;
  'Mktg::SectionHeader': typeof MarketingSectionHeader;
  'mktg/section-header': typeof MarketingSectionHeader;
  'Mktg::ServicePricing': typeof MarketingServicePricing;
  'mktg/service-pricing': typeof MarketingServicePricing;
}
