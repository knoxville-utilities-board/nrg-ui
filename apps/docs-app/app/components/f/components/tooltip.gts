import { array, fn } from '@ember/helper';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Toaster, Tooltip } from '@nrg-ui/core';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

import CodeBlock from '../../code-block';

import type { Alignment, Side } from '@floating-ui/dom';
import type { ToastService } from '@nrg-ui/core/services/toast';

export default class extends Component {
  @service
  declare toast: ToastService;

  @tracked
  alignment?: Alignment;

  @tracked
  offset?: number;

  @tracked
  side?: Side;

  update = (key: string, value: unknown) => {
    this[key] = value;
  };

  <template>
    <Toaster />
    <FreestyleSection @name="Tooltip" as |Section|>
      <Section.subsection @name="Basics">
        <FreestyleUsage>
          <:example>
            <div class="p-2">
              <Tooltip
                @alignment={{this.alignment}}
                @offset={{this.offset}}
                @side={{this.side}}
                @onShow={{fn this.toast.info "onShow was fired"}}
                @onHide={{fn this.toast.info "onHide was fired"}}
              >
                <:default as |Target|>
                  <p class="mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    feugiat cursus dui ut vestibulum. Duis sit amet accumsan
                    quam. Sed pharetra augue ex, eget sodales sapien auctor sed.
                    Maecenas sagittis tellus nunc, vel blandit lectus convallis
                    sit amet. Quisque vitae sem in purus imperdiet placerat
                    rhoncus id tellus. Nunc dignissim libero a nisl bibendum
                    faucibus. Duis dictum nec nisi nec ullamcorper. Duis pretium
                    nec arcu id accumsan. Pellentesque consequat, dolor a
                    dignissim porttitor, lacus nunc sodales risus, a lacinia
                    odio quam a libero.
                  </p>
                  <Target class="d-block my-2">
                    <p
                      class="border border-primary border-2 rounded mx-n2 mb-0 p-2"
                    >
                      Etiam aliquet sollicitudin est ut feugiat. Nunc facilisis
                      ac diam id aliquet. In quis vestibulum metus. Duis
                      imperdiet urna sit amet nulla finibus imperdiet. Nunc
                      laoreet dictum viverra. Phasellus quis sapien mattis,
                      eleifend odio a, suscipit lorem. Morbi arcu lectus,
                      aliquet ac vehicula eget, luctus eget nunc. Mauris finibus
                      sodales libero, in auctor nulla consequat ac. Maecenas
                      fermentum leo id aliquam tristique. Vestibulum fermentum
                      commodo erat. Etiam dictum urna vel porttitor laoreet.
                      Mauris in ipsum nec mi malesuada tempor. Suspendisse
                      malesuada erat vitae hendrerit eleifend. Aenean fermentum
                      pretium dui ut scelerisque. Nunc vitae sem libero.
                    </p>
                  </Target>
                  <p>
                    Nunc tortor ipsum, bibendum at blandit nec, eleifend in
                    nulla. Phasellus rhoncus consectetur varius. Morbi augue ex,
                    dapibus nec nulla eget, dapibus vehicula ipsum. Donec quam
                    nisi, semper vel diam id, consequat tempor leo. Phasellus
                    dapibus egestas nisi at sodales. Phasellus id justo
                    dignissim, rutrum mi eget, imperdiet nisi. Interdum et
                    malesuada fames ac ante ipsum primis in faucibus.
                  </p>
                  <p>
                    Praesent justo ligula, malesuada sit amet maximus nec,
                    pharetra sed velit. Sed eget sem a tortor semper dapibus in
                    in nisl. Praesent vulputate commodo diam, id accumsan leo
                    ullamcorper eu. Aliquam erat volutpat. Donec interdum libero
                    tortor, sit amet suscipit felis molestie eget. Nam sit amet
                    velit non nibh convallis suscipit. Nulla bibendum feugiat
                    ex, sit amet sagittis enim vulputate sed. Ut sed pretium
                    ipsum. Aenean sit amet libero vulputate lacus gravida
                    interdum quis sed magna. Praesent tristique, justo nec
                    tristique pretium, lectus metus faucibus eros, eget
                    tristique odio arcu eu est. Donec sed suscipit ex.
                    Pellentesque id tincidunt purus, id ornare felis. Cras
                    faucibus, lectus sit amet maximus iaculis, massa mauris
                    vehicula leo, quis ultricies est diam nec velit. Vivamus at
                    maximus nisi. Sed tellus ante, porttitor quis lectus
                    pharetra, pharetra sagittis arcu. Sed nisl velit, porta nec
                    vestibulum et, viverra eget ipsum. Donec efficitur sit amet
                    tortor posuere ultricies. Sed pretium nunc ligula, ac
                    iaculis est sollicitudin ac.
                  </p>
                  <p class="mb-0">
                    Suspendisse hendrerit justo justo, vel cursus risus
                    efficitur id. Cras nec sodales massa. Praesent vel tincidunt
                    sem, volutpat ullamcorper turpis. Aliquam vestibulum, sem ut
                    suscipit faucibus, tortor justo ullamcorper leo, at laoreet
                    mi mi at velit. Etiam scelerisque sapien eget orci luctus,
                    faucibus vestibulum nisl fringilla. Mauris placerat
                    venenatis urna id lacinia. Aenean vitae velit pretium, porta
                    ligula a, scelerisque justo. Duis accumsan mauris risus, id
                    interdum ligula aliquam non. In id elit dolor. Sed convallis
                    vulputate arcu sit amet cursus. In tristique lacus est, non
                    tincidunt orci tempus eget.
                  </p>
                </:default>
                <:content as |Content|>
                  <Content.Header>
                    Fusce euismod
                  </Content.Header>
                  <Content.Body>
                    Suspendisse fermentum enim vitae urna porta, rutrum lobortis
                    massa aliquet. Nullam fringilla consectetur enim, non
                    volutpat lorem scelerisque ac. Ut dignissim, massa ac
                    eleifend fermentum, dolor neque viverra ex, ut iaculis
                    sapien ex vitae justo. Duis eleifend nulla ex, sit amet
                    dignissim odio auctor sit amet. Nulla elementum mattis urna
                    in feugiat. Mauris porttitor sit amet nisl ut auctor. Duis
                    in scelerisque metus. Mauris fringilla tortor quis ante
                    commodo, a porta libero ultricies. Integer feugiat augue et
                    ligula iaculis, eu pharetra tortor accumsan. Ut consectetur
                    lorem placerat, consequat sapien id, egestas sapien. Duis
                    bibendum nisl at mauris tristique congue. Pellentesque sed
                    felis tempor, vulputate libero ac, rhoncus lacus.
                  </Content.Body>
                </:content>
              </Tooltip>
            </div>
          </:example>
          <:api as |Args|>
            <Args.String
              @name="alignment"
              @description="How to align the tooltip"
              @value={{this.alignment}}
              @options={{array "" "start" "end"}}
              @onInput={{fn this.update "alignment"}}
            />
            <Args.Number
              @name="offset"
              @description="How far to offset the tooltip from the target (in pixels)"
              @value={{this.offset}}
              @onInput={{fn this.update "offset"}}
            />
            <Args.String
              @name="side"
              @defaultValue="bottom"
              @description="Which side of the control to show the tooltip"
              @value={{this.side}}
              @options={{array "" "top" "end" "bottom" "start"}}
              @onInput={{fn this.update "side"}}
            />
            <Args.Action
              @name="onShow"
              @description="Fired when the tooltip is shown"
            >
              <CodeBlock @lang="typescript" @code="() => Promise<void>" />
            </Args.Action>
            <Args.Action
              @name="onHide"
              @description="Fired when the tooltip is hidden"
            >
              <CodeBlock @lang="typescript" @code="() => Promise<void>" />
            </Args.Action>
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}
