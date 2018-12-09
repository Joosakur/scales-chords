import { expect } from 'chai'
import 'mocha'
import ToneQualifier from './ToneQualifier'

describe('ToneQualifier', () => {
    describe('constructor', () => {
        it('should set the semitones', () => {
            const qualifier = new ToneQualifier(-1)
            expect(qualifier.semitones).to.equal(-1)
            expect(qualifier.toString()).to.equal('b')
        })

        it('should throw for illegal number', () => {
            expect(() => new ToneQualifier(-3)).to.throw()
            expect(() => new ToneQualifier(3)).to.throw()
            expect(() => new ToneQualifier(0.3)).to.throw()
        })
    })

    describe('enum builders', () => {
        it('should build correct qualifiers', () => {
            expect(ToneQualifier.DoubleFlat().toString()).to.eql('bb')
            expect(ToneQualifier.Flat().toString()).to.eql('b')
            expect(ToneQualifier.Natural().toString()).to.eql('')
            expect(ToneQualifier.Sharp().toString()).to.eql('#')
            expect(ToneQualifier.DoubleSharp().toString()).to.eql('x')
        })
    })

    describe('fromString', () => {
        it('should build correct qualifiers', () => {
            expect(ToneQualifier.fromString('bb').semitones).to.eql(-2)
            expect(ToneQualifier.fromString('b').semitones).to.eql(-1)
            expect(ToneQualifier.fromString('').semitones).to.eql(0)
            expect(ToneQualifier.fromString('#').semitones).to.eql(1)
            expect(ToneQualifier.fromString('x').semitones).to.eql(2)
        })

        it('should throw for unknown string', () => {
            expect(() => ToneQualifier.fromString('sharp')).to.throw()
        })
    })
})
