import Component from '@glimmer/component';
import Button from '@nrg-ui/ember/components/button';
import Footer from '@nrg-ui/ember/components/mktg/footer';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class extends Component {
  <template>
    <FreestyleSection @name="Footer" as |Section|>
      <Section.subsection @name="Basics">
        <FreestyleUsage>
          <:example>
            <Footer class={{this.class}}>
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
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}
