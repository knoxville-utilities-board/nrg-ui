import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class ComponentsButtonController extends Controller {
  classOptions = [
    'btn-primary',
    'btn-secondary',
    'btn-success',
    'btn-danger',
    'btn-warning',
    'btn-info',
    'btn-light',
    'btn-dark',
    'btn-link',
  ];

  @tracked
  class = 'btn-primary';

  @tracked
  text = 'Click me!';

  @tracked
  icon = 'bi-arrow-right';

  @tracked
  iconLabel?: string;

  @tracked
  iconPosition = 'left';
}
