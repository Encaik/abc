import { AbcError } from '../error';
import { LogLevel, ModuleType } from '../error/types';
import { MusicScore, MusicScoreMap, Note, NoteType } from './type';

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
    console.log('parseScore:', parseStr.match(scoreReg));
    parseStr.match(scoreReg).forEach((scoreStr) => {
      if (scoreStr) {
        const score = this.parseScore(scoreStr);
        this.scoreMap[score.id] = score;
      }
    });
    console.log(this.scoreMap);
    return this.scoreMap;
  }

  /**
   * 解析拥有唯一标识的单首乐谱
   * @param {String} scoreStr
   * @return {MusicScore}
   */
  parseScore(scoreStr: string): MusicScore {
    const score: MusicScore = {};
    const infoReg: RegExp = new RegExp('[A-Z]:.*', 'g');
    score.music = this.parseMusic(
      scoreStr.replace(infoReg, (infoStr) => {
        const info = this.parseInfo(score, infoStr);
        return '';
      })
    );
    return score;
  }

  /**
   * 解析abc乐谱信息部分
   * @param {MusicScore} score
   * @param {string} infoStr abc乐曲信息部分字符串
   */
  parseInfo(score: MusicScore, infoStr: string) {
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
    score[infoNameMap[regArr[1]]] = regArr[2];
  }

  /**
   * 解析abc乐谱部分
   * @param {string} musicTxt abc乐曲乐谱部分字符串
   * @return {Note[]}
   */
  parseMusic(musicTxt: string): Note[] {
    const musicScoreStr = musicTxt.replace(/\s/g, '');
    const noteReg: RegExp = new RegExp(
      "{|}|\\(|\\)|(=|(\\^|_){1,2})?[A-Ga-g]('|,)*(\\/?\\d)?|:?\\|{1,2}:?",
      'g'
    );
    const musicScoreArr = musicScoreStr.match(noteReg);
    console.log(musicScoreArr);
    const noteList: Note[] = [];
    let noteIndex: number = 1;
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
          noteIndex++;
          break;
      }
    }
    console.log(noteList);
    return noteList;
  }
}
