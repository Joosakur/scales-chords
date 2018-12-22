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
}
