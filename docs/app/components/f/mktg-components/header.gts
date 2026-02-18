import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Button from '@nrg-ui/core/components/button';
import MktgHeader from '@nrg-ui/core/components/mktg/header';
import Section from '@nrg-ui/showcase/components/section';

export default class HeaderDemo extends Component {
  @tracked
  dropSection = false;

  @tracked
  flexCollapse = false;

  <template>
    <Section @name="Header" @parentName="mktg" as |Section|>
      <Section.Subsection @name="Basics" @model={{this}} @elementTag="div">
        <:example as |model|>
          <MktgHeader
            class="text-primary"
            @dropSection={{model.dropSection}}
            @flexCollapse={{model.flexCollapse}}
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
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.Boolean
              @defaultValue="false"
              @description="When true, the options block renders below the title on small screens."
              @name="dropSection"
            />
            <Args.Boolean
              @name="flexCollapse"
              @description="Each of the sections of the flexbox container shrink to fit the content. Each section is also evenly spaced. This is most useful when one of the header sections contains more content than the others."
            />
          </Api.Arguments>
          <Api.Blocks as |Block|>
            <Block
              @description="Named yield block to render branding content such as icons"
              @name="brand"
            />
            <Block
              @description="Named yield block to render nav content such as buttons"
              @name="nav"
            />
            <Block
              @description="Named yield block to render optional content next to the title on large displays. On small screen sizes, this content drops below the header into its own row."
              @name="options"
            />
            <Block
              @description="Named yield block to render the title of the header"
              @name="title"
            />
          </Api.Blocks>
        </:api>
      </Section.Subsection>
    </Section>
  </template>
}
