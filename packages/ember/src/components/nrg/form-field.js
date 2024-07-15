import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class NrgFormFieldComponent extends Component {
  @tracked
  fieldId = 'field-' + guidFor(this);

  @tracked
  model;
}
