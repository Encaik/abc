"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMusic = exports.parseInfo = exports.parse = void 0;
/**
 * 解析abc乐谱
 * @param {string} txt
 * @return {MusicScore}
 */
function parse(txt) {
    const infoReg = new RegExp('^[A-Z]:.+', 'gm');
    const musicReg = new RegExp("^((?!:)\\s?[_=^]*([A-Za-z]|[|()])[',]*([2-9]|/[2-9])?\\s?(?!:))+", 'gm');
    return {
        musicInfo: parseInfo(txt.match(infoReg).join()),
        music: parseMusic(txt.match(musicReg).join()),
    };
}
exports.parse = parse;
/**
 * 解析abc乐谱信息部分
 * @param {string} infoTxt
 * @return {MusicInfo}
 */
function parseInfo(infoTxt) {
    const info = {
        name: /(?<=T\:)[^\,]*/.exec(infoTxt)[0],
        beat: /(?<=M\:)[^\,]*/.exec(infoTxt)[0],
        spend: /(?<=Q\:)[^\,]*/.exec(infoTxt)[0],
        duration: /(?<=L\:)[^\,]*/.exec(infoTxt)[0],
        tone: /(?<=K\:)[^\,]*/.exec(infoTxt)[0],
    };
    return info;
}
exports.parseInfo = parseInfo;
/**
 * 解析abc乐谱部分
 * @param {string} musicTxt
 * @return {Note[]}
 */
function parseMusic(musicTxt) {
    var _a;
    const musicScoreArr = musicTxt.split(/\s/);
    const noteList = [];
    for (let index = 0; index < musicScoreArr.length; index++) {
        const note = musicScoreArr[index];
        console.log(note);
        switch (note) {
            case '(': break;
            case ')': break;
            case '|': break;
            case '||': break;
            default:
                const pitch = /[A-Za-z]/.exec(note)[0]; // 音调
                const operation = /[/]/.test(note); // 是否有/号
                const value = Number(((_a = /[2-9]/.exec(note)) === null || _a === void 0 ? void 0 : _a[0]) || 1); // 与目前时长相差倍数
                const tone = note.match(/[',]/g) || []; // 是否有升降八度
                const toneCount = tone.length; // 升降八度数量
                const modifiedTone = note.match(/[_^]/g) || []; // 是否有升降调
                const modifiedToneCount = modifiedTone.length; // 升降调数量
                let fullPitch = pitch;
                if (modifiedToneCount) {
                    const isToneDown = modifiedTone[0] === "_";
                    fullPitch += `${isToneDown ? 'b' : 's'}`;
                }
                if (toneCount) {
                    const isToneAdd = tone[0] === "'";
                    fullPitch += `${isToneAdd ? 3 + toneCount : 3 - toneCount}`;
                }
                else {
                    fullPitch += `3`;
                }
                noteList.push({
                    pitch: fullPitch,
                    playTime: operation ? 0.25 / value : 0.25 * value
                });
                break;
        }
    }
    console.log(noteList);
    return noteList;
}
exports.parseMusic = parseMusic;
