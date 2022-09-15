import { AbcError } from '../error';
import { LogLevel, ModuleType } from '../error/types';
import {
  HeaderLine,
  MusicLine,
  MusicScore,
  MusicScoreMap,
  Note,
  NoteType,
} from './type';

/**
 * Creates a new Parser.
 * @class
 */
export class Parser {
  parseStr: string;
  scoreMap: MusicScoreMap;

  /**
   * @constructs Parser
   * @param {string} parseStr 初始化解析字符串
   */
  constructor(parseStr: string = '') {
    if (!parseStr)
      new AbcError(
        ModuleType.Parse,
        '初始化解析器未传入解析字符串或字符串为空。',
        LogLevel.Warn
      );
    this.parseStr = parseStr;
    this.scoreMap = {};
  }

  /**
   * 解析abc乐谱
   * @param {string} parseStr 如果为空则使用初始化解析器传入字符串
   * @return {MusicScoreMap}
   */
  parse(parseStr: string = this.parseStr): MusicScoreMap {
    if (!parseStr) {
      new AbcError(ModuleType.Parse, '无法解析空字符串。', LogLevel.Error);
      return;
    }
    const scoreReg: RegExp = new RegExp('(X:)?[^X]+', 'g');
    let totalLines: number = 1;
    parseStr.match(scoreReg).forEach((scoreStr) => {
      if (scoreStr) {
        const parseLines = scoreStr.split('\n');
        const scoreLines = parseLines.length;
        const startLine = totalLines;
        totalLines += scoreLines;
        const endLine = totalLines - 1;
        const score = this.parseScore(parseLines); // scoreStr
        this.scoreMap[score.id] = {
          ...score,
          scoreLines,
          startLine,
          endLine,
        };
      }
    });
    return this.scoreMap;
  }

  /**
   * 解析拥有唯一标识的单首乐谱
   * @param {String[]} parseLines
   * @return {MusicScore}
   */
  parseScore(parseLines: string[]): MusicScore {
    console.log(parseLines);
    const score: MusicScore = {
      music: [],
      totalNotes: 0,
    };
    const infoReg: RegExp = new RegExp('[A-Z]:.*');
    let scoreLineIndex: number = 1;
    let noteLineIndex: number = 1;
    parseLines.forEach((line) => {
      if (line) {
        if (infoReg.test(line)) {
          const info = this.parseInfo(line);
          score[info.key] = info.value;
          scoreLineIndex++;
        } else {
          const music = this.parseMusic(line);
          music.scoreLineIndex = scoreLineIndex;
          music.noteLineIndex = noteLineIndex;
          score.music.push(music);
          score.totalNotes += music.totalLineNotes;
          noteLineIndex++;
          scoreLineIndex++;
        }
      }
    });
    return score;
  }

  /**
   * 解析abc乐谱信息部分
   * @param {string} infoStr abc乐曲信息部分字符串
   * @return { HeaderLine }
   */
  parseInfo(infoStr: string): HeaderLine {
    const infoNameMap = {
      X: 'id',
      T: 'title',
      M: 'beat',
      Q: 'spend',
      L: 'unitNoteLen',
      K: 'key',
    };
    const infoReg = new RegExp('([A-Z]):(.*)', 'g');
    const regArr = infoReg.exec(infoStr);
    return { key: infoNameMap[regArr[1]], value: regArr[2] };
  }

  /**
   * 解析abc乐谱部分
   * @param {string} musicTxt abc乐曲乐谱部分字符串
   * @return {MusicLine}
   */
  parseMusic(musicTxt: string): MusicLine {
    console.log(musicTxt);
    const noteReg: RegExp = new RegExp(
      "{|}|\\(|\\)|(=|(\\^|_){1,2})?[A-Ga-g]('|,)*(\\/?\\d)?|:?\\|{1,2}:?",
      'g'
    );
    const musicScoreArr = musicTxt.match(noteReg);
    const noteList: Note[] = [];
    let noteIndex: number = 0;
    let isGraceNote: boolean = false;
    const slurStack: Symbol[] = [];
    for (let index = 0; index < musicScoreArr.length; index++) {
      const note = musicScoreArr[index];
      if (!note) continue;
      switch (note) {
        case '(':
          slurStack.push(Symbol());
          break;
        case ')':
          slurStack.pop();
          break;
        case '{':
          isGraceNote = true;
          break;
        case '}':
          isGraceNote = false;
          break;
        case '|:':
          noteList.push({
            type: NoteType.RepeatLineStart,
          });
          break;
        case ':|':
          noteList.push({
            type: NoteType.RepeatLineEnd,
          });
          break;
        case '|':
          noteList.push({
            type: NoteType.BarLine,
          });
          break;
        case '||':
          noteList.push({
            type: NoteType.FinalBarLine,
          });
          break;
        default:
          const name = /[A-Ga-g]/.exec(note)[0];
          const pitchUp = /'+/.exec(note)?.[0]?.split('').length || 0;
          const pitchDown = /,+/.exec(note)?.[0]?.split('').length || 0;
          const duration = /\/?\d+/.exec(note)?.[0] || '1';
          noteIndex++;
          noteList.push({
            noteIndex,
            type: NoteType.Note,
            name,
            pitch: 4 + pitchUp - pitchDown,
            duration,
            sharp: /^(?<!\^)\^(?!\^)/.test(note),
            flat: /^(?<!_)_(?!_)/.test(note),
            'double-sharp': /^\^{2}/.test(note),
            'double-flat': /^_{2}/.test(note),
            nature: /^=/.test(note),
            grace: isGraceNote,
            slur: [...slurStack],
          });
          break;
      }
    }
    return {
      totalLineNotes: noteIndex,
      notes: noteList,
    };
  }

  /**
   * @param  {string} lineStr
   */
  parseLine(lineStr: string) {
    console.log(lineStr);
  }
}
