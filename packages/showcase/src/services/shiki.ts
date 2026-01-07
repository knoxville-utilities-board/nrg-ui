import { assert } from '@ember/debug';
import Service from '@ember/service';
import { getOwnConfig } from '@embroider/macros';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';
import { createOnigurumaEngine, hastToHtml } from 'shiki';
import { createHighlighterCore } from 'shiki/core';
import { bundledLanguages } from 'shiki/langs';
import { bundledThemes } from 'shiki/themes';

import type { Element } from 'hast';
import type { BundledLanguage, BundledTheme, CodeToHastOptions, HighlighterCore } from 'shiki';

export type AllowedLanguage = BundledLanguage | 'glimmer-template' | 'plaintext';

const lightThemes = getOwnConfig()?.themes?.light ?? ['github-light'];
const darkThemes = getOwnConfig()?.themes?.dark ?? ['github-dark'];
const languages = getOwnConfig()?.languages ?? [
  'typescript',
  'javascript',
  'json',
  'css',
  'html',
  'glimmer-js',
  'glimmer-ts',
];

assert(
  'Light themes must be a non-empty array',
  Array.isArray(lightThemes) && lightThemes.length > 0,
);
assert('Dark themes must be a non-empty array', Array.isArray(darkThemes) && darkThemes.length > 0);
assert('Languages must be a non-empty array', Array.isArray(languages) && languages.length > 0);

export interface ShikiServiceOptions {
  defaultLightTheme?: BundledTheme;
  defaultDarkTheme?: BundledTheme;
  cssVariablePrefix?: string;
}

export interface HighlightedCode {
  html: string;
  isRendered: boolean;
  background: {
    light: string;
    dark: string;
  };
}

const DEFAULT_CSS_VARIABLE_PREFIX = '--shiki-';

export default class ShikiService extends Service {
  highlighter?: HighlighterCore;

  @tracked
  loadedThemes?: BundledTheme[];

  @tracked
  declare defaultLightTheme: BundledTheme;

  @tracked
  declare defaultDarkTheme: BundledTheme;

  @tracked
  cssVariablePrefix = DEFAULT_CSS_VARIABLE_PREFIX;

  initialize = task(async (options: ShikiServiceOptions = {}) => {
    if (this.highlighter) {
      this.highlighter.dispose();
    }

    this.loadedThemes = [];
    const allThemes = [...lightThemes, ...darkThemes];

    this.defaultLightTheme = options.defaultLightTheme ?? lightThemes[0]!;
    this.defaultDarkTheme = options.defaultDarkTheme ?? darkThemes[0]!;

    const langPromises = languages.map((lang) => bundledLanguages[lang]());
    const themePromises = allThemes.map((theme) => bundledThemes[theme]());

    this.highlighter = await createHighlighterCore({
      langs: await Promise.all(langPromises),
      themes: await Promise.all(themePromises),
      engine: createOnigurumaEngine(await import('shiki/wasm')),
    });

    this.loadedThemes = allThemes;
    this.cssVariablePrefix = options.cssVariablePrefix ?? DEFAULT_CSS_VARIABLE_PREFIX;
  });

  highlight(
    code: string,
    lang: AllowedLanguage,
    options?: Partial<CodeToHastOptions>,
  ): HighlightedCode {
    const { highlighter, cssVariablePrefix } = this;
    if (!highlighter) {
      return {
        isRendered: false,
        html: code,
        background: {
          light: 'transparent',
          dark: 'transparent',
        },
      };
    }

    let lightTheme: BundledTheme | 'none' = this.defaultLightTheme;
    let darkTheme: BundledTheme | 'none' = this.defaultDarkTheme;

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
        dark: darkTheme,
      },
      ...options,
    });

    const root = hast.children[0] as Element;
    const style = (root.properties?.['style'] as string) ?? '';
    root.properties['class'] += ' code-block';

    const html = hastToHtml(hast);

    return {
      isRendered: true,
      html,
      background: {
        light: this.extractBackgroundColor(style, 'light'),
        dark: this.extractBackgroundColor(style, 'dark'),
      },
    };
  }

  extractBackgroundColor(style: string, theme: 'light' | 'dark'): string {
    const match = new RegExp(`${this.cssVariablePrefix}${theme}-bg:([^;]+)`).exec(style);

    return match?.[1] ?? 'transparent';
  }
}
