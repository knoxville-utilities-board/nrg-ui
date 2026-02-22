import { buildTask } from 'ember-concurrency/async-arrow-runtime';
import { assert } from '@ember/debug';
import Service from '@ember/service';
import { getOwnConfig } from '@embroider/macros';
import { tracked } from '@glimmer/tracking';
import { createOnigurumaEngine, hastToHtml } from 'shiki';
import { createHighlighterCore } from 'shiki/core';
import { bundledLanguages } from 'shiki/langs';
import { bundledThemes } from 'shiki/themes';
import { g, i } from 'decorator-transforms/runtime';

const lightThemes = getOwnConfig()?.themes?.light ?? ['github-light'];
const darkThemes = getOwnConfig()?.themes?.dark ?? ['github-dark'];
const languages = getOwnConfig()?.languages ?? ['typescript', 'javascript', 'json', 'css', 'html', 'glimmer-js', 'glimmer-ts'];
assert('Light themes must be a non-empty array', Array.isArray(lightThemes) && lightThemes.length > 0);
assert('Dark themes must be a non-empty array', Array.isArray(darkThemes) && darkThemes.length > 0);
assert('Languages must be a non-empty array', Array.isArray(languages) && languages.length > 0);
const DEFAULT_CSS_VARIABLE_PREFIX = '--shiki-';
class ShikiService extends Service {
  highlighter;
  static {
    g(this.prototype, "loadedThemes", [tracked]);
  }
  #loadedThemes = (i(this, "loadedThemes"), void 0);
  static {
    g(this.prototype, "defaultLightTheme", [tracked]);
  }
  #defaultLightTheme = (i(this, "defaultLightTheme"), void 0);
  static {
    g(this.prototype, "defaultDarkTheme", [tracked]);
  }
  #defaultDarkTheme = (i(this, "defaultDarkTheme"), void 0);
  static {
    g(this.prototype, "cssVariablePrefix", [tracked], function () {
      return DEFAULT_CSS_VARIABLE_PREFIX;
    });
  }
  #cssVariablePrefix = (i(this, "cssVariablePrefix"), void 0);
  initialize = buildTask(() => ({
    context: this,
    generator: function* (options = {}) {
      if (this.highlighter) {
        this.highlighter.dispose();
      }
      this.loadedThemes = [];
      const allThemes = [...lightThemes, ...darkThemes];
      this.defaultLightTheme = options.defaultLightTheme ?? lightThemes[0];
      this.defaultDarkTheme = options.defaultDarkTheme ?? darkThemes[0];
      const langPromises = languages.map(lang => bundledLanguages[lang]());
      const themePromises = allThemes.map(theme => bundledThemes[theme]());
      this.highlighter = yield createHighlighterCore({
        langs: yield Promise.all(langPromises),
        themes: yield Promise.all(themePromises),
        engine: createOnigurumaEngine(yield import('shiki/wasm'))
      });
      this.loadedThemes = allThemes;
      this.cssVariablePrefix = options.cssVariablePrefix ?? DEFAULT_CSS_VARIABLE_PREFIX;
    }
  }), null, "initialize", null);
  highlight(code, lang, options) {
    const {
      highlighter,
      cssVariablePrefix
    } = this;
    if (!highlighter) {
      return {
        isRendered: false,
        html: code,
        background: {
          light: 'transparent',
          dark: 'transparent'
        }
      };
    }
    let lightTheme = this.defaultLightTheme;
    let darkTheme = this.defaultDarkTheme;
    if (!this.loadedThemes?.includes(lightTheme)) {
      lightTheme = 'none';
    }
    if (!this.loadedThemes?.includes(darkTheme)) {
      darkTheme = 'none';
    }
    if (lang === 'glimmer-template') {
      options ??= {};
      lang = 'glimmer-js';
      options.grammarContextCode = '<template>';
    }
    const hast = highlighter.codeToHast(code, {
      cssVariablePrefix,
      defaultColor: false,
      lang,
      themes: {
        light: lightTheme,
        dark: darkTheme
      },
      ...options
    });
    const root = hast.children[0];
    const style = root.properties?.['style'] ?? '';
    root.properties['class'] += ' code-block';
    const html = hastToHtml(hast);
    return {
      isRendered: true,
      html,
      background: {
        light: this.extractBackgroundColor(style, 'light'),
        dark: this.extractBackgroundColor(style, 'dark')
      }
    };
  }
  extractBackgroundColor(style, theme) {
    const match = new RegExp(`${this.cssVariablePrefix}${theme}-bg:([^;]+)`).exec(style);
    return match?.[1] ?? 'transparent';
  }
}

export { ShikiService as default };
//# sourceMappingURL=shiki.js.map
