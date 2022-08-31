import { MusicScore, Note } from '../type';

/**
 * 解析abc乐谱
 * @param {string} txt
 * @return {MusicScore[]}
 */
export function parse(txt: string): MusicScore[] {
  const scoreReg: RegExp = new RegExp(
    "([a-zA-Z]:.*\\s)*[a-gA-G|^_=',/(2|3|4|6|8|16|32)\\s]*",
    'gm'
  );
  const infoReg: RegExp = new RegExp('^[A-Z]:.+', 'gm');
  const musicReg: RegExp = new RegExp(
    "^((?!:)\\s?[_=^]*([A-Za-z]|[|()])[',]*([2-9]|/[2-9])?\\s?(?!:))+",
    'gm'
  );
  console.log();
  const scoreList: MusicScore[] = [];
  txt.match(scoreReg).forEach((score) => {
    if (score) {
      scoreList.push({
        ...parseInfo(score.match(infoReg).join()),
        music: parseMusic(score.match(musicReg).join()),
      });
    }
  });
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
  const musicScoreArr = musicTxt.split(/\s/);
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
        const pitch = /[A-Za-z]/.exec(note)[0];
        const operation = /[/]/.test(note);
        const value = Number(/[2-9]/.exec(note)?.[0] || 1);
        noteList.push({
          type: 'note',
          pitch: pitch,
          duration: `${operation ? '1/' : ''}${value}`,
        });
        break;
    }
  }
  console.log(noteList);
  return noteList;
}
