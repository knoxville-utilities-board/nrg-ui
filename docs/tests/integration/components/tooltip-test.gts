import { render, triggerEvent } from '@ember/test-helpers';
import BaseTooltip from '@nrg-ui/core/components/tooltip';
import { setupRenderingTest } from 'docs/tests/helpers';
import { module, test } from 'qunit';

import type { TOC } from '@ember/component/template-only';

interface TooltipSignature {
  Args: {
    onShow: () => unknown;
    onHide: () => unknown;
  };
}

const Tooltip: TOC<TooltipSignature> = <template>
  <BaseTooltip @onShow={{@onShow}} @onHide={{@onHide}}>
    <:default as |Target|>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat
        cursus dui ut vestibulum. Duis sit amet accumsan quam. Sed pharetra
        augue ex, eget sodales sapien auctor sed. Maecenas sagittis tellus nunc,
        vel blandit lectus convallis sit amet. Quisque vitae sem in purus
        imperdiet placerat rhoncus id tellus. Nunc dignissim libero a nisl
        bibendum faucibus. Duis dictum nec nisi nec ullamcorper. Duis pretium
        nec arcu id accumsan. Pellentesque consequat, dolor a dignissim
        porttitor, lacus nunc sodales risus, a lacinia odio quam a libero.
      </p>
      <Target>
        <p>
          Etiam aliquet sollicitudin est ut feugiat. Nunc facilisis ac diam id
          aliquet. In quis vestibulum metus. Duis imperdiet urna sit amet nulla
          finibus imperdiet. Nunc laoreet dictum viverra. Phasellus quis sapien
          mattis, eleifend odio a, suscipit lorem. Morbi arcu lectus, aliquet ac
          vehicula eget, luctus eget nunc. Mauris finibus sodales libero, in
          auctor nulla consequat ac. Maecenas fermentum leo id aliquam
          tristique. Vestibulum fermentum commodo erat. Etiam dictum urna vel
          porttitor laoreet. Mauris in ipsum nec mi malesuada tempor.
          Suspendisse malesuada erat vitae hendrerit eleifend. Aenean fermentum
          pretium dui ut scelerisque. Nunc vitae sem libero.
        </p>
      </Target>
      <p>
        Nunc tortor ipsum, bibendum at blandit nec, eleifend in nulla. Phasellus
        rhoncus consectetur varius. Morbi augue ex, dapibus nec nulla eget,
        dapibus vehicula ipsum. Donec quam nisi, semper vel diam id, consequat
        tempor leo. Phasellus dapibus egestas nisi at sodales. Phasellus id
        justo dignissim, rutrum mi eget, imperdiet nisi. Interdum et malesuada
        fames ac ante ipsum primis in faucibus.
      </p>
      <p>
        Praesent justo ligula, malesuada sit amet maximus nec, pharetra sed
        velit. Sed eget sem a tortor semper dapibus in in nisl. Praesent
        vulputate commodo diam, id accumsan leo ullamcorper eu. Aliquam erat
        volutpat. Donec interdum libero tortor, sit amet suscipit felis molestie
        eget. Nam sit amet velit non nibh convallis suscipit. Nulla bibendum
        feugiat ex, sit amet sagittis enim vulputate sed. Ut sed pretium ipsum.
        Aenean sit amet libero vulputate lacus gravida interdum quis sed magna.
        Praesent tristique, justo nec tristique pretium, lectus metus faucibus
        eros, eget tristique odio arcu eu est. Donec sed suscipit ex.
        Pellentesque id tincidunt purus, id ornare felis. Cras faucibus, lectus
        sit amet maximus iaculis, massa mauris vehicula leo, quis ultricies est
        diam nec velit. Vivamus at maximus nisi. Sed tellus ante, porttitor quis
        lectus pharetra, pharetra sagittis arcu. Sed nisl velit, porta nec
        vestibulum et, viverra eget ipsum. Donec efficitur sit amet tortor
        posuere ultricies. Sed pretium nunc ligula, ac iaculis est sollicitudin
        ac.
      </p>
      <p>
        Suspendisse hendrerit justo justo, vel cursus risus efficitur id. Cras
        nec sodales massa. Praesent vel tincidunt sem, volutpat ullamcorper
        turpis. Aliquam vestibulum, sem ut suscipit faucibus, tortor justo
        ullamcorper leo, at laoreet mi mi at velit. Etiam scelerisque sapien
        eget orci luctus, faucibus vestibulum nisl fringilla. Mauris placerat
        venenatis urna id lacinia. Aenean vitae velit pretium, porta ligula a,
        scelerisque justo. Duis accumsan mauris risus, id interdum ligula
        aliquam non. In id elit dolor. Sed convallis vulputate arcu sit amet
        cursus. In tristique lacus est, non tincidunt orci tempus eget.
      </p>
    </:default>
    <:content as |Content|>
      <Content.Header>
        Fusce euismod
      </Content.Header>
      <Content.Body>
        Suspendisse fermentum enim vitae urna porta, rutrum lobortis massa
        aliquet. Nullam fringilla consectetur enim, non volutpat lorem
        scelerisque ac. Ut dignissim, massa ac eleifend fermentum, dolor neque
        viverra ex, ut iaculis sapien ex vitae justo. Duis eleifend nulla ex,
        sit amet dignissim odio auctor sit amet. Nulla elementum mattis urna in
        feugiat. Mauris porttitor sit amet nisl ut auctor. Duis in scelerisque
        metus. Mauris fringilla tortor quis ante commodo, a porta libero
        ultricies. Integer feugiat augue et ligula iaculis, eu pharetra tortor
        accumsan. Ut consectetur lorem placerat, consequat sapien id, egestas
        sapien. Duis bibendum nisl at mauris tristique congue. Pellentesque sed
        felis tempor, vulputate libero ac, rhoncus lacus.
      </Content.Body>
    </:content>
  </BaseTooltip>
</template>;

module('Integration | Component | tooltip', function (hooks) {
  setupRenderingTest(hooks);

  test('it works', async function (assert) {
    const show = () => {
      assert.step('show');
    };

    const hide = () => {
      assert.step('hide');
    };

    await render(<template>
      <Tooltip @onShow={{show}} @onHide={{hide}} />
    </template>);

    assert.dom('.tooltip').hasClass('hidden');

    assert.step('beforeShow');
    await triggerEvent('span:has(> p)', 'mouseenter');
    assert.dom('.tooltip').doesNotHaveClass('hidden');

    assert.step('beforeHide');
    await triggerEvent('span:has(> p)', 'mouseleave');
    assert.dom('.tooltip').hasClass('hidden');

    assert.verifySteps(['beforeShow', 'show', 'beforeHide', 'hide']);
  });
});
