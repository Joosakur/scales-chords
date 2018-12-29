import fs from 'fs'

import NotFoundError from '../errors/NotFoundError'
import Chord from '../models/Chord'
import ChordType from '../models/ChordType'
import Scale from '../models/Scale'
import ScaleType from '../models/ScaleType'
import Tone from '../models/Tone'
import {
    Chord as ChordModel,
    QualifiedTone,
    ScaleDegree,
    ScaleDetails,
    ScaleTypeDetails,
} from '../rest/models'

const numberToNames: { [num: number]: string [] } = JSON.parse(
    fs.readFileSync('data/numberToNames.json', {encoding: 'utf8'}),
)

const getScaleTypeDetails = (scaleNumber: number): ScaleTypeDetails => {
    const names = numberToNames [scaleNumber]
    if (!names) throw new NotFoundError('Scale not found')

    return {
        scaleNumber,
        namePrimary: names [0] || `Anonymous scale ${scaleNumber}`,
        nameSecondaries: names.slice(1),
    }
}

const getScaleDetails = (scaleNumber: number, root: string): ScaleDetails => {
    const scaleType = ScaleType.fromNumber(scaleNumber)
    const rootTone = Tone.fromString(root)
    const scale = new Scale(rootTone, scaleType)
    const tones: QualifiedTone [] = scale.getTones().map(tone => ({
        base: tone.base.toString(),
        qualifier: tone.qualifier.toString(),
    }))
    const scaleDegrees: ScaleDegree [] = buildDegrees(scale.getTones())

    return {
        scaleNumber,
        namePrimary: scale.getNames() [0] || `Anonymous scale ${scaleNumber}`,
        nameSecondaries: scale.getNames().slice(1),
        tones,
        scaleDegrees,
    }
}

const buildDegrees = (scaleTones: Tone []): ScaleDegree [] => {
    let degreeNumber = 1
    const degrees: ScaleDegree [] = []
    for (const tone of scaleTones) {
        const degree: ScaleDegree = {
            degree: degreeNumber,
            chordGroups: getChordGroups(tone, scaleTones),
        }
        degrees.push(degree)
        degreeNumber++
    }
    return degrees
}

interface ChordGroupMap {
    [name: string]: ChordModel [],
}

const getChordGroups = (root: Tone, scaleTones: Tone []): ChordGroupMap => {
    const triads = ChordType.triads
        .map(type => new Chord(root, type))
        .filter(filterForScale(scaleTones))
        .map(chordAsChordModel)

    const sevenths = ChordType.sevenths
        .map(type => new Chord(root, type))
        .filter(filterForScale(scaleTones))
        .map(chordAsChordModel)

    const suspended = ChordType.suspended
        .map(type => new Chord(root, type))
        .filter(filterForScale(scaleTones))
        .map(chordAsChordModel)

    return {
        triads,
        sevenths,
        suspended,
    }
}

const filterForScale = (scaleTones: Tone []) => (chord: Chord) => {
    const chordSemitones = chord.tones.map((tone: Tone) => tone.semitones)
    const scaleSemitones = scaleTones.map((tone: Tone) => tone.semitones)
    for (const chordSemi of chordSemitones) {
        if (!scaleSemitones.includes(chordSemi)) return false
    }
    return true
}

const chordAsChordModel = (chord: Chord): ChordModel => {
    const tones: QualifiedTone [] = chord.tones.map((tone: Tone) => ({
        base: tone.base.toString(),
        qualifier: tone.qualifier.toString(),
    }))
    return {
        name: chord.name,
        shortName: chord.shortName,
        tones,
    }
}

export default {
    getScaleTypeDetails,
    getScaleDetails,
}
