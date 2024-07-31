import Component from '@glimmer/component';

export interface MktgWorkflowTraySignature {
  Args: {};
  Blocks: {
    default: [];
  };
  Element: null;
}

export default class MktgWorkflowTray extends Component<MktgWorkflowTraySignature> {
  <template>
    <h1>Workflow Tray</h1>
    {{yield}}
  </template>
}
