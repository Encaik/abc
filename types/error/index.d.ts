import { ModuleType, LogLevel } from './types';
/**
 * Creates a new AbcError.
 * @class
 */
export declare class AbcError {
    module: ModuleType;
    msg: string;
    level: LogLevel;
    /**
     * @param  {ModuleType} module
     * @param  {string} msg
     * @param  {LogLevel} level
     */
    constructor(module: ModuleType, msg: string, level: LogLevel);
    /**
     *
     */
    errorPrint(): void;
}
