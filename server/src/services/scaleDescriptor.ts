import fs from 'fs'

import NotFoundError from '../errors/NotFoundError'
import ScaleDetails from '../rest-models/ScaleDetails'

const numberToNames: { [num: number]: string [] } = JSON.parse(
    fs.readFileSync('data/numberToNames.json', {encoding: 'utf8'}),
)

const getScaleDetails = (scaleNumber: number): ScaleDetails | null => {
    const names = numberToNames [scaleNumber]
    if (!names) throw new NotFoundError('Scale not found')

    return {
        scaleNumber,
        namePrimary: names [0],
        nameSecondaries: names.slice(1),
    }
}

export default {
    getScaleDetails,
}
