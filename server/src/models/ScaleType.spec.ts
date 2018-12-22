import { expect } from 'chai'
import 'mocha'
import NumericInterval from './NumericInterval'
import ScaleType from './ScaleType'

describe('ScaleType', () => {

    const getNumericIntervals: (...semiArr: number []) => NumericInterval [] = (...semis: number []) => {
        return semis.map((num: number) => ({
            getSemitones: () => num,
        }))
    }

    describe('constructor', () => {
        it ('should build a scale', () => {
            const majorScale = new ScaleType(getNumericIntervals(2, 2, 1, 2, 2, 2))
            expect(majorScale.binaryString).to.equal('101010110101')
            expect(majorScale.scaleNumber).to.equal(2741)
            expect(majorScale.getNames() [0]).to.equal('major')
        })
        it ('should only accept heptatonic scales', () => {
            expect(() => new ScaleType(getNumericIntervals(2, 2, 1, 2, 3))).to.throw()
            expect(() => new ScaleType(getNumericIntervals(2, 1, 1, 2, 1, 1, 1))).to.throw()
        })
        it ('should not accept scales going over octave', () => {
            expect(() => new ScaleType(getNumericIntervals(2, 2, 1, 2, 2, 3))).to.throw()
        })
        it ('should only accept truly positive intervals', () => {
            expect(() => new ScaleType(getNumericIntervals(2, 2, 1, 2, 2, -2))).to.throw()
            expect(() => new ScaleType(getNumericIntervals(2, 2, 0, 2, 2, 2))).to.throw()
        })
    })

    describe('fromNumber', () => {
        it ('should build a scale', () => {
            const majorScale = ScaleType.fromNumber(2741)
            expect(majorScale.binaryString).to.equal('101010110101')
            expect(majorScale.scaleNumber).to.equal(2741)
            expect(majorScale.getNames() [0]).to.equal('major')
        })
    })

})
