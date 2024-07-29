import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { hash } from '@ember/helper';

import Button from './button.gts';
import FormField from './form-field.gts';

import type { ComponentLike } from '@glint/template';

declare interface FormContainerSignature {
  Element: HTMLFormElement;
  Args: {
    onSubmit?: () => unknown;
    didValidate?: () => boolean;
    required?: boolean;
    form?: any;
    valuePath?: string;
  };
  Blocks: {
    default: [
      {
        field: ComponentLike<FormField>;
      },
    ];
  };

}

export default class FormContainer extends Component<FormContainerSignature> {
  @tracked
  internalDidValidate = false;

  get didValidate() {
    return this.args.didValidate ?? this.internalDidValidate;
  }

  @action
  submit(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.internalDidValidate = true;
    this.args.onSubmit?.();
  }

  <template>
    <form class="grid needs-validation" novalidate="" ...attributes>

      {{yield (hash field=(component FormField form=this))}}

      <Button @onClick={{this.submit}} class="btn btn-primary">Submit</Button>

    </form>
  </template>
}
