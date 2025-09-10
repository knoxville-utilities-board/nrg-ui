// @ts-nocheck - TODO

import { fn } from '@ember/helper';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Table } from '@nrg-ui/core';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';


export default class TableDemo extends Component {

  <template>
    <FreestyleSection @name="Table" as |Section|>
      <Section.subsection @name="Default">
        <FreestyleUsage>
          <:example>
            <Table />
          </:example>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'F::Components::Table': typeof TableDemo;
  }
}
