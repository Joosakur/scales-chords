declare var Synth: AudioSynth

interface AudioSynth {
    createInstrument: (id: string | number) => Instrument,
    setVolume: (vol: number) => void
}

interface Instrument {
    play: (note: SimpleTone, octave: number, seconds: number) => void
}

type SimpleTone = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B'

export interface AbsoluteNote {
    tone: SimpleTone,
    octave: number,
    length: number,
    offset: number
}

Synth.setVolume(0.2)
const piano = Synth.createInstrument('piano')

export const playNotes = (...notes: AbsoluteNote []): void => {
    for (const note of notes) {
        setTimeout(() => {
            piano.play(note.tone, note.octave, note.length)
        }, note.offset * 1000)
    }
}

const baseOctave = 4
export const getAbsoluteNote = (num: number, length: number, offset: number): AbsoluteNote => {
    let octave: number = baseOctave
    while (num >= 12) {
        octave++
        num -= 12
    }
    return {
        tone: numberToSimpleTone(num),
        octave,
        length,
        offset,
    }
}

const numberToSimpleTone = (num: number): SimpleTone => {
    switch (num % 12) {
        case 0: return 'C'
        case 1: return 'C#'
        case 2: return 'D'
        case 3: return 'D#'
        case 4: return 'E'
        case 5: return 'F'
        case 6: return 'F#'
        case 7: return 'G'
        case 8: return 'G#'
        case 9: return 'A'
        case 10: return 'A#'
        case 11: return 'B'
        default:
            throw new Error('Could not parse tone from number')
    }
}
