import NumericInterval from './NumericInterval'

export default class ChordType {
    public readonly intervals: NumericInterval []
    public readonly name: string
    public readonly shortName: string

    constructor(intervals: number [], name: string, shortName: string | undefined) {
        this.intervals = intervals.map(i => ({ getSemitones: () => i }))
        this.name = name
        this.shortName = shortName === undefined ? name : shortName
    }

    public toString = (): string => this.shortName

    public static readonly triads: ChordType [] = [
        new ChordType([3, 3], 'diminished', 'dim'),
        new ChordType([3, 4], 'minor', 'm'),
        new ChordType([4, 3], 'major', ''),
        new ChordType([4, 4], 'augmented', 'aug'),
    ]

    public static readonly sevenths: ChordType [] = [
        new ChordType([3, 3, 3], 'diminished 7th', 'dim7'),
        new ChordType([3, 3, 4], 'diminished major 7th', 'm7b5'),
        new ChordType([3, 4, 3], 'minor 7th', 'm7'),
        new ChordType([3, 4, 4], 'minor major 7th', 'mmaj7'),
        new ChordType([4, 3, 3], 'dominant 7th', '7'),
        new ChordType([4, 3, 4], 'major 7th', 'maj7'),
        new ChordType([4, 4, 3], 'augmented 7th', 'aug7'),
    ]

    public static readonly suspended: ChordType [] = [
        new ChordType([2, 5], 'suspended 2th', 'sus2'),
        new ChordType([5, 2], 'suspended 4th', 'sus4'),
    ]

}
