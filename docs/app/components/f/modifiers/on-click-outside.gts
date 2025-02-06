// @ts-nocheck - TODO

import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { Toaster, onClickOutside } from '@nrg-ui/core';

export default class OnClickOutsideComponent extends Component {
  @service
  toast;

  @action
  clickOutside(evt: PointerEvent) {
    this.toast.info('Item clicked outside');
    console.log('Clicked outside:', evt);
  }

  <template>
    <Toaster />
    <div
      class="d-flex h-100 border border-primary bg-primary-subtle align-items-center justify-content-center"
      {{onClickOutside this.clickOutside}}
    >
      <span>Don't click me</span>
    </div>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'F::Modifiers::OnClickOutside': typeof OnClickOutsideComponent;
  }
}
