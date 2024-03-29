import { HeaderLine, MusicLine, MusicScore, MusicScoreMap } from './type';
/**
 * Creates a new Parser.
 * @class
 */
export declare class Parser {
    parseStr: string;
    scoreMap: MusicScoreMap;
    /**
     * @constructs Parser
     * @param {string} parseStr 初始化解析字符串
     */
    constructor(parseStr?: string);
    /**
     * 解析abc乐谱
     * @param {string} parseStr 如果为空则使用初始化解析器传入字符串
     * @return {MusicScoreMap}
     */
    parse(parseStr?: string): MusicScoreMap;
    /**
     * 解析拥有唯一标识的单首乐谱
     * @param {String[]} parseLines
     * @return {MusicScore}
     */
    parseScore(parseLines: string[]): MusicScore;
    /**
     * 解析abc乐谱信息部分
     * @param {string} infoStr abc乐曲信息部分字符串
     * @return { HeaderLine }
     */
    parseInfo(infoStr: string): HeaderLine;
    /**
     * 解析abc乐谱部分
     * @param {string} musicTxt abc乐曲乐谱部分字符串
     * @return {MusicLine}
     */
    parseMusic(musicTxt: string): MusicLine;
    /**
     * @param  {string} lineStr
     */
    parseLine(lineStr: string): void;
}
