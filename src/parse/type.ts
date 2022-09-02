export interface MusicScore {
  name?: string; // 名称
  beat?: string; // 节拍
  spend?: string; // 速度
  duration?: string; // 默认音符时值
  tone?: string; // 调号
  music?: Note[]; // 乐谱
}

export interface Note {
  type?: 'note' | 'bar-line' | 'double-bar-line' | 'bold-double-bar-line'; // 类型
  name?: string; // 音名
  pitch?: number; // 音高
  duration?: string; // 时值
  sharp?: boolean; // 升号
  flat?: boolean; // 降号
  'double-sharp'?: boolean; // 重升号
  'double-flat'?: boolean; // 重降号
  nature?: boolean; // 还原号
}
