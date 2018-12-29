export interface ScaleListEntry {
    name: string
    scaleNumber: number
}

export interface ScaleTypeDetails {
    namePrimary: string
    nameSecondaries: string []
    scaleNumber: number
}

export interface ScaleDetails {
    namePrimary: string
    nameSecondaries: string []
    scaleNumber: number,
    tones: QualifiedTone [],
    scaleDegrees: ScaleDegree []
}

export interface QualifiedTone {
    base: BaseTone,
    qualifier: ToneQualifier
}

export type BaseTone = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B'
export type ToneQualifier = 'bb' | 'b' | null | '#' | 'x'

export interface ScaleDegree {
    degree: number,
    chordGroups: {
        [name: string]: Chord [],
    }
}

export interface Chord {
    name: string,
    shortName: string,
    tones: QualifiedTone []
}
