export interface SnippetLocation {
  /**
   * The file in which the snippet is located, relative to
   * the root of the project
   */
  file: string;

  /**
   * The lines in the file where the snippet is located.
   */
  lines: {
    /**
     * The starting line number of the snippet (1-based)
     */
    start: number;

    /**
     * The ending line number of the snippet (1-based)
     */
    end: number;
  };
}

export interface SnippetSource {
  /**
   * The source code of the snippet.
   */
  code: string;

  /**
   * The location of the snippet in the original source code.
   */
  location: SnippetLocation;
}

export interface SnippetEntry {
  /**
   * The unique name of the snippet.
   */
  name: string;

  /**
   * The source code of the snippet. If multiple snippets with the same
   * name are found, they will be concatenated with new lines `\n`.
   */
  code: string;

  /**
   * The sources of the snippet, including the original location in the code.
   */
  sources: SnippetSource[];
}

export interface CodeSnippetsPluginOptions {
  /**
   * Markers are the delimiters used to identify code snippets.
   */
  markers?: {
    /**
     * Marker used to denote the start of a snippet.
     * **Note** that this should include a capturing
     * group for snippet names.
     *
     * Example:
     * ```js
     * /\bBEGIN-SNIPPET\s+(\S+)\b/
     * ```
     */
    start?: RegExp;

    /**
     * Marker used to denote the end of a snippet.
     *
     * Example:
     * ```js
     * /\bEND-SNIPPET\b/
     * ```
     */
    end?: RegExp;
  };

  /**
   * Glob patterns to include.
   * Defaults to `src` and `app` directories.
   */
  include?: string | string[];

  /**
   * Glob patterns to exclude.
   */
  exclude?: string | string[];
}
