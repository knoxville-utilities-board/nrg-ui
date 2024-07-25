import Component from '@glimmer/component';

interface FooterSignature {
  Element: HTMLElement;
  Blocks: {
    left?: [];
    right?: [];
    default?: [];
  };
}

export default class Footer extends Component<FooterSignature> {
  get className() {
    let classes = [
      'bg-body-secondary',
      'border-top',
      'border-2',
      'border-dark-subtle',
      'mt-auto',
    ];

    return classes.join(' ');
  }

  <template>
    <footer class={{this.className}} ...attributes>
      <div class="container-fluid py-2 px-4">
        <div
          class="row row-cols-auto justify-content-between align-content-center"
        >
          <div class="col row row-cols-auto align-content-center">
            {{yield to="left"}}
          </div>
          <div class="col row row-cols-auto align-content-center">
            {{yield to="right"}}
          </div>
        </div>
      </div>
    </footer>
  </template>
}
