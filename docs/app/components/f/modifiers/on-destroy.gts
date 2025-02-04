// @ts-nocheck - TODO

import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Button, TextInput, Toaster, bind, onDestroy } from '@nrg-ui/core';
import { TrackedArray } from 'tracked-built-ins';

import type { TOC } from '@glint/template';

interface ItemSignature {
  Args: {
    label?: string;

    onDestroy: () => void;
    onRemove: () => void;
  };
}

const Item: TOC<ItemSignature> = <template>
  <div
    class="item g-col-4"
    role="button"
    {{on "click" @onRemove}}
    {{onDestroy @onDestroy}}
  >
    {{@label}}
  </div>
</template>;

export default class OnDestroyDemo extends Component {
  @service
  toast;

  @tracked
  newItem;

  items: string[] = new TrackedArray([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
    'Item 7',
  ]);

  add = () => {
    this.items.push(this.newItem);

    this.newItem = '';
  };

  remove = (index: number) => {
    this.items.splice(index, 1);
  };

  destroy = (item: string) => {
    this.toast.info(`Item "${item}" has been destroyed`);
    console.log(`Item "${item}" has been destroyed`);
  };

  <template>
    <Toaster />
    <div class="grid-collection grid gap-2 text-center">
      {{#each this.items as |item i|}}
        <Item
          @label={{item}}
          @onDestroy={{fn this.destroy item}}
          @onRemove={{fn this.remove i}}
        />
      {{/each}}
    </div>
    <div class="input-group mt-4">
      <TextInput @binding={{bind this "newItem"}} />
      <Button class="btn-primary" @onClick={{this.add}}>Add</Button>
    </div>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'F::Modifiers::OnDestroy': typeof OnDestroyDemo;
  }
}
