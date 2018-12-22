import { expect } from 'chai'
import 'mocha'
import Scale from './Scale'
import ScaleType from './ScaleType'
import Tone from './Tone'

describe('Scale', () => {

    describe('constructor', () => {
        it ('should build a scale', () => {
            const majorScaleType = ScaleType.fromNumber(2741)
            const root = Tone.fromString('F')
            const scale = new Scale(root, majorScaleType)
            expect(scale.getNames() [0]).to.equal('F major')
        })
    })

    describe('fromToneStrings', () => {
        it ('should build a scale', () => {
            const scale1 = Scale.fromToneStrings(['C', 'D', 'E', 'F', 'G', 'A', 'B'])
            expect(scale1.getNames() [0]).to.equal('C major')

            const scale2 = Scale.fromToneStrings(['C', 'D', 'E', 'F', 'G', 'A', 'Bb'])
            expect(scale2.getNames() [0]).to.equal('C mixolydian')

            const scale3 = Scale.fromToneStrings(['D', 'E', 'F', 'G', 'A', 'B', 'C'])
            expect(scale3.getNames() [0]).to.equal('D dorian')

            const scale4 = Scale.fromToneStrings(['E', 'F#', 'G', 'A', 'Bb', 'C', 'D'])
            expect(scale4.getNames() [0]).to.equal('E half diminished')

            const scale5 = Scale.fromToneStrings(['C', 'D', 'E', 'F#', 'G', 'A', 'Bb'])
            expect(scale5.getNames() [0]).to.equal('C acoustic')
        })
    })

    describe('getToneQualifiers', () => {
        it('should give a list of tone qualifiers, starting from C', () => {
            expect(Scale.fromToneStrings(['C', 'D', 'E', 'F', 'G', 'A', 'B'])
                .getToneQualifiersFromC()
                .map(qualifier => qualifier.semitones)).to.deep.equal([0, 0, 0, 0, 0, 0, 0])

            expect(Scale.fromToneStrings(['D#', 'E#', 'F#', 'Gx', 'A#', 'B', 'C'])
                .getToneQualifiersFromC()
                .map(qualifier => qualifier.semitones)).to.deep.equal([0, 1, 1, 1, 2, 1, 0])
        })
    })
})
