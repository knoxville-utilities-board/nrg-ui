import { fn } from '@ember/helper';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Button from '@nrg-ui/core/components/button';
import Toaster from '@nrg-ui/core/components/toaster';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

import type ToastService from '@nrg-ui/core/services/toast';

export default class extends Component {
  @service
  toast!: ToastService;

  @tracked
  fixed = true;

  @action
  update(key: string, value: unknown) {
    this[key] = value;
  }

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

  <template>
    <FreestyleSection @name="Toaster" as |Section|>
      <Section.subsection @name="Basics">
        <FreestyleUsage>
          <:example>
            <Button @onClick={{this.createToast}} class="btn-primary">
              Create Toasts
            </Button>
            <Toaster @fixed={{this.fixed}} />
          </:example>
          <:api as |Args|>
            <Args.Bool
              @name="fixed"
              @defaultValue={{true}}
              @description="When true, the toaster will be fixed to the top-right of the screen."
              @value={{this.fixed}}
              @onInput={{fn this.update "fixed"}}
            />
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}
