export interface MusicScore {
  musicInfo:MusicInfo, // 乐谱信息
  music:Note[] // 乐谱
}

export interface MusicInfo {
  name:string, // 名称
  beat:string, // 节拍
  spend:string, // 速度
  duration:string, // 默认音符时值
  tone:string // 调号
}

export interface Note {
  pitch:string, // 音高
  playTime:number, // 时值
}