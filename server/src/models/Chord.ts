import ToneQualifier from '../models/ToneQualifier'
import ChordType from './ChordType'
import NumericInterval from './NumericInterval'
import Tone from './Tone'

export default class Chord {
    public readonly tones: Tone []
    public readonly name: string
    public readonly shortName: string

    constructor(root: Tone, chordType: ChordType) {
        this.name = `${root.toString()} ${chordType.name}`
        this.shortName = `${root.toString()}${chordType.shortName}`
        this.tones = Chord.tonesFromIntervals(root, chordType.intervals)
    }

    private static tonesFromIntervals = (root: Tone, intervals: NumericInterval []) => {
        const reducer = (tones: Tone [], interval: NumericInterval): Tone [] => {
            const prev: Tone = tones [tones.length - 1]
            const semitonesFromC = (prev.semitones + interval.getSemitones()) % 12
            const tone = Chord.intervalToTone(root, semitonesFromC)
            return [ ...tones, tone ]
        }
        return intervals.reduce(reducer, [root])
    }

    private static intervalToTone = (root: Tone, semitones: number): Tone => {
        let base = root.base
        let r = 0
        while (Math.abs(semitones - base.semitones) > 1) {
            base = base.next()
            r++
            if (r > 20) throw new Error('Oops, there seems to be a bug! :o')
        }
        const difference = semitones - base.semitones
        const qualifier = new ToneQualifier(difference)
        return new Tone(base, qualifier)
    }

}
