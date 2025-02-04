// @ts-nocheck - TODO

import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { TextInput, Toaster, bind, onUpdate } from '@nrg-ui/core';

export default class OnUpdateDemo extends Component {
  @service
  toast;

  @tracked
  value = 'Edit me!';

  update = (element: HTMLElement, item: string) => {
    this.toast.info(`Value updated to "${item}"`);
    console.log(`value: "${item}"`, element);
  };

  <template>
    <Toaster />
    <div {{onUpdate this.update this.value}}>
      <TextInput @binding={{bind this "value"}} />
    </div>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'F::Modifiers::OnUpdate': typeof OnUpdateDemo;
  }
}
