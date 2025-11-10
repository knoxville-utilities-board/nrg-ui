import { array, fn } from '@ember/helper';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Dropdown from '@nrg-ui/core/components/dropdown';
import Section from '@nrg-ui/showcase/components/section';

import type { Alignment, Side } from '@floating-ui/dom';
import type ToastService from '@nrg-ui/core/services/toast';

function print(...args: unknown[]) {
  console.log(...args);
}

export default class DropdownDemo extends Component {
  @service
  declare toast: ToastService;

  @tracked
  alignment?: Alignment = 'start';

  @tracked
  closeOnSelect?: boolean = true;

  @tracked
  disabled?: boolean;

  @tracked
  flip?: boolean;

  @tracked
  hasIcon?: boolean;

  @tracked
  icon?: string;

  @tracked
  iconOnly?: boolean = true;

  @tracked
  isOpen?: boolean;

  @tracked
  offset?: number;

  @tracked
  side: Side = 'bottom';

  <template>
    <Section @name="Dropdown" as |Section|>
      <Section.Subsection @name="Basic" @model={{this}} @elementTag="div">
        <:example as |model|>
          <Dropdown
            class="btn-primary"
            @alignment={{model.alignment}}
            @closeOnSelect={{model.closeOnSelect}}
            @disabled={{model.disabled}}
            @flip={{model.flip}}
            @icon={{model.icon}}
            @hasIcon={{model.hasIcon}}
            @offset={{model.offset}}
            @side={{model.side}}
            @onShow={{fn this.toast.info "onShow was fired"}}
            @onHide={{fn this.toast.info "onHide was fired"}}
          >
            <:control>
              Dropdown
            </:control>
            <:menu as |Menu|>
              <Menu.Header>
                Header
              </Menu.Header>
              <Menu.Item
                @disabled={{true}}
                @onSelect={{fn print "Item 1 clicked"}}
              >
                Item 1
              </Menu.Item>
              <Menu.Item
                @closeOnSelect={{false}}
                @onSelect={{fn print "Item 2 clicked"}}
              >
                Item 2 (I don't close on select)
              </Menu.Item>
              <Menu.Item @onSelect={{fn print "Item 3 clicked"}}>Item 3</Menu.Item>
              <Menu.Divider />
              <Menu.Header>
                Header 2
              </Menu.Header>
              <Menu.Item @onSelect={{fn print "Item 4 clicked"}}>Item 4</Menu.Item>
              <Menu.Item @onSelect={{fn print "Item 5 clicked"}}>Item 5</Menu.Item>
              <Menu.Item @onSelect={{fn print "Item 6 clicked"}}>Item 6</Menu.Item>
            </:menu>
          </Dropdown>
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
              @name="closeOnSelect"
              @defaultValue={{true}}
              @description="Whether to close the dropdown when an item is selected"
            />
            <Args.Boolean
              @name="disabled"
              @description="Whether the dropdown is disabled"
            />
            <Args.Boolean
              @name="flip"
              @description="When true, the dropdown placement will auto-flip to stay within viewport."
              @defaultValue={{false}}
            />
            <Args.Boolean
              @name="hasIcon"
              @defaultValue="true"
              @description="Whether to show the dropdown icon"
            />
            <Args.String
              @name="icon"
              @defaultValue="bi-caret-down-fill"
              @description="Replace the default dropdown icon with a custom icon"
            />
            <Args.Number
              @name="offset"
              @description="How far to offset the dropdown from the button (in pixels)"
            />
            <Args.String
              @name="side"
              @defaultValue="bottom"
              @description="Which side of the control to show the dropdown"
              @options={{array "" "top" "end" "bottom" "start"}}
            />
          </Api.Arguments>
          <Api.Actions as |Action|>
            <Action
              @name="onShow"
              @description="Fired when the dropdown is shown"
              @returnType="Promise<void>"
            />
            <Action
              @name="onHide"
              @description="Fired when the dropdown is hidden"
              @returnType="Promise<void>"
            />
          </Api.Actions>
        </:api>
      </Section.Subsection>

      <Section.Subsection @name="Icon Only" @model={{this}} @elementTag="div">
        <:example as |model|>
          <Dropdown
            @alignment={{model.alignment}}
            @closeOnSelect={{model.closeOnSelect}}
            @disabled={{model.disabled}}
            @flip={{model.flip}}
            @icon={{model.icon}}
            @iconOnly={{model.iconOnly}}
            @hasIcon={{model.hasIcon}}
            @offset={{model.offset}}
            @side={{model.side}}
            @onShow={{fn model.toast.info "onShow was fired"}}
            @onHide={{fn model.toast.info "onHide was fired"}}
          >
            <:menu as |Menu|>
              <Menu.Header>
                Header
              </Menu.Header>
              <Menu.Item
                @disabled={{true}}
                @onSelect={{fn print "Item 1 clicked"}}
              >
                Item 1
              </Menu.Item>
              <Menu.Item
                @closeOnSelect={{false}}
                @onSelect={{fn print "Item 2 clicked"}}
              >
                Item 2 (I don't close on select)
              </Menu.Item>
              <Menu.Item @onSelect={{fn print "Item 3 clicked"}}>Item 3</Menu.Item>
            </:menu>
          </Dropdown>
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.String
              @name="icon"
              @defaultValue="bi-caret-down-fill"
              @description="Replace the default dropdown icon with a custom icon"
            />
            <Args.Boolean
              @name="iconOnly"
              @defaultValue={{true}}
              @description="Whether to show only the icon in the dropdown button"
            />
          </Api.Arguments>
        </:api>
      </Section.Subsection>
    </Section>
  </template>
}
