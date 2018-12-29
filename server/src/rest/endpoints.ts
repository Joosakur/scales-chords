import { Application, Request, Response } from 'express'

import scaleDescriptorService from '../services/scaleDescriptor'
import scaleDictionaryService from '../services/scaleDictionary'

const queryByName = (req: Request, res: Response) => {
    const { name } = req.query
    const scaleListEntries = scaleDictionaryService.queryScalesByName(name)
    res.json(scaleListEntries)
}

const getScaleType = (req: Request, res: Response) => {
    const scaleNumber: number = parseInt(req.params.scaleNumber, 10)
    const scaleDetails = scaleDescriptorService.getScaleTypeDetails(scaleNumber)
    res.json(scaleDetails)
}

const getScale = (req: Request, res: Response) => {
    const scaleNumber: number = parseInt(req.params.scaleNumber, 10)
    const root: string = req.params.root.replace('ss', 'x').replace('s', '#')
    const scaleDetails = scaleDescriptorService.getScaleDetails(scaleNumber, root)
    res.json(scaleDetails)
}

const declare = (app: Application) => {
    app.get('/scales', queryByName)
    app.get('/scales/:scaleNumber', getScaleType)
    app.get('/scales/:scaleNumber/:root', getScale)
}

export default declare
