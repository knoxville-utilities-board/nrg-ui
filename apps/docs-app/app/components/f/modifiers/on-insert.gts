import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Button, TextInput, Toaster, bind, onInsert } from '@nrg-ui/core';
import { TrackedArray } from 'tracked-built-ins';

import type { TOC } from '@glint/template';

interface ItemSignature {
  Args: {
    label?: string;

    onInsert: () => void;
    onRemove: () => void;
  };
}

const Item: TOC<ItemSignature> = <template>
  <div
    class="item g-col-4"
    role="button"
    {{on "click" @onRemove}}
    {{onInsert @onInsert}}
  >
    {{@label}}
  </div>
</template>;

export default class OnInsertComponent extends Component {
  @service
  toast;

  @tracked
  newItem;

  items: string[] = new TrackedArray();

  add = () => {
    this.items.push(this.newItem);

    this.newItem = '';
  };

  remove = (index: number) => {
    this.items.splice(index, 1);
  };

  insert = (item: string, element: HTMLElement) => {
    this.toast.info(`Item "${item}" has been inserted`);
    console.log(`Item "${item}":`, element);
  };

  <template>
    <Toaster />
    <div class="grid-collection grid gap-2 text-center">
      {{#each this.items as |item i|}}
        <Item
          @label={{item}}
          @onInsert={{fn this.insert item}}
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
