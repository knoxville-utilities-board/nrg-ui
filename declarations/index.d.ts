export interface TagOptions {
    /**
     * - If `true`, always append the shortened commit hash to the tag
     * - If `false`, never append the commit hash to the tag
     * - If `null`, append the commit hash only if the tag has additional commits
     *
     * @default null
     */
    appendCommitHash: boolean | null;
    /**
     * If provided, this prefix will be appended to the tag before returning it.
     *
     * @default 'v'
     */
    prefix: string | null;
    /**
     * Sometimes, tags have additional metadata that isn't related to the version.
     * For example, a tag in this repository is named `v0.31.0-@nrg-ui/core`. In
     * this case, the tag pattern can be used to extract just the version part.
     *
     * It must have exactly one capturing group that captures the version string.
     * For the above tag, the pattern would be `/^v?(.+)(?:-@.*)$/`.
     *
     * Note that this pattern is used in two places:
     *
     * 1. If multiple tags exist, to determine which tag to use via `pattern.test`
     *    1. If a pattern is not provided,
     * 2. To extract the version from the tag
     *
     * @default /(\d+\.\d+\.\d+)/
     */
    tagPattern: RegExp;
}
export interface TagInfo {
    tag: string;
    commit: string;
    count: number;
    displayTag: string;
}
export declare function getPackageVersion(fallback?: string): string;
export declare function getTagDetails(options?: Partial<TagOptions>): TagInfo | null;
export declare function getTag(options?: Partial<TagOptions>): string | null;
export declare function getBranch(): string;
export declare function getCommitHash(): string;
export declare function getVersion(options?: Partial<TagOptions>, fallback?: string): string;
