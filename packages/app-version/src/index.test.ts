import { afterEach, describe, expect, test, vi } from 'vitest';

import { getBranch, getCommitHash, getTagDetails } from './index.js';

const spawnSync = vi.fn();
vi.mock('child_process', () => {
  return {
    spawnSync(command: string, args: string[]) {
      return {
        stdout: spawnSync(command, args),
      };
    },
  };
});

afterEach(() => {
  vi.resetAllMocks();
});

function mockSingleTag(tagName: string, commitSha: string, count = 4) {
  spawnSync
    .mockImplementationOnce((command: string, args: string[]) => {
      expect(args).toEqual([
        'tag',
        '--sort=tag',
        '--sort=-committerdate',
        '--merged',
      ]);

      return tagName;
    })
    .mockImplementationOnce((command: string, args: string[]) => {
      expect(args).toEqual(['rev-list', '-n', '1', tagName]);

      return commitSha;
    })
    .mockImplementationOnce((command: string, args: string[]) => {
      expect(args).toEqual(['tag', '--points-at', commitSha]);

      return tagName;
    })
    .mockImplementationOnce((command: string, args: string[]) => {
      expect(args).toEqual(['rev-list', '-n', '1', tagName]);

      return commitSha;
    })
    .mockImplementationOnce((command: string, args: string[]) => {
      expect(args).toEqual(['rev-list', '--count', `${tagName}..HEAD`]);

      return String(count);
    });
}

function mockMultipleTags(
  baseTagName: string,
  baseCommitSha: string,
  count = 4,
) {
  spawnSync
    .mockImplementationOnce((command: string, args: string[]) => {
      expect(args).toEqual([
        'tag',
        '--sort=tag',
        '--sort=-committerdate',
        '--merged',
      ]);

      return `${baseTagName}A`;
    })
    .mockImplementationOnce((command: string, args: string[]) => {
      expect(args).toEqual(['rev-list', '-n', '1', `${baseTagName}A`]);

      return `${baseCommitSha}0`;
    })
    .mockImplementationOnce((command: string, args: string[]) => {
      expect(args).toEqual(['tag', '--points-at', `${baseCommitSha}0`]);

      return `${baseTagName}A\n${baseTagName}B`;
    })
    .mockImplementationOnce((command: string, args: string[]) => {
      expect(args).toEqual(['rev-list', '-n', '1', `${baseTagName}A`]);

      return `${baseCommitSha}0`;
    })
    .mockImplementationOnce((command: string, args: string[]) => {
      expect(args).toEqual(['rev-list', '--count', `${baseTagName}A..HEAD`]);

      return String(count);
    })
    .mockImplementationOnce((command: string, args: string[]) => {
      expect(args).toEqual(['rev-list', '-n', '1', `${baseTagName}B`]);

      return `${baseCommitSha}1`;
    })
    .mockImplementationOnce((command: string, args: string[]) => {
      expect(args).toEqual(['rev-list', '--count', `${baseTagName}B..HEAD`]);

      return String(count + 1);
    });
}

describe('getTagDetails', () => {
  test('works with default options, single tag', () => {
    const tagName = 'v12.34.5-alpha.1';
    const commitSha = '1234567890abcdef';

    mockSingleTag(tagName, commitSha);

    const tag = getTagDetails();

    expect(tag).toMatchObject({
      commit: commitSha,
      count: 4,
      displayTag: 'v12.34.5-g1234567',
      tag: tagName,
    });
  });

  test('works with default options, multiple tags', () => {
    const tagName = 'v12.34.5-alpha.';
    const commitSha = '1234567890abcde';

    mockMultipleTags(tagName, commitSha);

    const tag = getTagDetails();

    expect(tag).toMatchObject({
      commit: `${commitSha}0`,
      count: 4,
      displayTag: 'v12.34.5-g1234567',
      tag: `${tagName}A`,
    });
  });

  test('works with custom options, single tag', () => {
    const tagName = 'v12.34.5-@scope/package';
    const commitSha = '1234567890abcde';

    const reset = () => mockSingleTag(tagName, commitSha);

    reset();

    // Test with all options, include commit hash
    let tag = getTagDetails({
      appendCommitHash: true,
      prefix: null,
      tagPattern: /^v?(.+)-@/,
    });

    expect(tag).toMatchObject({
      commit: commitSha,
      count: 4,
      displayTag: '12.34.5-g1234567',
      tag: tagName,
    });

    reset();

    // Test with all options, no commit hash
    tag = getTagDetails({
      appendCommitHash: false,
      prefix: null,
      tagPattern: /^v?(.+)-@/,
    });

    expect(tag).toMatchObject({
      commit: commitSha,
      count: 4,
      displayTag: '12.34.5',
      tag: tagName,
    });

    mockSingleTag(tagName, commitSha, 0);

    // Test with all options, omit commit hash
    tag = getTagDetails({
      prefix: 'v',
      tagPattern: /^v?(.+)-@/,
    });

    expect(tag).toMatchObject({
      commit: commitSha,
      count: 0,
      displayTag: 'v12.34.5',
      tag: tagName,
    });

    mockSingleTag(tagName, commitSha, 4);

    // Test with all options, infer commit hash (included)
    tag = getTagDetails({
      prefix: 'v',
      tagPattern: /^v?(.+)-@/,
    });

    expect(tag).toMatchObject({
      commit: commitSha,
      count: 4,
      displayTag: 'v12.34.5-g1234567',
      tag: tagName,
    });

    mockSingleTag(tagName, commitSha, 0);

    // Test with all options, infer commit hash (excluded)
    tag = getTagDetails({
      prefix: 'v',
      tagPattern: /^v?(.+)-@/,
    });

    expect(tag).toMatchObject({
      commit: commitSha,
      count: 0,
      displayTag: 'v12.34.5',
      tag: tagName,
    });

    reset();

    // Test with no prefix
    tag = getTagDetails({
      appendCommitHash: false,
      tagPattern: /^v?(.+)-@/,
    });

    expect(tag).toMatchObject({
      commit: commitSha,
      count: 4,
      displayTag: 'v12.34.5',
      tag: tagName,
    });
  });

  test('works with custom options, multiple tags', () => {
    const tagName = 'v12.34.5-@scope/package.';
    const commitSha = '1234567890abcde';

    const reset = () => mockMultipleTags(tagName, commitSha);

    reset();

    // Test with all options, include commit hash
    let tag = getTagDetails({
      appendCommitHash: true,
      prefix: 'v',
      tagPattern: /^v?(.+)-@/,
    });

    expect(tag).toMatchObject({
      commit: `${commitSha}0`,
      count: 4,
      displayTag: 'v12.34.5-g1234567',
      tag: `${tagName}A`,
    });

    reset();

    // Test with all options, no commit hash
    tag = getTagDetails({
      appendCommitHash: false,
      prefix: null,
      tagPattern: /^v?(.+)-@/,
    });

    expect(tag).toMatchObject({
      commit: `${commitSha}0`,
      count: 4,
      displayTag: '12.34.5',
      tag: `${tagName}A`,
    });

    mockMultipleTags(tagName, commitSha, 0);

    // Test with all options, omit commit hash
    tag = getTagDetails({
      prefix: 'v',
      tagPattern: /^v?(.+)-@/,
    });

    expect(tag).toMatchObject({
      commit: `${commitSha}0`,
      count: 0,
      displayTag: 'v12.34.5',
      tag: `${tagName}A`,
    });

    mockSingleTag(tagName, commitSha, 4);

    // Test with all options, infer commit hash (included)
    tag = getTagDetails({
      prefix: 'v',
      tagPattern: /^v?(.+)-@/,
    });

    expect(tag).toMatchObject({
      commit: commitSha,
      count: 4,
      displayTag: 'v12.34.5-g1234567',
      tag: tagName,
    });

    mockSingleTag(tagName, commitSha, 0);

    // Test with all options, infer commit hash (excluded)
    tag = getTagDetails({
      prefix: 'v',
      tagPattern: /^v?(.+)-@/,
    });

    expect(tag).toMatchObject({
      commit: commitSha,
      count: 0,
      displayTag: 'v12.34.5',
      tag: tagName,
    });

    reset();

    // Test with no prefix
    tag = getTagDetails({
      appendCommitHash: false,
      tagPattern: /^v?(.+)-@/,
    });

    expect(tag).toMatchObject({
      commit: `${commitSha}0`,
      count: 4,
      displayTag: 'v12.34.5',
      tag: `${tagName}A`,
    });
  });
});

describe('getBranch', () => {
  test('works', () => {
    spawnSync.mockImplementation((command: string, args: string[]) => {
      expect(command).toBe('git');
      expect(args).toEqual(['branch', '--show-current']);

      return 'my-branch-name';
    });

    const branch = getBranch();

    expect(branch).toBe('my-branch-name');
  });
});

describe('getCommitHash', () => {
  test('works', () => {
    spawnSync.mockImplementation((command: string, args: string[]) => {
      expect(command).toBe('git');
      expect(args).toEqual(['rev-parse', 'HEAD']);

      return '1234567890abcdef';
    });

    const commit = getCommitHash();

    expect(commit).toBe('1234567890abcdef');
  });
});
