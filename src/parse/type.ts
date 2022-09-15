export interface MusicScore {
  id?: string; // 唯一标识
  name?: string; // 名称
  beat?: string; // 节拍
  spend?: string; // 速度
  duration?: string; // 默认音符时值
  tone?: string; // 调号
  music?: Array<MusicLine>; // 乐谱
  totalNotes?: number;
  scoreLines?: number; // 乐谱占用行数
  startLine?: number; // 乐谱开始行数
  endLine?: number; // 乐谱结束行数
}

export interface MusicLine {
  scoreLineIndex?: number;
  noteLineIndex?: number;
  totalLineNotes?: number;
  notes?: Note[]; // 乐谱
}

export interface HeaderLine {
  key?: string;
  value?: string;
}

export interface MusicScoreMap {
  [key: string]: MusicScore;
}

export enum NoteType {
  Note = 'note',
  BarLine = 'bar-line',
  DoubleBarLine = 'double-bar-line',
  FinalBarLine = 'final-bar-line',
  RepeatLineStart = 'repeat-line-start',
  RepeatLineEnd = 'repeat-line-end',
}

export interface Note {
  noteIndex?: number;
  type?: NoteType; // 类型
  name?: string; // 音名
  pitch?: number; // 音高
  duration?: string; // 时值
  sharp?: boolean; // 升号
  flat?: boolean; // 降号
  'double-sharp'?: boolean; // 重升号
  'double-flat'?: boolean; // 重降号
  nature?: boolean; // 还原号
  grace?: boolean; // 装饰音
  slur?: Symbol[]; // 连音
}
