export default {
  lintRules: {
    /**
     * Various translation keys are constructed dynamically at runtime, so
     * the linter can't statically verify their usage - e.g., the key
     * for themes is `nrg.base.theme.${theme}`, where `theme` is
     * either `auto`, `light`, or `dark`.
     */
    'no-unused-keys': {
      ignores: [
        // Themes
        'nrg.base.theme.auto',
        'nrg.base.theme.light',
        'nrg.base.theme.dark',

        // Datetime keys are dynamic
        'nrg.base.datetime.date',
        'nrg.base.datetime.datetime',
        'nrg.base.datetime.time',

        // Certain validation keys are dynamic
        'nrg.validation.file.application',
        'nrg.validation.file.audio',
        'nrg.validation.file.document',
        'nrg.validation.file.image',
        'nrg.validation.file.text',
        'nrg.validation.file.video',
        'nrg.validation.length.array.between',
        'nrg.validation.length.array.tooLong',
        'nrg.validation.length.array.tooShort',
        'nrg.validation.length.array.wrongLength',
        'nrg.validation.length.string.between',
        'nrg.validation.length.string.tooLong',
        'nrg.validation.length.string.tooShort',
        'nrg.validation.length.string.wrongLength',
        'nrg.validation.regex.doesNotMatch',
        'nrg.validation.regex.match',
      ],
    },
  },
};
