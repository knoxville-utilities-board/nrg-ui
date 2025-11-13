import { array, fn } from '@ember/helper';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Button from '@nrg-ui/core/components/button';
import ContextMenu, {
  ContextMenuItem,
} from '@nrg-ui/core/components/context-menu';
import Section from '@nrg-ui/showcase/components/section';

import type { Alignment } from '@floating-ui/dom';
import type ToastService from '@nrg-ui/core/services/toast';

export default class ContextMenuDemo extends Component {
  @service
  declare toast: ToastService;

  @tracked
  alignment: Alignment = 'start';

  @tracked
  disabled: boolean = false;

  @tracked
  flip: boolean = false;

  @tracked
  id = 'my-context-menu';

  @tracked
  showExternalButton = true;

  @action
  toggleExternalButton() {
    this.showExternalButton = !this.showExternalButton;
  }

  @action
  log(message: string) {
    this.toast.info(message);
  }

  <template>
    <Section @name="Context Menu" as |Section|>
      <Section.Subsection @name="Basics" @model={{this}} @elementTag="div">
        <:example as |model|>
          <ContextMenu
            @alignment={{model.alignment}}
            @disabled={{model.disabled}}
            @flip={{model.flip}}
            @id={{model.id}}
            as |Menu|
          >
            <Menu.Item @onSelect={{fn this.log "I was clicked!"}}>
              I'm an item
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item @disabled={{true}}>
              I'm a disabled item
            </Menu.Item>
          </ContextMenu>
          {{#if this.showExternalButton}}
            <ContextMenuItem
              @menuId={{this.id}}
              @onSelect={{fn this.log "I was clicked too!"}}
            >
              I was added outside the menu
            </ContextMenuItem>
          {{/if}}
          <Button
            class="btn-primary ms-2"
            @onClick={{this.toggleExternalButton}}
          >
            Toggle external item
          </Button>
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.String
              @name="alignment"
              @defaultValue="start"
              @description="How to align the dropdown"
              @options={{array "" "start" "end"}}
            />
            <Args.Boolean
              @name="disabled"
              @description="When true, the menu will be disabled and not open."
              @defaultValue={{false}}
            />
            <Args.Boolean
              @name="flip"
              @description="When true, the dropdown placement will auto-flip to stay within viewport."
              @defaultValue={{false}}
            />
            <Args.String
              @description="A unique identifier for the menu."
              @name="id"
              @required={{true}}
            />
          </Api.Arguments>
        </:api>
      </Section.Subsection>
    </Section>
  </template>
}
