import { array, fn } from '@ember/helper';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Dropdown, Toaster } from '@nrg-ui/core';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

import CodeBlock from '../../code-block';

import type { Alignment, Side } from '@floating-ui/dom';
import type { ToastService } from '@nrg-ui/core/services/toast';

export default class extends Component {
  @service
  declare toast: ToastService;

  @tracked
  alignment?: Alignment;

  @tracked
  class: string = 'btn-primary';

  @tracked
  closeOnSelect?: boolean;

  @tracked
  hasIcon?: boolean;

  @tracked
  isOpen?: boolean;

  @tracked
  offset?: number;

  @tracked
  side?: Side;

  update = (key: string, value: unknown) => {
    this[key] = value;
  };

  log = (...args: unknown[]) => {
    console.log(...args);
  };

  <template>
    <Toaster />
    <FreestyleSection @name="Dropdown" as |Section|>
      <Section.subsection @name="Button">
        <FreestyleUsage>
          <:example>
            <Dropdown
              class={{this.class}}
              @alignment={{this.alignment}}
              @closeOnSelect={{this.closeOnSelect}}
              @hasIcon={{this.hasIcon}}
              @isOpen={{this.isOpen}}
              @offset={{this.offset}}
              @side={{this.side}}
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
                  @onSelect={{fn this.log "Item 1 clicked"}}
                >
                  Item 1
                </Menu.Item>
                <Menu.Item @onSelect={{fn this.log "Item 2 clicked"}}>Item 2</Menu.Item>
                <Menu.Item @onSelect={{fn this.log "Item 3 clicked"}}>Item 3</Menu.Item>
                <Menu.Divider />
                <Menu.Header>
                  Header 2
                </Menu.Header>
                <Menu.Item @onSelect={{fn this.log "Item 4 clicked"}}>Item 4</Menu.Item>
                <Menu.Item @onSelect={{fn this.log "Item 5 clicked"}}>Item 5</Menu.Item>
                <Menu.Item @onSelect={{fn this.log "Item 6 clicked"}}>Item 6</Menu.Item>
              </:menu>
            </Dropdown>
          </:example>
          <:api as |Args|>
            <Args.String
              @name="class"
              @description="The class to apply to the dropdown button. Note that this is not an argument but rather a class applied directly to the button"
              @value={{this.class}}
              @onInput={{fn this.update "class"}}
              @options={{this.classOptions}}
            />
            <Args.String
              @name="alignment"
              @defaultValue="start"
              @description="How to align the dropdown"
              @value={{this.alignment}}
              @options={{array "" "start" "end"}}
              @onInput={{fn this.update "alignment"}}
            />
            <Args.Bool
              @name="closeOnSelect"
              @defaultValue={{true}}
              @description="Whether to close the dropdown when an item is selected"
              @value={{this.closeOnSelect}}
              @onInput={{fn this.update "closeOnSelect"}}
            />
            <Args.Bool
              @name="hasIcon"
              @defaultValue="true"
              @description="Whether to show the dropdown icon"
              @value={{this.hasIcon}}
              @onInput={{fn this.update "hasIcon"}}
            />
            <Args.Bool
              @name="isShown"
              @defaultValue="undefined"
              @description="Whether to open the dropdown"
              @value={{this.isShown}}
              @onInput={{fn this.update "isShown"}}
            />
            <Args.Number
              @name="offset"
              @description="How far to offset the dropdown from the button (in pixels)"
              @value={{this.offset}}
              @onInput={{fn this.update "offset"}}
            />
            <Args.String
              @name="side"
              @defaultValue="bottom"
              @description="Which side of the control to show the dropdown"
              @value={{this.side}}
              @options={{array "" "top" "end" "bottom" "start"}}
              @onInput={{fn this.update "side"}}
            />
            <Args.Action
              @name="onShow"
              @description="Fired when the dropdown is shown"
            >
              <CodeBlock @lang="typescript" @code="() => Promise<void>" />
            </Args.Action>
            <Args.Action
              @name="onHide"
              @description="Fired when the dropdown is hidden"
            >
              <CodeBlock @lang="typescript" @code="() => Promise<void>" />
            </Args.Action>
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}
