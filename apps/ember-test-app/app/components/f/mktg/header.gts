import { fn } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Button from '@nrg-ui/core/components/button';
import Header from '@nrg-ui/core/components/mktg/header';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

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
              @description="The class to apply to the header. Note that this is not an argument but rather a class applied directly to the header"
              @name="class"
              @value={{this.class}}
              @onInput={{fn this.update "class"}}
            />
            <Args.Yield
              @description="Named yield block to render branding content such as icons"
              @name="brand"
            />
            <Args.Yield
              @description="Named yield block to render nav content such as buttons"
              @name="nav"
            />
            <Args.Yield
              @description="Named yield block to render optional content next to the title on large displays. On small screen sizes, this content drops below the header into it's own row."
              @name="options"
            />
            <Args.Yield
              @description="Named yield block to render the title of the header"
              @name="title"
            />
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}
