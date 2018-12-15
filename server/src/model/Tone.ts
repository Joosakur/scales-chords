import BaseTone from './BaseTone'
import ToneQualifier from './ToneQualifier'

export default class Tone {
    public readonly base: BaseTone
    public readonly qualifier: ToneQualifier
    public readonly semitones: number

    constructor(base: BaseTone, qualifier: ToneQualifier) {
        this.base = base
        this.qualifier = qualifier

        this.semitones = (base.semitones + qualifier.semitones) % 12
        if (this.semitones < 0) { this.semitones += 12 }
    }

    public static fromString = (str: string) => {
        const base = BaseTone.fromString(str.charAt(0))
        const qualifier = ToneQualifier.fromString(str.substr(1))
        return new Tone(base, qualifier)
    }

    public toString = () => {
        return this.base.toString() + this.qualifier.toString()
    }
}
