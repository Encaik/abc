import { ModuleType, LogLevel } from './types';

/**
 * Creates a new AbcError.
 * @class
 */
export class AbcError {
  module: ModuleType;
  msg: string;
  level: LogLevel;

  /**
   * @param  {ModuleType} module
   * @param  {string} msg
   * @param  {LogLevel} level
   */
  constructor(module: ModuleType, msg: string, level: LogLevel) {
    this.module = module;
    this.msg = msg;
    this.level = level;
    this.errorPrint();
  }

  /**
   *
   */
  errorPrint() {
    const str = `${this.module} ${this.level}: ${this.msg}`;
    switch (this.level) {
      case LogLevel.Info:
        console.info(str);
        break;
      case LogLevel.Warn:
        console.warn(str);
        break;
      case LogLevel.Error:
        console.error(str);
        break;
    }
  }
}
