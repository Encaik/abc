import { MusicScore, Note } from './type';
/**
 * Creates a new Parser.
 * @class
 */
export declare class Parser {
    parseStr: string;
    /**
     * @constructs Parser
     * @param {string} parseStr 初始化解析字符串
     */
    constructor(parseStr?: string);
    /**
     * 解析abc乐谱
     * @param {string} parseStr 如果为空则使用初始化解析器传入字符串
     * @return {MusicScore[]}
     */
    parse(parseStr?: string): MusicScore[];
    /**
     * 解析abc乐谱信息部分
     * @param {string} infoTxt abc乐曲信息部分字符串
     * @return {MusicInfo}
     */
    parseInfo(infoTxt: string): MusicScore;
    /**
     * 解析abc乐谱部分
     * @param {string} musicTxt abc乐曲乐谱部分字符串
     * @return {Note[]}
     */
    parseMusic(musicTxt: string): Note[];
}
