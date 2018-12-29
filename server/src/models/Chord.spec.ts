import { expect } from 'chai'

import Chord from './Chord'
import ChordType from './ChordType'
import Tone from './Tone'

describe('Chord', () => {
    it('build C major', () => {
        const chord = new Chord(Tone.fromString('C'), ChordType.triads [2])
        expect(chord.shortName).to.equal('C')
        expect(chord.tones [0].toString()).to.equal('C')
        expect(chord.tones [1].toString()).to.equal('E')
        expect(chord.tones [2].toString()).to.equal('G')
    })
    it('build C dim', () => {
        const chord = new Chord(Tone.fromString('C'), ChordType.triads [0])
        expect(chord.shortName).to.equal('Cdim')
        expect(chord.tones [0].semitones).to.equal(0)
        expect(chord.tones [1].semitones).to.equal(3)
        expect(chord.tones [2].semitones).to.equal(6)
    })
    it('build A dim', () => {
        const chord = new Chord(Tone.fromString('A'), ChordType.triads [0])
        expect(chord.shortName).to.equal('Adim')
        expect(chord.tones [0].semitones).to.equal(9)
        expect(chord.tones [1].semitones).to.equal(0)
        expect(chord.tones [2].semitones).to.equal(3)
    })
})