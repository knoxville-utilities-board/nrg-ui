import Alert from './components/alert.gts';
import AppBar from './components/app-bar.gts';
import ButtonGroup from './components/button-group.gts';
import Button from './components/button.gts';
import Card from './components/card.gts';
import Footer from './components/footer.gts';
import BoundValue from './components/form/bound-value.ts';
import CheckboxGroup from './components/form/checkbox-group.gts';
import Checkbox from './components/form/checkbox.gts';
import Datetime from './components/form/datetime.gts';
import Field from './components/form/field.gts';
import FileUpload from './components/form/file-upload.gts';
import Form from './components/form/index.gts';
import NumberInput from './components/form/number-input.gts';
import PhoneInput from './components/form/phone-input.gts';
import RadioGroup from './components/form/radio-group.gts';
import Select from './components/form/select.gts';
import TextArea from './components/form/text-area.gts';
import TextInput from './components/form/text-input.gts';
import Header from './components/header.gts';
import Icon from './components/icon.gts';
import LoadingIndicator from './components/loading-indicator.gts';
import MktgCardContainer from './components/mktg/card-container.gts';
import MktgCard from './components/mktg/card.gts';
import MktgFaq from './components/mktg/faq.gts';
import MktgFeatureList from './components/mktg/feature-list.gts';
import MktgFooter from './components/mktg/footer.gts';
import MktgHeader from './components/mktg/header.gts';
import MktgNavbar from './components/mktg/navbar.gts';
import MktgPromoContainer from './components/mktg/promo-container.gts';
import MktgPromo from './components/mktg/promo.gts';
import MktgSectionHeader from './components/mktg/section-header.gts';
import MktgServicePricing from './components/mktg/service-pricing.gts';
import MktgWorkflowTray from './components/mktg/workflow-tray.gts';
import Modal from './components/modal.gts';
import NavItem from './components/nav-item.gts';
import PageNotFound from './components/page-not-found.gts';
import Pagination from './components/pagination.gts';
import Progress from './components/progress.gts';
import Scaffold from './components/scaffold.gts';
import Sidebar from './components/sidebar.gts';
import {
  Container as StackedPaneContainer,
  Pane as StackedPane,
} from './components/stacked-pane.gts';
import Toaster from './components/toaster.gts';
import Bind from './helpers/bind.ts';
import LookupService from './helpers/lookup-service.ts';
import Version from './helpers/version.ts';
import OnClickOutside from './modifiers/on-click-outside.ts';
import OnInsert from './modifiers/on-insert.ts';
import OnUpdate from './modifiers/on-update.ts';

export interface ComponentRegistry {
  // Core components
  Alert: typeof Alert;
  AppBar: typeof AppBar;
  ButtonGroup: typeof ButtonGroup;
  Button: typeof Button;
  Card: typeof Card;
  Footer: typeof Footer;
  Header: typeof Header;
  Icon: typeof Icon;
  LoadingIndicator: typeof LoadingIndicator;
  Modal: typeof Modal;
  NavItem: typeof NavItem;
  PageNotFound: typeof PageNotFound;
  Pagination: typeof Pagination;
  Progress: typeof Progress;
  Scaffold: typeof Scaffold;
  Sidebar: typeof Sidebar;
  StackedPane: typeof StackedPane;
  'StackedPane::Container': typeof StackedPaneContainer;
  Toaster: typeof Toaster;

  // Form components
  Form: typeof Form;
  'Form::BoundValue': typeof BoundValue;
  'Form::CheckboxGroup': typeof CheckboxGroup;
  'Form::Checkbox': typeof Checkbox;
  'Form::Datetime': typeof Datetime;
  'Form::Field': typeof Field;
  'Form::FileUpload': typeof FileUpload;
  'Form::NumberInput': typeof NumberInput;
  'Form::PhoneInput': typeof PhoneInput;
  'Form::RadioGroup': typeof RadioGroup;
  'Form::Select': typeof Select;
  'Form::TextArea': typeof TextArea;
  'Form::TextInput': typeof TextInput;

  // Marketing components
  'Mktg::CardContainer': typeof MktgCardContainer;
  'Mktg::Card': typeof MktgCard;
  'Mktg::Faq': typeof MktgFaq;
  'Mktg::FeatureList': typeof MktgFeatureList;
  'Mktg::Footer': typeof MktgFooter;
  'Mktg::Header': typeof MktgHeader;
  'Mktg::Navbar': typeof MktgNavbar;
  'Mktg::PromoContainer': typeof MktgPromoContainer;
  'Mktg::Promo': typeof MktgPromo;
  'Mktg::SectionHeader': typeof MktgSectionHeader;
  'Mktg::ServicePricing': typeof MktgServicePricing;
  'Mktg::WorkflowTray': typeof MktgWorkflowTray;
}

export interface HelperRegistry {
  bind: typeof Bind;
  'lookup-service': typeof LookupService;
  version: typeof Version;
}

export interface ModifierRegistry {
  'on-click-outside': typeof OnClickOutside;
  'on-insert': typeof OnInsert;
  'on-update': typeof OnUpdate;
}

export default interface TemplateRegistry
  extends ComponentRegistry,
    HelperRegistry,
    ModifierRegistry {}
