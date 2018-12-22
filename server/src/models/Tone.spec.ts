import { expect } from 'chai'
import 'mocha'
import BaseTone from './BaseTone'
import Tone from './Tone'
import ToneQualifier from './ToneQualifier'

describe('Tone', () => {

    describe('constructor', () => {
        it ('should build a tone', () => {
            const tone = new Tone(
                BaseTone.fromString('F'),
                ToneQualifier.Sharp(),
            )
            expect(tone.semitones).to.equal(6)
            expect(tone.toString()).to.equal('F#')
        })
    })

    describe('fromString', () => {
        it ('should build a tone', () => {
            expect(Tone.fromString('C').semitones).to.equal(0)
            expect(Tone.fromString('C#').semitones).to.equal(1)
            expect(Tone.fromString('Db').semitones).to.equal(1)
            expect(Tone.fromString('Abb').semitones).to.equal(7)
            expect(Tone.fromString('B#').semitones).to.equal(0)
            expect(Tone.fromString('Bx').semitones).to.equal(1)
            expect(Tone.fromString('Cb').semitones).to.equal(11)
        })

        it ('should throw for unknown string', () => {
            expect(() => Tone.fromString('H')).to.throw()
            expect(() => Tone.fromString('C sharp')).to.throw()
            expect(() => Tone.fromString('')).to.throw()
        })
    })

})
