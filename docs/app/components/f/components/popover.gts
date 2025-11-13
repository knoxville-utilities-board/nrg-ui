import { array, fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Button from '@nrg-ui/core/components/button';
import Popover from '@nrg-ui/core/components/popover';
import onClickOutside from '@nrg-ui/core/modifiers/on-click-outside';
import Section from '@nrg-ui/showcase/components/section';

import type { TOC } from '@ember/component/template-only';
import type { Alignment, Side } from '@floating-ui/dom';
import type ToastService from '@nrg-ui/core/services/toast';

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

export default class PopoverDemo extends Component {
  @service
  declare toast: ToastService;

  @tracked
  alignment?: Alignment;

  @tracked
  arrow: boolean = true;

  @tracked
  delay = 0;

  @tracked
  flip = false;

  @tracked
  offset?: number;

  @tracked
  side: Side = 'bottom';

  <template>
    <Section @name="Popover" as |Section|>
      <Section.Subsection @name="Button" @model={{this}}>
        <:example as |model|>
          <Popover
            @alignment={{model.alignment}}
            @arrow={{model.arrow}}
            @delay={{model.delay}}
            @flip={{model.flip}}
            @offset={{model.offset}}
            @side={{model.side}}
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
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.String
              @name="alignment"
              @description="How to align the popover"
              @options={{array "" "start" "end"}}
            />
            <Args.Boolean
              @name="arrow"
              @defaultValue={{true}}
              @description="Whether to show an arrow pointing to the control"
            />
            <Args.Number
              @name="delay"
              @defaultValue={{0}}
              @description="Amount of delay before showing the popover (in milliseconds)"
            />
            <Args.Boolean
              @name="flip"
              @defaultValue={{false}}
              @description="When true, the popover will auto-flip to stay within viewport."
            />
            <Args.Number
              @name="offset"
              @description="How far to offset the popover from the control (in pixels)"
            />
            <Args.String
              @name="side"
              @defaultValue="bottom"
              @description="Which side of the control to show the popover"
              @options={{array "" "top" "end" "bottom" "start"}}
            />
          </Api.Arguments>
          <Api.Actions as |Action|>
            <Action
              @name="onShow"
              @description="Fired when the popover is shown"
              @returnType="Promise<void>"
            />
            <Action
              @name="onHide"
              @description="Fired when the popover is hidden"
              @returnType="Promise<void>"
            />
          </Api.Actions>
        </:api>
      </Section.Subsection>
      <Section.Subsection @name="Hoverable Block" @model={{this}}>
        <:example as |model|>
          <Popover
            @alignment={{model.alignment}}
            @arrow={{model.arrow}}
            @delay={{model.delay}}
            @flip={{model.flip}}
            @offset={{model.offset}}
            @side={{model.side}}
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
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.String
              @name="alignment"
              @description="How to align the popover"
              @options={{array "" "start" "end"}}
            />
            <Args.Boolean
              @name="arrow"
              @defaultValue={{true}}
              @description="Whether to show an arrow pointing to the control"
            />
            <Args.Number
              @name="delay"
              @defaultValue="undefined"
              @description="Amount of delay before showing the popover (in milliseconds)"
            />
            <Args.Boolean
              @name="flip"
              @defaultValue={{false}}
              @description="Whether to flip the side the popover is on when it reaches the viewport boundary"
            />
            <Args.Number
              @name="offset"
              @description="How far to offset the popover from the control (in pixels)"
            />
            <Args.String
              @name="side"
              @defaultValue="bottom"
              @description="Which side of the control to show the popover"
              @options={{array "" "top" "end" "bottom" "start"}}
            />
          </Api.Arguments>
          <Api.Actions as |Action|>
            <Action
              @name="onShow"
              @description="Fired when the popover is shown"
              @returnType="Promise<void>"
            />
            <Action
              @name="onHide"
              @description="Fired when the popover is hidden"
              @returnType="Promise<void>"
            />
          </Api.Actions>
        </:api>
      </Section.Subsection>
    </Section>
  </template>
}
