import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { TextInput, Toaster, bind, onUpdate } from '@nrg-ui/core';

import type ToastService from '@nrg-ui/core/services/toast';

export default class OnUpdateDemo extends Component {
  @service
  declare toast: ToastService;

  @tracked
  value = 'Edit me!';

  update = (element: HTMLElement, { value }: { value: string }) => {
    this.toast.info(`Value updated to "${value}"`);
    console.log(`value: "${value}"`, element);
  };

  <template>
    <Toaster />
    <div {{onUpdate this.update value=this.value}}>
      <TextInput @binding={{bind this "value"}} />
    </div>
  </template>
}
