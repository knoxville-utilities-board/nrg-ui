import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import ResponsiveService from '../services/responsive.ts';

export interface NrgNavItemSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLLIElement;
  Args: {
    label: string;
    url: string;
  };
}

export default class NrgNavItem extends Component<NrgNavItemSignature> {
  @service declare responsive: ResponsiveService;

  get classList() {
    const classes = ['nav-item'];
    if (this.responsive.isMobileDevice) {
      classes.push('border-bottom');
    }
    return classes.join(' ');
  }

  <template>
    <li class={{this.classList}}>
      <a class="nav-link" href={{@url}}>{{@label}}</a>
    </li>
  </template>
}
