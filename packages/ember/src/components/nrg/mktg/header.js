import Component from '@glimmer/component';

export default class Header extends Component {
  get titleClassList() {
    let classes = ['col', 'd-flex', 'justify-content-center', 'flex-row'];

    if (this.args.titleClasses) {
      typeof this.args.titleClasses === 'string'
        ? classes.push(...this.args.titleClasses.split(' '))
        : classes.push(...this.args.titleClasses);
    }
    return classes.join(' ');
  }

  get brandClassList() {
    let classes = ['col-2', 'd-flex'];

    if (this.args.brandClasses) {
      typeof this.args.brandClasses === 'string'
        ? classes.push(...this.args.brandClasses.split(' '))
        : classes.push(...this.args.brandClasses);
    }
    return classes.join(' ');
  }

  get navClassList() {
    let classes = ['col-2', 'd-flex'];

    if (this.args.navClasses) {
      typeof this.args.navClasses === 'string'
        ? classes.push(...this.args.navClasses.split(' '))
        : classes.push(...this.args.navClasses);
    }
    return classes.join(' ');
  }
}
