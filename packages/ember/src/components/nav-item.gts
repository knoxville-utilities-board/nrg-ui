import Component from '@glimmer/component';
import { service } from '@ember/service';
import ResponsiveService from '../services/responsive.ts';
import { LinkTo } from '@ember/routing';
import { assert } from '@ember/debug';

export interface NrgNavItemSignature {
  Element: HTMLLIElement;
  Args: {
    label: string;
    url?: string;
    model?: string;
    route?: string;
  };
}

export default class NrgNavItem extends Component<NrgNavItemSignature> {
  @service declare responsive: ResponsiveService;

  constructor(owner: unknown, args: NrgNavItemSignature['Args']) {
    super(owner, args);
    assert(
      'You must provide either a `url` or a `route` to the nav-item component',
      args.url || args.route,
    );
    assert(
      'You must provide either a `url` or a `route` to the nav-item component',
      (args.url && !args.route) || (!args.url && args.route),
    );
  }

  get classList() {
    const classes = ['nav-item'];
    if (this.responsive.isMobileDevice) {
      classes.push('border-bottom');
    }
    return classes.join(' ');
  }

  <template>
    <li class={{this.classList}}>
      {{#if @url}}
        <a class="nav-link" href={{@url}}>{{@label}}</a>
      {{else}}
        <LinkTo @route={{@route}} @model={{@model}} class="nav-link" />
      {{/if}}
    </li>
  </template>
}
