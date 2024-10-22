declare global {
  type SeverityOff = 'off' | 0;
  type SeverityWarn = 'warn' | 1;
  type SeverityError = 'error' | 2;
  type SeverityValue = SeverityOff | SeverityWarn | SeverityError;

  type RuleEnforcement = 'always' | 'never';
  type RuleOptions =
    | SeverityValue
    | [SeverityValue, Record<string, unknown>]
    | [SeverityValue, RuleEnforcement, Record<string, unknown>];

  type Rule = Record<string, RuleOptions>;

  interface ConfigurationObject {
    name: string;
    files?: string[];
    ignores?: string[];
    languageOptions?: {
      ecmaVersion?: string;
      sourceType?: 'module' | 'script' | 'commonjs';
      globals?: Record<string, unknown>;
      parser?: unknown;
      parserOptions?: Record<string, unknown>;
    };
    linterOptions?: {
      noInlineConfig?: boolean;
      reportUnusedDisableDirectives?: boolean;
    };
    processor?:
      | {
          preprocess: (...args: unknown[]) => unknown;
          postprocess: (...args: unknown[]) => unknown;
        }
      | string;
    plugins?: Record<string, unknown>;
    rules?: Record<string, RuleOptions>;
    settings?: Record<string, unknown>;
  }

  type ConfigurationOptions = Partial<ConfigurationObject>;

  interface BuilderNamespace {
    ignore: (files: string[]) => ConfigurationObject[];
    base: (rules?: Record<string, RuleOptions>) => Promise<ConfigurationObject[]>;
    ember: (rules?: Record<string, RuleOptions>) => Promise<ConfigurationObject[]>;
    js: (rules?: Record<string, RuleOptions>) => Promise<ConfigurationObject[]>;
    ts: (rules?: Record<string, RuleOptions>) => Promise<ConfigurationObject[]>;
    gjs: (rules?: Record<string, RuleOptions>) => Promise<ConfigurationObject[]>;
    gts: (rules?: Record<string, RuleOptions>) => Promise<ConfigurationObject[]>;
    scripts: (globs: string[], rules?: Record<string, RuleOptions>) => Promise<ConfigurationObject[]>;
    custom: (name: string, config: ConfigurationOptions) => Promise<ConfigurationObject[]>;
  }
}

export {};
