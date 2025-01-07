import { array, fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Button, Popover, Toaster, onClickOutside } from '@nrg-ui/core';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

import CodeBlock from '../../code-block';

import type { TOC } from '@ember/component/template-only';
import type { Alignment, Side } from '@floating-ui/dom';
import type { ToastService } from '@nrg-ui/core/services/toast';

interface PopoverBlockSignature {
  Element: HTMLDivElement;
  Blocks: {
    default: [];
  };
}

const PopoverBlock: TOC<PopoverBlockSignature> = <template>
  <div class="popover-block" ...attributes>
    {{yield}}
  </div>
</template>;

export default class extends Component {
  @service
  declare toast: ToastService;

  @tracked
  alignment?: Alignment;

  @tracked
  arrow: boolean = true;

  @tracked
  flip: boolean = false;

  @tracked
  isShown?: boolean;

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
    <FreestyleSection @name="Popover" as |Section|>
      <Section.subsection @name="Button">
        <FreestyleUsage>
          <:example>
            <Popover
              @alignment={{this.alignment}}
              @arrow={{this.arrow}}
              @flip={{this.flip}}
              @isShown={{this.isShown}}
              @offset={{this.offset}}
              @side={{this.side}}
              @onShow={{fn this.toast.info "onShow was fired"}}
              @onHide={{fn this.toast.info "onHide was fired"}}
            >
              <:control as |actions|>
                <Button
                  class="btn-primary"
                  @onClick={{actions.toggle}}
                  {{onClickOutside actions.hide}}
                >
                  Toggle
                </Button>
              </:control>
              <:content as |Content actions|>
                <Content.Header>
                  Header
                  <a class="icon-link" href="#" {{on "click" actions.hide}}>
                    <i aria-label="Close" class="ms-1 bi-x me-n2" />
                  </a>
                </Content.Header>
                <Content.Body>
                  Body
                </Content.Body>
              </:content>
            </Popover>
          </:example>
          <:api as |Args|>
            <Args.String
              @name="alignment"
              @description="How to align the popover"
              @value={{this.alignment}}
              @options={{array "" "start" "end"}}
              @onInput={{fn this.update "alignment"}}
            />
            <Args.Bool
              @name="arrow"
              @defaultValue={{true}}
              @description="Whether to show an arrow pointing to the control"
              @value={{this.arrow}}
              @onInput={{fn this.update "arrow"}}
            />
            <Args.Bool
              @name="flip"
              @defaultValue={{false}}
              @description="Whether to flip the side the popover is on when it reaches the viewport boundary"
              @value={{this.fip}}
              @onInput={{fn this.update "flip"}}
            />
            <Args.Bool
              @name="isShown"
              @defaultValue="undefined"
              @description="Whether to show the popover"
              @value={{this.isShown}}
              @onInput={{fn this.update "isShown"}}
            />
            <Args.Number
              @name="offset"
              @description="How far to offset the popover from the control (in pixels)"
              @value={{this.offset}}
              @onInput={{fn this.update "offset"}}
            />
            <Args.String
              @name="side"
              @defaultValue="bottom"
              @description="Which side of the control to show the popover"
              @value={{this.side}}
              @options={{array "" "top" "end" "bottom" "start"}}
              @onInput={{fn this.update "side"}}
            />
            <Args.Action
              @name="onShow"
              @description="Fired when the popover is shown"
            >
              <CodeBlock @lang="typescript" @code="() => Promise<void>" />
            </Args.Action>
            <Args.Action
              @name="onHide"
              @description="Fired when the popover is hidden"
            >
              <CodeBlock @lang="typescript" @code="() => Promise<void>" />
            </Args.Action>
          </:api>
        </FreestyleUsage>
      </Section.subsection>
      <Section.subsection @name="Hoverable Block">
        <FreestyleUsage>
          <:example>
            <Popover
              @alignment={{this.alignment}}
              @arrow={{this.arrow}}
              @flip={{this.flip}}
              @isShown={{this.isShown}}
              @offset={{this.offset}}
              @side={{this.side}}
              @onShow={{fn this.toast.info "onShow was fired"}}
              @onHide={{fn this.toast.info "onHide was fired"}}
            >
              <:control as |actions|>
                <PopoverBlock
                  {{on "mouseenter" actions.show}}
                  {{on "mouseleave" actions.hide}}
                >
                  Hover me!
                </PopoverBlock>
              </:control>
              <:content as |Content|>
                <Content.Header>
                  Header
                </Content.Header>
                <Content.Body>
                  Body
                </Content.Body>
              </:content>
            </Popover>
          </:example>
          <:api as |Args|>
            <Args.String
              @name="alignment"
              @description="How to align the popover"
              @value={{this.alignment}}
              @options={{array "" "start" "end"}}
              @onInput={{fn this.update "alignment"}}
            />
            <Args.Bool
              @name="arrow"
              @defaultValue={{true}}
              @description="Whether to show an arrow pointing to the control"
              @value={{this.arrow}}
              @onInput={{fn this.update "arrow"}}
            />
            <Args.Bool
              @name="flip"
              @defaultValue={{false}}
              @description="Whether to flip the side the popover is on when it reaches the viewport boundary"
              @value={{this.fip}}
              @onInput={{fn this.update "flip"}}
            />
            <Args.Bool
              @name="isShown"
              @defaultValue="undefined"
              @description="Whether to show the popover"
              @value={{this.isShown}}
              @onInput={{fn this.update "isShown"}}
            />
            <Args.Number
              @name="offset"
              @description="How far to offset the popover from the control (in pixels)"
              @value={{this.offset}}
              @onInput={{fn this.update "offset"}}
            />
            <Args.String
              @name="side"
              @defaultValue="bottom"
              @description="Which side of the control to show the popover"
              @value={{this.side}}
              @options={{array "" "top" "end" "bottom" "start"}}
              @onInput={{fn this.update "side"}}
            />
            <Args.Action
              @name="onShow"
              @description="Fired when the popover is shown"
            >
              <CodeBlock @lang="typescript" @code="() => Promise<void>" />
            </Args.Action>
            <Args.Action
              @name="onHide"
              @description="Fired when the popover is hidden"
            >
              <CodeBlock @lang="typescript" @code="() => Promise<void>" />
            </Args.Action>
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}
