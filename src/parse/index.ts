import { MusicScore, Note } from '../type';

/**
 * 解析abc乐谱
 * @param {string} txt
 * @return {MusicScore[]}
 */
export function parse(txt: string): MusicScore[] {
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
  txt.match(scoreReg).forEach((score) => {
    if (score) {
      scoreList.push({
        ...parseInfo(score.match(infoReg).join('')),
        music: parseMusic(score.match(musicReg).join('')),
      });
    }
  });
  console.log(scoreList);
  return scoreList;
}

/**
 * 解析abc乐谱信息部分
 * @param {string} infoTxt
 * @return {MusicInfo}
 */
export function parseInfo(infoTxt: string): MusicScore {
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
 * @param {string} musicTxt
 * @return {Note[]}
 */
export function parseMusic(musicTxt: string): Note[] {
  const musicScoreStr = musicTxt.replace(/\s/g, '');
  const noteReg: RegExp = new RegExp(
    "{|}|\\(|\\)|(=|(\\^|_){1,2})?[A-Ga-g]('|,)*(\\/?\\d)?|:?\\|{1,2}:?",
    'g'
  );
  const musicScoreArr = musicScoreStr.match(noteReg);
  console.log(musicScoreArr);
  const noteList: Note[] = [];
  for (let index = 0; index < musicScoreArr.length; index++) {
    const note = musicScoreArr[index];
    if (!note) continue;
    console.log(note);
    switch (note) {
      case '(':
        break;
      case ')':
        break;
      case '{':
        break;
      case '}':
        break;
      case '|:':
        break;
      case ':|':
        break;
      case '|':
        noteList.push({
          type: 'bar-line',
        });
        break;
      case '||':
        noteList.push({
          type: 'bold-double-bar-line',
        });
        break;
      default:
        const name = /[A-Ga-g]/.exec(note)[0];
        const pitchUp = /'+/.exec(note)?.[0]?.split('').length || 0;
        const pitchDown = /,+/.exec(note)?.[0]?.split('').length || 0;
        const duration = /\/?\d+/.exec(note)?.[0] || '1';
        noteList.push({
          type: 'note',
          name,
          pitch: 4 + pitchUp - pitchDown,
          duration,
          sharp: /^(?<!\^)\^(?!\^)/.test(note),
          flat: /^(?<!_)_(?!_)/.test(note),
          'double-sharp': /^\^{2}/.test(note),
          'double-flat': /^_{2}/.test(note),
          nature: /^=/.test(note),
        });
        break;
    }
  }
  console.log(noteList);
  return noteList;
}
