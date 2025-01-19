import { readFileSync } from 'fs';
import getGitInfo from 'git-repo-info';
import { join } from 'path';

export interface VersionOptions {
  /**
   * The version to use if no version can be found.
   */
  defaultVersion?: string;
  /**
   * The path to the git directory.
   */
  gitDirectory?: string;
  /**
   * Include the prefix `v` in the version.
   */
  includePrefix?: boolean;
  /**
   * Append the latest commit sha to the version.
   */
  includeSha?: boolean;
  /**
   * The length of the sha to include.
   */
  shaLength?: number;
}

export function getPackageVersion(defaultValue?: string) {
  const pkg = JSON.parse(
    readFileSync(join(process.cwd(), 'package.json'), 'utf-8'),
  );

  return pkg.version ?? defaultValue;
}

export function getVersion(options?: VersionOptions): string {
  const defaultVersion = options?.defaultVersion ?? getPackageVersion();
  const includeSha = options?.includeSha ?? false;
  const includePrefix = options?.includePrefix ?? false;
  const gitDirectory = options?.gitDirectory ?? process.cwd();

  const gitInfo = getGitInfo(gitDirectory);

  if (!gitInfo) {
    throw new Error('Unable to determine Git information');
  }

  let root: string = defaultVersion;
  let sha: string = '';

  if (gitInfo.tag && !(root && gitInfo.tag.includes(root))) {
    root = gitInfo.tag;
  } else if (gitInfo.branch) {
    root = gitInfo.branch;
  } else {
    root = 'HEAD';
  }

  if (includePrefix) {
    root = `v${root}`;
  }

  if (includeSha) {
    const shaLength = options?.shaLength ?? 7;

    sha = `+${gitInfo.sha.slice(0, shaLength)}`;
  }

  return (root + sha) || defaultVersion;
}
