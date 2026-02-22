"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageVersion = getPackageVersion;
exports.getTagDetails = getTagDetails;
exports.getTag = getTag;
exports.getBranch = getBranch;
exports.getCommitHash = getCommitHash;
exports.getVersion = getVersion;
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = require("path");
function getPackageVersion(fallback) {
    const pkg = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(process.cwd(), 'package.json'), 'utf-8'));
    return (pkg.version ?? fallback);
}
function git(args) {
    const result = (0, child_process_1.spawnSync)('git', args, {
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
const defaultTagOptions = {
    appendCommitHash: null,
    prefix: 'v',
    tagPattern: /(\d+\.\d+\.\d+)/,
};
function getTagDetails(options = {}) {
    const { appendCommitHash, prefix, tagPattern } = {
        ...defaultTagOptions,
        ...options,
    };
    let latestTag = null;
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
    });
    return tagInfo[0];
}
function getTag(options = {}) {
    const tagInfo = getTagDetails(options);
    if (!tagInfo) {
        return null;
    }
    return tagInfo.displayTag;
}
function getBranch() {
    return git(['branch', '--show-current']);
}
function getCommitHash() {
    return git(['rev-parse', 'HEAD']);
}
function getVersion(options = defaultTagOptions, fallback) {
    let version;
    try {
        version = getTag(options);
    }
    catch {
        // Ignore
    }
    if (!version) {
        try {
            version = getBranch();
        }
        catch {
            // Ignore
        }
        if (!version) {
            try {
                version = getCommitHash();
            }
            catch {
                // Ignore
            }
        }
    }
    if (!version) {
        version = getPackageVersion(fallback);
    }
    return version;
}
