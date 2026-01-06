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

export function getPackageVersion(fallback?: string) {
  const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8'));

  return (pkg.version ?? fallback) as string;
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
  prefix: 'v',
  tagPattern: /(\d+\.\d+\.\d+)/,
};

export function getTagDetails(options: Partial<TagOptions> = {}): TagInfo | null {
  const { appendCommitHash, prefix, tagPattern } = {
    ...defaultTagOptions,
    ...options,
  };

  let latestTag: string | null = null;
  if (tagPattern) {
    const allTags = git(['tag', '--sort=tag', '--sort=-committerdate', '--merged']);
    latestTag = allTags.split('\n').find((tag) => tagPattern.test(tag)) ?? null;
  }

  if (!latestTag) {
    latestTag = git(['describe', '--tags', '--abbrev=0']);
  }

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

      if (appendCommitHash === true || (appendCommitHash === null && count !== 0)) {
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

export function getTag(options: Partial<TagOptions> = {}): string | null {
  const tagInfo = getTagDetails(options);

  if (!tagInfo) {
    return null;
  }

  return tagInfo.displayTag;
}

export function getBranch() {
  return git(['branch', '--show-current']);
}

export function getCommitHash() {
  return git(['rev-parse', 'HEAD']);
}

export function getVersion(
  options: Partial<TagOptions> = defaultTagOptions,
  fallback?: string,
): string {
  let version;

  try {
    version = getTag(options);
  } catch {
    // Ignore
  }

  if (!version) {
    try {
      version = getBranch();
    } catch {
      // Ignore
    }

    if (!version) {
      try {
        version = getCommitHash();
      } catch {
        // Ignore
      }
    }
  }

  if (!version) {
    version = getPackageVersion(fallback);
  }

  return version;
}
