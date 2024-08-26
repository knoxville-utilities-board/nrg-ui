import Button from './components/button.ts';
import MarketingFooter from './components/mktg/footer';
import Bind from './helpers/bind.ts';

import type { HelperLike } from '@glint/template';

export default interface NrgRegistry {
  // Core
  Bind: HelperLike<typeof Bind>;
  bind: HelperLike<typeof Bind>;

  // Components
  Button: typeof Button;
  button: typeof Button;

  // Marketing
  'Mktg::Footer': typeof MarketingFooter;
  'mktg/footer': typeof MarketingFooter;
}
