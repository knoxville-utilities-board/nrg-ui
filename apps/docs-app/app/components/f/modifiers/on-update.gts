import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { TextInput, Toaster, bind, onUpdate } from '@nrg-ui/core';

export default class OnDestroyComponent extends Component {
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
