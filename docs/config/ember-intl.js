module.exports = function (/* environment */) {
  return {
    /**
     * Merges the fallback locale's translations into all other locales as a
     * build-time fallback strategy.
     *
     * This will **not** prevent missing translation warnings or errors from occurring.
     * It's meant as safety net when warnings are enabled.
     * When enabled along with `errorOnMissingTranslations` any fallback attempts will result in an error.
     *
     * @property fallbackLocale
     * @type {String?}
     * @default "null"
     */
    fallbackLocale: null,

    /**
     * Path where translations are stored.  This is relative to the project root.
     * For example, if your translations are an npm dependency, set this to:
     *`'./node_modules/path/to/translations'`
     *
     * @property inputPath
     * @type {String}
     * @default "'translations'"
     */
    inputPath: 'translations',

    /**
     * Prevents the translations from being bundled with the application code.
     * This enables asynchronously loading the translations for the active locale
     * by fetching them from the asset folder of the build.
     *
     * See: https://ember-intl.github.io/ember-intl/docs/guide/asynchronously-loading-translations
     *
     * @property publicOnly
     * @type {Boolean}
     * @default "false"
     */
    publicOnly: false,

    /**
     * Add the subdirectories of the translations as a namespace for all keys.
     *
     * @property wrapTranslationsWithNamespace
     * @type {Boolean}
     * @default "false"
     */
    wrapTranslationsWithNamespace: true,
  };
};
