export declare const ELEMENT_INDEX: import("@mdn/browser-compat-data").Identifier;
export declare const API_INDEX: import("@mdn/browser-compat-data").Identifier;
export declare const BUILTINS_INDEX: import("@mdn/browser-compat-data").Identifier;
type ImportOptions = {
    importSlug?: string;
    type?: boolean;
};
export declare function createImportPath(name: string, options?: string | ImportOptions): string;
export declare function createLink(name: string | string[]): string;
export declare function stringify(value: unknown): string;
export declare function getMdnLinkForElement(element: string): string | null;
export declare function getMdnLinkForApi(api: string): string | null;
export {};
