import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import onClickOutside from '@nrg-ui/core/modifiers/on-click-outside';

import type ToastService from '@nrg-ui/core/services/toast';

export default class OnClickOutsideComponent extends Component {
  @service
  declare toast: ToastService;

  @action
  clickOutside(evt: MouseEvent) {
    this.toast.info('Item clicked outside');
    console.log('Clicked outside:', evt);
  }

  <template>
    <div
      class="d-flex h-100 border border-primary bg-primary-subtle align-items-center justify-content-center"
      {{onClickOutside this.clickOutside}}
    >
      <span>Don't click me</span>
    </div>
  </template>
}
