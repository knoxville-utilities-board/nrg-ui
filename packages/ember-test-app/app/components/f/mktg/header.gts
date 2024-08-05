import Component from '@glimmer/component';
import Header from '@nrg-ui/ember/components/mktg/header';
import Button from '@nrg-ui/ember/components/button';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import { fn } from '@ember/helper';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class extends Component {
  @tracked
  class = 'bg-primary';

  @action
  update(key: string, value: unknown) {
    this[key] = value;
  }

  <template>
    <FreestyleSection @name="Header" as |Section|>
      <Section.subsection @name="Basics">
        <FreestyleUsage>
          <:example>
            <Header class={{this.class}}>
              <:brand>
                <img src="https://imageplaceholder.net/50" alt="Icon" />
              </:brand>
              <:title>
                <p class="m-0">Title</p>
              </:title>
              <:nav>
                <Button
                  class="btn-outline-light me-1 rounded-pill"
                >Prev</Button>
                <Button
                  class="btn-outline-light me-1 rounded-pill"
                >Next</Button>
              </:nav>
              <:options>
                <p class="my-0 me-2 fw-bold">Option 1</p>
                <p class="my-0 me-2 fw-bold">Option 2</p>
                <p class="my-0 me-2 fw-bold">Option 3</p>
              </:options>
            </Header>
          </:example>
          <:api as |Args|>
            <Args.String
              @name="class"
              @description="The class to apply to the header. Note that this is not an argument but rather a class applied directly to the header"
              @value={{this.class}}
              @onInput={{fn this.update "class"}}
            />
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}
