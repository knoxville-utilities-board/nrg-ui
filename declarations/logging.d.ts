export declare const prefix: string;
export declare const LogLevel: {
    silent: number;
    error: number;
    warn: number;
    info: number;
    debug: number;
};
export declare class Logger {
    prefix: string;
    logLevel: number;
    constructor(prefix: string);
    debug(...messages: unknown[]): void;
    info(...messages: unknown[]): void;
    warn(...messages: unknown[]): void;
    error(exitCode: number, ...messages: unknown[]): never;
    error(...messages: unknown[]): never;
    missing(dep: string, location?: string): void;
    missingRequired(dep: string, location?: string): void;
}
declare const logger: Logger;
export default logger;
export declare function setLogLevel(level: number): void;
