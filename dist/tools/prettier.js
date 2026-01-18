export async function html() {
    return {
        files: ['*.html', '*.htm', '*.hbs'],
        options: {
            singleQuote: false,
            parser: 'glimmer',
        },
    };
}
export async function css() {
    return {
        files: ['*.css', '*.scss', '*.sass', '*.less'],
        options: {
            singleQuote: false,
        },
    };
}
export async function java() {
    return {
        files: ['*.java'],
        options: {
            singleQuote: false,
        },
    };
}
export async function md() {
    return {
        files: ['*.md'],
        options: {
            singleQuote: false,
        },
    };
}
export async function ember() {
    return {
        files: ['*.gjs', '*.gts'],
        options: {
            templateSingleQuote: false,
            parser: 'ember-template-tag',
            plugins: ['prettier-plugin-ember-template-tag'],
        },
    };
}
export async function tsql() {
    return {
        files: ['*.sql'],
        options: {
            language: 'transactsql',
            keywordCase: 'upper',
            paramTypes: JSON.stringify({
                numbered: ['?'],
            }),
        },
    };
}
export async function prettier(...rulesets) {
    const resolvedRulesets = await Promise.all(rulesets);
    const config = {
        plugins: [],
        overrides: [],
        singleQuote: true,
        printWidth: 100,
    };
    for (const ruleset of resolvedRulesets) {
        if (ruleset.options?.plugins) {
            for (const plugin of ruleset.options.plugins) {
                if (!config.plugins?.includes(plugin)) {
                    config.plugins?.push(plugin);
                }
            }
            delete ruleset.options.plugins;
        }
        config.overrides?.push(ruleset);
    }
    return config;
}
export const builder = {
    /**
     * Builder for the base Prettier configuration object.
     */
    config: prettier,
    /**
     * Rules for HTML files.
     */
    html,
    /**
     * Rules for CSS, SCSS, SASS, and LESS files.
     */
    css,
    /**
     * Rules for Java files.
     */
    java,
    /**
     * Rules for Markdown files.
     */
    md,
    /**
     * Rules for Ember.js template tag files.
     */
    ember,
    /**
     * Rules for T-SQL files.
     */
    tsql,
};
export default builder;
