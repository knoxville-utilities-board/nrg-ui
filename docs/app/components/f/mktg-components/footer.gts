import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Button from '@nrg-ui/core/components/button';
import MktgFooter from '@nrg-ui/core/components/mktg/footer';
import Section from '@nrg-ui/showcase/components/section';

export default class FooterDemo extends Component {
  @tracked
  hasDivider = false;

  <template>
    <Section @name="Footer" as |Section|>
      <Section.Subsection @name="Basics" @model={{this}} @elementTag="footer">
        <:example as |model|>
          <MktgFooter class="bg-primary" @hasDivider={{model.hasDivider}}>
            <:nav>
              <Button class="ms-2 rounded-pill btn-light">Nav 1</Button>
              <a
                href=""
                class="text-light link-underline link-underline-opacity-0"
              >
                Nav 2
              </a>
              <a
                href=""
                class="text-light link-underline link-underline-opacity-0"
              >
                Nav 3
              </a>
              <a
                href=""
                class="text-light link-underline link-underline-opacity-0"
              >
                Nav 4
              </a>
              <a
                href=""
                class="text-light link-underline link-underline-opacity-0"
              >
                Nav 5
              </a>
            </:nav>
            <:social-media>
              <a href=""><i class="text-light bi-facebook h4" /></a>
              <a href=""><i class="text-light bi-twitter h4" /></a>
              <a href=""><i class="text-light bi-instagram h4" /></a>
              <a href=""><i class="text-light bi-linkedin h4" /></a>
              <a href=""><i class="text-light bi-youtube h4" /></a>
            </:social-media>
            <:brand>
              <div>
                <img
                  src="https://imageplaceholder.net/50x50"
                  alt="Sample icon"
                />
              </div>
              <a href="" class="text-light mb-0">Brand</a>
            </:brand>
            <:legal>
              <a href="" class="text-light">Legal 1</a>
              <a href="" class="text-light">Legal 2</a>
            </:legal>
          </MktgFooter>
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.Boolean
              @description="When true, the footer will render a divider between the top and bottom sections. Note that the default value is false"
              @name="hasDivider"
              @defaultValue={{false}}
            />
          </Api.Arguments>
          <Api.Blocks as |Block|>
            <Block
              @description="Renders brand content in the bottom left"
              @name="brand"
            />
            <Block
              @description="Renders legal content in the bottom right"
              @name="legal"
            />
            <Block
              @description="Renders navigational content in the top left"
              @name="nav"
            />
            <Block
              @description="Renders social media links in the top right"
              @name="social-media"
            />
          </Api.Blocks>
        </:api>
      </Section.Subsection>
    </Section>
  </template>
}
