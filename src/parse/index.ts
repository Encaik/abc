import { MusicScore, Note, NoteType } from './type';

/**
 * Creates a new Parser.
 * @class
 */
export class Parser {
  parseStr: string;

  /**
   * @constructs Parser
   * @param {string} parseStr 初始化解析字符串
   */
  constructor(parseStr: string = '') {
    this.parseStr = parseStr;
  }

  /**
   * 解析abc乐谱
   * @param {string} parseStr 如果为空则使用初始化解析器传入字符串
   * @return {MusicScore[]}
   */
  parse(parseStr: string = this.parseStr): MusicScore[] {
    const scoreReg: RegExp = new RegExp(
      "([a-zA-Z]:.*\\s)*(\\s*({|}|\\(|\\)|(=|(\\^|_){1,2})?[A-Ga-g]('|,)*(\\/?\\d)?|:?\\|{1,2}:?)\\s*)*",
      'gm'
    );
    const infoReg: RegExp = new RegExp('^[A-Z]:.+', 'gm');
    const musicReg: RegExp = new RegExp(
      "^(\\s*({|}|\\(|\\)|(=|(\\^|_){1,2})?[A-Ga-g]('|,)*(\\/?\\d)?|:?\\|{1,2}:?)\\s*)*",
      'gm'
    );
    const scoreList: MusicScore[] = [];
    parseStr.match(scoreReg).forEach((score) => {
      if (score) {
        scoreList.push({
          ...this.parseInfo(score.match(infoReg).join('')),
          music: this.parseMusic(score.match(musicReg).join('')),
        });
      }
    });
    console.log(scoreList);
    return scoreList;
  }

  /**
   * 解析abc乐谱信息部分
   * @param {string} infoTxt abc乐曲信息部分字符串
   * @return {MusicInfo}
   */
  parseInfo(infoTxt: string): MusicScore {
    const info = {
      name: /(?<=T\:)[^\,]*/.exec(infoTxt)[0],
      beat: /(?<=M\:)[^\,]*/.exec(infoTxt)[0],
      spend: /(?<=Q\:)[^\,]*/.exec(infoTxt)[0],
      duration: /(?<=L\:)[^\,]*/.exec(infoTxt)[0],
      tone: /(?<=K\:)[^\,]*/.exec(infoTxt)[0],
    };
    return info;
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
