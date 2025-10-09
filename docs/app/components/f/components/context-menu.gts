import { array, fn } from '@ember/helper';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Button from '@nrg-ui/core/components/button';
import ContextMenu, {
  ContextMenuItem,
} from '@nrg-ui/core/components/context-menu';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

import type { Alignment } from '@floating-ui/dom';
import type ToastService from '@nrg-ui/core/services/toast';

function not(value: unknown) {
  return !value;
}

export default class ContextMenuDemo extends Component {
  @service
  declare toast: ToastService;

  @tracked
  alignment?: Alignment;

  @tracked
  disabled?: boolean;

  @tracked
  flip?: boolean;

  @tracked
  id = 'my-context-menu';

  @tracked
  showExternalButton = true;

  @action
  update(key: keyof ContextMenuDemo, value: unknown) {
    // @ts-expect-error - Don't need type safety here
    this[key] = value;
  }

  @action
  log(message: string) {
    this.toast.info(message);
  }

  <template>
    {{! @glint-expect-error - Freestyle doesn't have great types }}
    <FreestyleSection @name="Context Menu" as |Section|>
      <Section.subsection @name="Basics">
        {{! @glint-expect-error - Freestyle doesn't have great types }}
        <FreestyleUsage>
          <:example>
            <ContextMenu
              @alignment={{this.alignment}}
              @disabled={{this.disabled}}
              @flip={{this.flip}}
              @id={{this.id}}
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
              @onClick={{fn
                this.update
                "showExternalButton"
                (not this.showExternalButton)
              }}
            >
              Toggle external item
            </Button>
          </:example>
          <:api as |Args|>
            <Args.String
              @name="alignment"
              @defaultValue="start"
              @description="How to align the dropdown"
              @value={{this.alignment}}
              @options={{array "" "start" "end"}}
              @onInput={{fn this.update "alignment"}}
            />
            <Args.Bool
              @name="disabled"
              @description="When true, the menu will be disabled and not open."
              @value={{this.disabled}}
              @defaultValue={{false}}
              @onInput={{fn this.update "disabled"}}
            />
            <Args.Bool
              @name="flip"
              @description="When true, the dropdown placement will auto-flip to stay within viewport."
              @value={{this.flip}}
              @defaultValue={{false}}
              @onInput={{fn this.update "flip"}}
            />
            <Args.String
              @description="A unique identifier for the menu."
              @name="id"
              @required={{true}}
              @value={{this.id}}
              @onInput={{fn this.update "id"}}
            />
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}
