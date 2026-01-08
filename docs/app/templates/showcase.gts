import { array, fn } from '@ember/helper';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Button from '@nrg-ui/core/components/button';
import Section from '@nrg-ui/showcase/components/section';
import pageTitle from 'ember-page-title/helpers/page-title';

class Model {
  @tracked
  disabled = false;

  @tracked
  loading = false;

  @tracked
  text = 'Click me!';

  @tracked
  type = 'button';
}

export default class extends Component {
  model = new Model();

  update = (key: keyof Model, value: Model[typeof key]) => {
    // @ts-expect-error - Generics are not properly inferred here
    this.model[key] = value;
  };

  <template>
    {{pageTitle "Showcase"}}

    <div class="row g-0">
      <div class="col px-md-0 py-3">
        <div class="container mx-auto">
          <Section @name="Section Title" as |S|>
            <S.Subsection
              @elementTag="button"
              @model={{this.model}}
              @name="Subsection Title"
              @sourceCode="<Button class=&quot;btn-primary&quot; @disabled=&#123;&#123;__SHOWCASE_ARG_disabled__&#125;&#125;>Click me!</Button>"
              @sourceLanguage="html"
            >
              <:example as |model|>
                <Button
                  class="btn-primary"
                  @disabled={{model.disabled}}
                  @loading={{model.loading}}
                  @text={{model.text}}
                  @type={{model.type}}
                />
              </:example>
              <:api as |Api|>
                <Api.Arguments as |Arg|>
                  <Arg.Boolean
                    @name="disabled"
                    @defaultValue={{false}}
                    @description="When true, the button will be disabled"
                    @onInput={{fn this.update "disabled"}}
                  />
                  <Arg.Boolean
                    @name="loading"
                    @description="When true, the text will be replaced with a loading spinner"
                    @onInput={{fn this.update "loading"}}
                  />
                  <Arg.String
                    @name="text"
                    @description="The text to display on the button"
                    @onInput={{fn this.update "text"}}
                  />
                  <Arg.String
                    @name="type"
                    @defaultValue="button"
                    @description="The type of button"
                    @options={{array "button" "submit"}}
                    @onInput={{fn this.update "type"}}
                  />
                </Api.Arguments>
                <Api.Actions as |Action param|>
                  <Action
                    @name="onClick"
                    @parameters={{array (param "event" type="MouseEvent")}}
                    @returnType="void"
                  />
                </Api.Actions>
                <Api.Blocks as |Block|>
                  <Block @name="default" @description="The content of the button" />
                </Api.Blocks>
              </:api>
            </S.Subsection>
          </Section>
        </div>
      </div>
    </div>
  </template>
}
