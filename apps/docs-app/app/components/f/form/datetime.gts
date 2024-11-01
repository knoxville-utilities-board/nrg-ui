import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Datetime from '@nrg-ui/core/components/form/datetime';
import bind from '@nrg-ui/core/helpers/bind';

export default class extends Component {
  @tracked
  value;

  <template>
    <Datetime class="mt-3" @binding={{bind this "value"}} @type="datetime" />
  </template>
}
