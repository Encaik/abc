export interface MusicScore {
    name?: string;
    beat?: string;
    spend?: string;
    duration?: string;
    tone?: string;
    music?: Note[];
}
export interface Note {
    type?: 'note' | 'bar-line' | 'double-bar-line' | 'bold-double-bar-line';
    name?: string;
    pitch?: number;
    duration?: string;
    sharp?: boolean;
    flat?: boolean;
    'double-sharp'?: boolean;
    'double-flat'?: boolean;
    nature?: boolean;
}
