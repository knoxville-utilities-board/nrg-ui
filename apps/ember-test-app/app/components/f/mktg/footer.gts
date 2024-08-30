import { fn } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Button from '@nrg-ui/ember/components/button';
import Footer from '@nrg-ui/ember/components/mktg/footer';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

export default class extends Component {
  @tracked
  class = 'bg-primary';

  @tracked
  hasDivider = false;

  @action
  update(key: string, value: unknown) {
    this[key] = value;
  }

  <template>
    <FreestyleSection @name="Footer" as |Section|>
      <Section.subsection @name="Basics">
        <FreestyleUsage>
          <:example>
            <Footer class={{this.class}} @hasDivider={{this.hasDivider}}>
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
                <p href="" class="text-light mb-0">Brand</p>
              </:brand>
              <:legal>
                <a href="" class="text-light">Legal 1</a>
                <a href="" class="text-light">Legal 2</a>
              </:legal>
            </Footer>
          </:example>
          <:api as |Args|>
            <Args.String
              @description="The class to apply to the footer. Note that this is not an argument but rather a class applied directly to the footer"
              @name="class"
              @value={{this.class}}
              @onInput={{fn this.update "class"}}
            />
            <Args.Yield
              @description="Renders brand content in the bottom left"
              @name="brand"
            />
            <Args.Bool
              @description="When true, the footer will render a divider between the top and bottom sections. Note that the default value is false"
              @name="divider"
              value={{this.hasDivider}}
              @onInput={{fn this.update "hasDivider"}}
              @defaultValue={{false}}
            />
            <Args.Yield
              @description="Renders legal content in the bottom right"
              @name="legal"
            />
            <Args.Yield
              @description="Renders navigational content in the top left"
              @name="nav"
            />
            <Args.Yield
              @description="Renders social media links in the top right"
              @name="social-media"
            />
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}
