// @ts-nocheck - TODO

import { fn } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Button, MktgHeader } from '@nrg-ui/core';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

export default class HeaderDemo extends Component {
  @tracked
  class = 'text-primary';

  @tracked
  dropSection = false;

  @tracked
  flexCollapse = false;

  @action
  update(key: string, value: unknown) {
    this[key] = value;
  }

  <template>
    <FreestyleSection @name="Header" as |Section|>
      <Section.subsection @name="Basics">
        <FreestyleUsage>
          <:example>
            <MktgHeader
              class={{this.class}}
              @dropSection={{this.dropSection}}
              @flexCollapse={{this.flexCollapse}}
            >
              <:brand>
                <img src="https://imageplaceholder.net/50" alt="Icon" />
              </:brand>
              <:title>
                <p class="m-0">Title</p>
              </:title>
              <:nav>
                <Button class="btn-outline-primary me-1">Prev</Button>
                <Button class="btn-primary me-1">Next</Button>
              </:nav>
              <:options>
                <p class="my-0 me-2 fw-bold">Option 1</p>
                <p class="my-0 me-2 fw-bold">Option 2</p>
                <p class="my-0 me-2 fw-bold">Option 3</p>
              </:options>
            </MktgHeader>
          </:example>
          <:api as |Args|>
            <Args.String
              @description="The class to apply to the header. Note that this is not an argument but rather a class applied directly to the header"
              @name="class"
              @value={{this.class}}
              @onInput={{fn this.update "class"}}
            />
            <Args.Bool
              @defaultValue="false"
              @description="When true, the options block renders below the title on small screens."
              @name="dropSection"
              @type="Bool"
              @value={{this.dropSection}}
              @onInput={{fn this.update "dropSection"}}
            />
            <Args.Bool
              @name="flexCollapse"
              @description="Each of the sections of the flexbox container shrink to fit the content. Each section is also evenly spaced. This is most useful when one of the header sections contains more content than the others."
              @value={{this.flexCollapse}}
              @onInput={{fn this.update "flexCollapse"}}
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
