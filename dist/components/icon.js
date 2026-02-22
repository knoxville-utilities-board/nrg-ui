import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class Icon extends Component {
  get color() {
    return this.args.color || 'reset';
  }
  get backgroundColor() {
    if (this.args.backgroundColor) {
      return this.args.backgroundColor;
    }
    if (!this.args.color) {
      return 'transparent';
    }
    return `${this.args.color}-subtle`;
  }
  get fontSizeClass() {
    return `fs-${this.args.size ?? '2'}`;
  }
  get classList() {
    const classes = ['d-flex', 'justify-content-center', this.fontSizeClass];
    if (this.args.circular) {
      classes.push('rounded-circle', 'p-3', `bg-${this.backgroundColor}`);
    }
    return classes.join(' ');
  }
  static {
    setComponentTemplate(precompileTemplate("<div class=\"d-flex\" ...attributes>\n  <div class={{this.classList}}>\n    <i class=\"bi {{@type}} text-{{this.color}}\" />\n  </div>\n</div>", {
      strictMode: true
    }), this);
  }
}

export { Icon as default };
//# sourceMappingURL=icon.js.map
