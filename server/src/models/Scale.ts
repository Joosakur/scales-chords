import BaseTone from './BaseTone'
import NumericInterval from './NumericInterval'
import ScaleType from './ScaleType'
import Tone from './Tone'
import ToneQualifier from './ToneQualifier'

export default class Scale {
    public readonly root: Tone
    public readonly type: ScaleType

    constructor(root: Tone, type: ScaleType) {
        this.root = root
        this.type = type
    }

    public static fromToneStrings = (toneStrings: string []) => {
        if (toneStrings.length !== 7)
            throw new Error('Must be a heptatonic scale')

        const tones = toneStrings.map(str => Tone.fromString(str))
        const root = tones [0]

        let prev: Tone
        const intervals: NumericInterval [] = []
        for (const tone of tones) {
            if (!prev) {
                prev = tone
                continue
            }

            let interval = tone.semitones - prev.semitones
            if (interval < 0) interval += 12
            intervals.push({
                getSemitones: () => interval,
            })
            prev = tone
        }

        const scaleType = new ScaleType(intervals)
        return new Scale(root, scaleType)
    }

    public getNames = () => {
        return this.type.getNames().map(scaleName => `${this.root.toString()} ${scaleName}`)
    }

    public toString = () => {
        const names = this.getNames()
        const [primary, ...secondaries] = names

        let str = primary
        if (secondaries.length > 0) str += ', also known as '
        str += secondaries.join(', ')

        return str
    }

    public getTones: () => Tone [] = () => {
        const tones: Tone [] = []
        let base = this.root.base
        tones.push(this.root)
        let prevSemis = this.root.semitones
        for (const interval of this.type.numericIntervals) {
            const targetSemis = (prevSemis + interval.getSemitones()) % 12
            base = base.next()
            let requiredQualifier = targetSemis - base.semitones
            if (requiredQualifier < -6) requiredQualifier += 12
            if (requiredQualifier > 6) requiredQualifier -= 12

            if (requiredQualifier < -2 || requiredQualifier > 2) {
                throw new Error('Cannot form key signature, scale may not be even enough or root was chosen poorly')
            }

            tones.push(new Tone(base, new ToneQualifier(requiredQualifier)))
            prevSemis = targetSemis
        }

        return tones
    }

    public getToneQualifiersFromC: () => ToneQualifier [] = () => {
        const tones = this.getTones()
        while (tones [0].base.name !== 'C') {
            tones.push(tones.shift())
        }
        return tones.map(tone => tone.qualifier)
    }

    public getToneQualifiersFromRoot: () => ToneQualifier [] = () => {
        return this.getTones().map(tone => tone.qualifier)
    }
}
