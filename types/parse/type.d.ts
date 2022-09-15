export interface MusicScore {
    id?: string;
    name?: string;
    beat?: string;
    spend?: string;
    duration?: string;
    tone?: string;
    music?: Array<MusicLine>;
    totalNotes?: number;
    scoreLines?: number;
    startLine?: number;
    endLine?: number;
}
export interface MusicLine {
    scoreLineIndex?: number;
    noteLineIndex?: number;
    totalLineNotes?: number;
    notes?: Note[];
}
export interface HeaderLine {
    key?: string;
    value?: string;
}
export interface MusicScoreMap {
    [key: string]: MusicScore;
}
export declare enum NoteType {
    Note = "note",
    BarLine = "bar-line",
    DoubleBarLine = "double-bar-line",
    FinalBarLine = "final-bar-line",
    RepeatLineStart = "repeat-line-start",
    RepeatLineEnd = "repeat-line-end"
}
export interface Note {
    noteIndex?: number;
    type?: NoteType;
    name?: string;
    pitch?: number;
    duration?: string;
    sharp?: boolean;
    flat?: boolean;
    'double-sharp'?: boolean;
    'double-flat'?: boolean;
    nature?: boolean;
    grace?: boolean;
    slur?: Symbol[];
}
