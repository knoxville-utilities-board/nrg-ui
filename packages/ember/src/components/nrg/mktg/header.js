import Component from '@glimmer/component';

export default class MarketingHeaderComponent extends Component {
  icon = this.args.icon;
  title = this.args.title;
  options = this.args.options;
  previousButton = this.args.previousButton;
  nextButton = this.args.nextButton;

  constructor() {
    super(...arguments);
  }
}
