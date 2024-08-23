import Component from '@glimmer/component';
import Footer from '@nrg-ui/ember/components/footer';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class extends Component {
  <template>
    <FreestyleSection @name="Footer" as |Section|>
      <Section.subsection @name="Basics">
        <FreestyleUsage>
          <:example>
            <div class="container-fluid">
              <Footer>
                <:left>
                  Left section
                </:left>
                <:right>
                  Right Section
                </:right>
              </Footer>
            </div>
          </:example>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}
