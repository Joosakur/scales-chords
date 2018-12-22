import fs from 'fs'

import NumericInterval from './NumericInterval'

const numberToNames = JSON.parse(
    fs.readFileSync('data/numberToNames.json', {encoding: 'utf8'}),
)

export default class ScaleType {

    public readonly numericIntervals: NumericInterval []
    public readonly binaryString: string
    public readonly scaleNumber: number

    constructor(numericIntervals: NumericInterval []) {
        this.validateIntervals(numericIntervals)
        this.numericIntervals = numericIntervals

        this.binaryString = this.getBinaryString()
        this.scaleNumber = this.getScaleNumber()
    }

    public static fromNumber = (scaleNumber: number) => {
        return ScaleType.fromBinaryString(scaleNumber.toString(2))
    }

    public static fromBinaryString = (binary: string) => {
        if (binary.length !== 12) throw new Error('Binary string has to include all notes')
        let onBits = 0
        for (const char of binary) {
            if (char !== '1' && char !== '0') throw new Error('Invalid binary string')
            if (char === '1') onBits++
        }
        if (binary.charAt(0) !== '1') throw new Error('Scale must include its root note')
        if (onBits !== 7) throw new Error('Scale must be heptatonic')

        const reversedBinary = binary.split('').reverse().join('')

        let prev = 0
        const numericIntervals: NumericInterval [] = []
        for (let i = 1; i < 12; i++) {
            if (reversedBinary.charAt(i) === '1') {
                const semis = i - prev
                numericIntervals.push({
                    getSemitones: () => semis,
                })
                prev = i
            }
        }

        return new ScaleType(numericIntervals)
    }

    public getNames: () => string [] = () => {
        const names = numberToNames [this.scaleNumber.toString(10)]
        if (names && names.length > 0)
            return names
        else
            return [`Anonymous scale ${this.scaleNumber}`]
    }

    private validateIntervals = (numericIntervals: NumericInterval []) => {
        if (numericIntervals.length !== 6)
            throw new Error('Must be a heptatonic scale')

        if (numericIntervals.find(int => int.getSemitones() < 1))
            throw new Error('All intervals must be positive')

        const intervalToLast: number = numericIntervals.map(int => int.getSemitones())
            .reduce((sum, semis) => {
                sum += semis
                return sum
            }, 0)
        if (intervalToLast >= 12)
            throw new Error('Scale cannot span over an octave')
    }

    private getBinaryString = () => {
        let fromRoot = 0
        const semitoneArray = [0]
        for (const semis of this.numericIntervals.map(int => int.getSemitones())) {
            fromRoot += semis
            semitoneArray.push(fromRoot)
        }

        let binary = ''
        for (let i = 0; i < 12; i++) {
            if (semitoneArray.includes(i))
                binary += '1'
            else
                binary += '0'
        }

        const reversedBinary = binary.split('').reverse().join('')
        return reversedBinary
    }

    private getScaleNumber = () => {
        return parseInt(this.binaryString, 2)
    }

}
