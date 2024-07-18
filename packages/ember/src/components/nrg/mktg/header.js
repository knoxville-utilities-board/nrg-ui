import Component from '@glimmer/component';

export default class Header extends Component {
  iconAlignment = this.args.iconAlignment || '';
  iconAttributes = this.args.iconAttributes || '';
  titleAlignment = this.args.titleAlignment || '';
  titleAttributes = this.args.titleAttributes || '';
  navAlignment = this.args.navAlignment || '';
  navAttributes = this.args.navAttributes || '';

  constructor() {
    super(...arguments);
  }
}
