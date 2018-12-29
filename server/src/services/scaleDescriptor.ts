import fs from 'fs'

import NotFoundError from '../errors/NotFoundError'
import Scale from '../models/Scale'
import ScaleType from '../models/ScaleType'
import Tone from '../models/Tone'
import { QualifiedTone, ScaleDetails, ScaleTypeDetails } from '../rest/models'

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

    return {
        scaleNumber,
        namePrimary: scale.getNames() [0] || `Anonymous scale ${scaleNumber}`,
        nameSecondaries: scale.getNames().slice(1),
        tones,
    }
}

export default {
    getScaleTypeDetails,
    getScaleDetails,
}
