import Component from '@glimmer/component';
import { Button, Popover } from '@nrg-ui/core';

export default class extends Component {
  <template>
    <Popover>
      <:control as |Actions|>
        <Button class="btn-primary" @onClick={{Actions.toggle}}>
          Toggle
        </Button>
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
  </template>
}
