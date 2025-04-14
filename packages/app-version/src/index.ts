import { spawnSync } from 'child_process';
import { readFileSync } from 'fs';
import { join } from 'path';

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
   * @default undefined
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
   * @default undefined
   */
  tagPattern: RegExp;
}

export interface TagInfo {
  tag: string;
  commit: string;
  count: number;
  displayTag: string;
}

export function getPackageVersion(defaultValue?: string) {
  const pkg = JSON.parse(
    readFileSync(join(process.cwd(), 'package.json'), 'utf-8'),
  );

  return pkg.version ?? defaultValue;
}

function git(args: string[]): string {
  const result = spawnSync('git', args, {
    encoding: 'utf-8',
    stdio: 'pipe',
  });

  if (result.error) {
    throw new Error(`Git command failed: ${result.error.message}`);
  }

  if (result.stderr) {
    throw new Error(`Git command error: ${result.stderr.trim()}`);
  }

  return result.stdout.trim();
}

const defaultTagOptions: TagOptions = {
  appendCommitHash: null,
  prefix: null,
  tagPattern: /^.*$/,
};

export function getTag(options: Partial<TagOptions> = {}): TagInfo | null {
  const { appendCommitHash, prefix, tagPattern } = {
    ...defaultTagOptions,
    ...options,
  };

  const latestTag = git(['describe', '--tags', '--abbrev=0']);
  const tagCommit = git(['rev-list', '-n', '1', latestTag]);
  const allTags = git(['tag', '--points-at', tagCommit]).split('\n');
  const tagInfo = allTags
    .filter((tag) => tagPattern.test(tag))
    .map((tag) => {
      const commit = git(['rev-list', '-n', '1', tag]);
      const count = parseInt(git(['rev-list', '--count', `${tag}..HEAD`]));
      let version = tagPattern.exec(tag)?.[1] ?? tag;

      if (prefix) {
        version = `${prefix}${version}`;
      }

      if (
        appendCommitHash === true ||
        (appendCommitHash === null && count !== 0)
      ) {
        version += '-g' + commit.slice(0, 7);
      }

      return {
        tag,
        commit,
        count,
        displayTag: version,
      };
    }) as TagInfo[];

  return tagInfo[0];
}

export function getVersion() {
  let version;

  const tagInfo = getTag({
    prefix: 'v',
    tagPattern: /^v?(\d+\.\d+\.\d+)/,
  });

  if (tagInfo) {
    version = tagInfo.displayTag;
  }

  return version ?? getPackageVersion();
}
