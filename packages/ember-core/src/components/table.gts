import Component from '@glimmer/component';
import EmberTable from 'ember-table';

export interface TableSignature {
  Args: {};
  Blocks: {
    default: [];
  };
  Element: null;
}

export default class Table extends Component<TableSignature> {

  get columns() {
    return [
      { name: 'A', valuePath: 'A', width: 180 },
      { name: 'B', valuePath: 'B', width: 180 },
      { name: 'C', valuePath: 'C', width: 180 },
      { name: 'D', valuePath: 'D', width: 180 },
    ];
  }

  get rows() {
    return [
      { A: 'A', B: 'B', C: 'C', D: 'D' },
      { A: 'A', B: 'B', C: 'C', D: 'D' },
      { A: 'A', B: 'B', C: 'C', D: 'D' },
      { A: 'A', B: 'B', C: 'C', D: 'D' },
      { A: 'A', B: 'B', C: 'C', D: 'D' },
      { A: 'A', B: 'B', C: 'C', D: 'D' },
      { A: 'A', B: 'B', C: 'C', D: 'D' },
      { A: 'A', B: 'B', C: 'C', D: 'D' },
      { A: 'A', B: 'B', C: 'C', D: 'D' },
      { A: 'A', B: 'B', C: 'C', D: 'D' },
      { A: 'A', B: 'B', C: 'C', D: 'D' },
    ];
  }

  <template>
    {{! @glint-expect-error: EmberTable is not typed }}
    <EmberTable as |t|>
      <t.head @columns={{this.columns}} />
      <t.body @rows={{this.rows}} />
    </EmberTable>
  </template>
}
