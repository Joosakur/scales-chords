import { expect } from 'chai'
import 'mocha'
import BaseTone from './BaseTone'

describe('BaseTone', () => {

    describe('fromNumber', () => {
        it('should map 5 as A', () => {
            const tone = BaseTone.fromNumber(5)
            expect(tone.num).to.equal(5)
            expect(tone.toString()).to.eql('A')
            expect(tone.semitones).to.eql(9)
        })

        it('should throw for invalid value', () => {
            expect(() => BaseTone.fromNumber(3.9)).to.throw()
        })
    })

    describe('fromString', () => {
        it('should map G as 4', () => {
            const tone = BaseTone.fromString('g')
            expect(tone.num).to.equal(4)
            expect(tone.toString()).to.eql('G')
            expect(tone.semitones).to.eql(7)
        })

        it('should throw for invalid value', () => {
            expect(() => BaseTone.fromString('x')).to.throw()
        })
    })

})
