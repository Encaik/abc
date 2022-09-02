export interface MusicScore {
    name?: string;
    beat?: string;
    spend?: string;
    duration?: string;
    tone?: string;
    music?: Note[];
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
