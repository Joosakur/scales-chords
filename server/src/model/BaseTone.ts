interface Key { name: string, semitones: number }

export default class BaseTone {

    private static keys: Key [] = [
        { name: 'C', semitones: 0 },
        { name: 'D', semitones: 2 },
        { name: 'E', semitones: 4 },
        { name: 'F', semitones: 5 },
        { name: 'G', semitones: 7 },
        { name: 'A', semitones: 9 },
        { name: 'B', semitones: 11 },
    ]

    public readonly num: number
    public readonly name: string
    public readonly semitones: number

    private constructor(num: number, name: string, semitones: number) {
        this.num = num
        this.name = name
        this.semitones = semitones
    }

    public static fromNumber = (whiteKeysFromC: number) => {
        if (!Number.isInteger(whiteKeysFromC)) { throw new Error('BaseTone number must be an integer') }

        const index = whiteKeysFromC % BaseTone.keys.length

        const { name, semitones } = BaseTone.keys [index]
        return new BaseTone(index, name, semitones)
    }

    public static fromString = (whiteKeyName: string) => {
        const index = BaseTone.keys.findIndex(({name}) => name === whiteKeyName.toUpperCase())
        if (index < 0) {
            throw new Error(`Unknown tone name ${whiteKeyName}`)
        }

        const { name, semitones } = BaseTone.keys [index]
        return new BaseTone(index, name, semitones)
    }

    public toString = () => this.name

}
