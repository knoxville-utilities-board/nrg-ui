import Component from '@glimmer/component';

export default class Header extends Component {
  iconClasses = this.args.iconClasses || '';
  titleClasses = this.args.titleClasses || '';
  navClasses = this.args.navClasses || '';

  constructor() {
    super(...arguments);
  }
}
