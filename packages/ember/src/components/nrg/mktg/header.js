import Component from '@glimmer/component';

export default class HeaderComponent extends Component {
  icon = this.args.icon || null;
  title = this.args.title || '';
  options = this.args.options || null;
  navButtons = this.args.navButtons || false;
  previousButtonDisabled = this.args.previousButtonDisabled || '';
  nextButtonDisabled = this.args.nextButtonDisabled || '';

  constructor() {
    super(...arguments);
  }
}
