import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { MktgNavbar, NavItem } from '@nrg-ui/core';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

export default class NavbarDemo extends Component {
  @tracked
  menuOpen = false;

  @tracked
  actionButtonText = 'Mobile Button';

  @action
  update(key: string, value: unknown) {
    // @ts-expect-error - TODO
    this[key] = value;
  }

  <template>
    {{! @glint-expect-error - Freestyle doesn't have great types }}
    <FreestyleSection @name="Navbar" as |Section|>
      <Section.subsection @name="Basics">
        {{! @glint-expect-error - Freestyle doesn't have great types }}
        <FreestyleUsage>
          <:example>
            <MktgNavbar>
              <:brand>
                <a class="navbar-brand mx-5" href="https://www.kub.org">
                  <img
                    src="https://imageplaceholder.net/50"
                    alt="Placeholder"
                  />
                </a>
              </:brand>
              <:actions as |Button|>
                <Button
                  @text={{this.actionButtonText}}
                  class="btn-secondary ms-auto d-lg-none"
                />
              </:actions>
              <:default>
                <NavItem @url="#" @label="Home" />
                <NavItem @url="#" @label="Products" />
              </:default>
            </MktgNavbar>
          </:example>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'F::Components::Navbar': typeof NavbarDemo;
  }
}
