import NumericInterval from './NumericInterval'

class SpecificInterval implements NumericInterval {
    public readonly semitones: number

    constructor(semitones: number) {
        if (!Number.isInteger(semitones) || semitones < 1 || semitones > 22)
            throw new Error('Must be an integer between 1 and 22')

        this.semitones = semitones
    }

    public getSemitones = () => this.semitones

}

export default SpecificInterval
