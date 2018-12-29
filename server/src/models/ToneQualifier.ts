export type ToneQualifierString = 'bb' | 'b' | null | '#' | 'x'

export default class ToneQualifier {

    public static DoubleFlat = () => new ToneQualifier(-2)
    public static Flat = () => new ToneQualifier(-1)
    public static Natural = () => new ToneQualifier(0)
    public static Sharp = () => new ToneQualifier(1)
    public static DoubleSharp = () => new ToneQualifier(2)
    public readonly semitones: number

    constructor(semitones: number) {
        if (!Number.isInteger(semitones) || semitones < -2 || semitones > 2) {
            throw new Error('Invalid num of semitones')
        }
        this.semitones = semitones
    }

    public static fromString = (str: string) => {
        switch (str) {
            case 'bb':
                return ToneQualifier.DoubleFlat()
            case 'b':
                return ToneQualifier.Flat()
            case null:
            case '':
                return ToneQualifier.Natural()
            case '#':
                return ToneQualifier.Sharp()
            case 'x':
                return ToneQualifier.DoubleSharp()
            default:
                throw new Error(`Unknown tone qualifier ${str}`)
        }
    }

    public toString: () => ToneQualifierString = () => {
        switch (this.semitones) {
            case -2:
                return 'bb'
            case -1:
                return 'b'
            case 0:
                return null
            case 1:
                return '#'
            case 2:
                return 'x'
        }
    }
}
