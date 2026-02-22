import type { SemVer } from 'semver';
type PackageManager = 'pnpm' | 'yarn' | 'npm';
export declare const compatibility: Record<string, string>;
export declare function detectPackageManager(): PackageManager | never;
export declare function hasDependency(dep: string): boolean;
export declare function getVersion(dep: string): SemVer | null;
export declare function installMany(deps: {
    [dep: string]: string | undefined;
}): Promise<void>;
export declare function install(dep?: string, version?: string): Promise<void>;
export declare function update(dep: string, version?: string, force?: boolean): Promise<boolean>;
export declare function uninstall(...deps: string[]): Promise<void>;
export {};
