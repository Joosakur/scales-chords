export interface RootState {
    readonly scale: ScaleState
}

export interface ScaleState {
    readonly search: ScaleSearchState
    readonly details: ScaleDetails | null
    readonly root: QualifiedTone
    readonly scaleNumber: number | null
}

export interface ScaleSearchState {
    readonly value: string,
    readonly results: ScaleListEntry [],
    readonly isLoading: boolean
}

export interface ScaleListEntry {
    readonly name: string
    readonly scaleNumber: number
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
