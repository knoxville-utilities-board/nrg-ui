import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import Button from '@nrg-ui/core/components/button';
import Section from '@nrg-ui/showcase/components/section';

import type ToastService from '@nrg-ui/core/services/toast';

export default class ToasterDemo extends Component {
  @service
  declare toast: ToastService;

  @action
  createToast() {
    this.toast.info('This is an info message', {
      timeout: 8000,
    });
    this.toast.success('This is a success message', {
      timeout: 7000,
    });
    this.toast.warning('This is a warning message', {
      timeout: 6000,
    });
    this.toast.danger('This is a danger message', {
      timeout: 5000,
    });
  }

  @action
  createStickyToast() {
    this.toast.info('This is a sticky info message', {
      sticky: true,
    });
    this.toast.success('This is a sticky success message', {
      sticky: true,
    });
    this.toast.warning('This is a sticky warning message', {
      sticky: true,
    });
    this.toast.danger('This is a sticky danger message', {
      sticky: true,
    });
  }

  <template>
    <Section @name="Toaster" as |Section|>
      <Section.Subsection @name="Basics" @model={{this}} @elementTag="div">
        <:example>
          <Button class="btn-primary" @onClick={{this.createToast}}>
            Create Toasts
          </Button>
          <Button class="btn-primary" @onClick={{this.createStickyToast}}>
            Create Sticky Toasts
          </Button>
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.Boolean
              @name="fixed"
              @defaultValue={{true}}
              @description="When true, the toaster will be fixed to the top-right of the screen."
            />
          </Api.Arguments>
        </:api>
      </Section.Subsection>
    </Section>
  </template>
}
