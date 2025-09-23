import { concat, fn } from '@ember/helper';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { t } from 'ember-intl';
import { eq } from 'ember-truth-helpers';

import ButtonGroup from './button-group.gts';
import { classes } from '../helpers/classes.ts';
import { themeIcons } from '../services/theme.ts';

import type { Theme } from '../index.ts';
import type ThemeService from '../services/theme.ts';

export interface ThemeControlSignature {
  Element: HTMLDivElement;
  Args: {
    onChange?: (theme: Theme) => void;
  };
}

export default class ThemeControl extends Component<ThemeControlSignature> {
  @service
  declare theme: ThemeService;

  onChange = (theme: Theme) => {
    if (theme === this.theme.value) {
      return;
    }

    this.theme.setTheme(theme);
    this.args.onChange?.(theme);
  };

  <template>
    <ButtonGroup @label={{t "nrg.base.theme.label"}} ...attributes as |Group|>
      {{#each-in themeIcons as |theme icon|}}
        {{#let (eq this.theme.value theme) as |isActive|}}
          <Group.Button
            aria-label={{t (concat "nrg.base.theme." theme)}}
            aria-pressed="{{isActive}}"
            class={{classes "btn-outline-secondary" (if isActive "active")}}
            title={{t (concat "nrg.base.theme." theme)}}
            @icon={{icon}}
            @iconPosition="center"
            @onClick={{fn this.onChange theme}}
          />
        {{/let}}
      {{/each-in}}
    </ButtonGroup>
  </template>
}
