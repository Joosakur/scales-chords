import { AbsoluteNote, playNotes, getAbsoluteNote } from './synth'
import { QualifiedTone, BaseTone, ToneQualifier } from '../types'

export const playNote = (qualifiedTone: QualifiedTone, length: number = 2): void => {
    const num = qualifiedToneToNumber(qualifiedTone)
    const absoluteNote = getAbsoluteNote(num, length, 0)
    playNotes(absoluteNote)
}

export const playChord = (qualifiedTones: QualifiedTone [], length: number = 2, arpeggiate: number = 0): void => {
    let prev = 0
    let offset = 0
    const notes: AbsoluteNote [] = []
    for (const qualifiedTone of qualifiedTones) {
        let num = qualifiedToneToNumber(qualifiedTone)
        while (num < prev) num += 12

        notes.push(getAbsoluteNote(num, length, offset))
        prev = num
        offset += arpeggiate
    }
    playNotes(...notes)
}

const qualifiedToneToNumber = (tone: QualifiedTone): number => {
    return baseToneToNumber(tone.base) + qualifierToNumber(tone.qualifier)
}

const baseToneToNumber = (tone: BaseTone): number => {
    switch (tone) {
        case 'C': return 0
        case 'D': return 2
        case 'E': return 4
        case 'F': return 5
        case 'G': return 7
        case 'A': return 9
        case 'B': return 11
    }
}

const qualifierToNumber = (qualifier: ToneQualifier): number => {
    if (!qualifier) return 0
    switch (qualifier) {
        case 'bb': return -2
        case 'b': return -1
        case '#': return 1
        case 'x': return 2
    }
}
