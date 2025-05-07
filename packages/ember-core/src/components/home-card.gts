import Component from '@glimmer/component';

export interface HomeCardSignature {
  Args: {};
  Blocks: {
    default: [];
  };
  Element: null;
}

export default class HomeCard extends Component<HomeCardSignature> {
  <template>
    {{yield}}
  </template>
}
